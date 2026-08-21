import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { toJsonArray } from "../common/json.util";
import { ChatBookDto } from "./dto/chat-book.dto";

const PHONE_NUMBER = "7011598306";

type ChatItem = { title: string; desc: string; price?: string; features?: string[] };
type ChatReply = {
  reply: string;
  quickReplies?: string[];
  form?: "booking";
  items?: ChatItem[];
  itemsType?: "services" | "packages";
};

const MAIN_MENU_QUICK_REPLIES = ["Our services", "Pricing", "Book appointment", "Contact us"];

// Mirrors AREAS in create-lead.dto.ts / chat-book.dto.ts / frontend context.
const AREAS = ["Raj Nagar", "Indirapuram", "Vaishali", "Other Ghaziabad"];

// Keyword lists cover common English + Hinglish phrasing this audience
// actually types. Not exhaustive — it's a rule-based matcher, not an LLM.
const KEYWORDS = {
  greeting: ["hi", "hello", "hey", "namaste", "namaskar", "hola"],
  services: ["service", "services", "seva", "sewa", "kya kya", "what do you offer", "offer karte"],
  pricing: ["price", "pricing", "cost", "charge", "charges", "fee", "fees", "kimat", "kitna", "package", "packages", "rate"],
  booking: ["book", "appointment", "schedule", "visit chahiye", "milna hai", "chahiye", "need someone", "send someone", "attendant chahiye", "nurse chahiye", "book karna"],
  contact: ["contact", "phone number", "number do", "call kare", "mobile number", "whatsapp number"],
  area: ["area", "location", "kaha", "where do you", "ghaziabad me", "serve karte"],
  thanks: ["thanks", "thank you", "dhanyavad", "shukriya"],
  bye: ["bye", "goodbye", "see you", "alvida"],
};

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

function matchesAny(text: string, keywords: string[]): boolean {
  return keywords.some((k) => text.includes(k));
}

function parseMessages(raw: string): { role: "user" | "bot"; text: string; at: string }[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async handleMessage(sessionId: string, rawMessage: string): Promise<ChatReply> {
    const text = normalize(rawMessage);
    const result = await this.route(text);
    await this.appendHistory(sessionId, rawMessage, result.reply);
    return result;
  }

  // Called when the in-chat booking form is submitted — creates a real
  // Lead directly, bypassing any text intent matching.
  async bookAppointment(dto: ChatBookDto): Promise<ChatReply> {
    await this.prisma.lead.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        service: dto.service,
        area: dto.area,
        preferredDate: dto.preferredDate ?? "",
        preferredTime: dto.preferredTime ?? "",
        source: "chatbot",
        status: "new",
      },
    });

    const reply = `Thanks, ${dto.name}! I've noted your request for ${dto.service} in ${dto.area}${
      dto.preferredDate ? ` (preferred: ${dto.preferredDate})` : ""
    }. Our team will call you on ${dto.phone} shortly. You can also reach us directly at ${PHONE_NUMBER}.`;

    await this.appendHistory(
      dto.sessionId,
      `[Booking form submitted: ${dto.name}, ${dto.phone}, ${dto.service}, ${dto.area}]`,
      reply
    );

    return { reply, quickReplies: MAIN_MENU_QUICK_REPLIES };
  }

  // ---------- intent routing ----------

  private async route(text: string): Promise<ChatReply> {
    if (matchesAny(text, KEYWORDS.booking)) {
      return {
        reply: "Sure, I can help you book a service! Please fill in the quick form below.",
        form: "booking",
      };
    }

    if (matchesAny(text, KEYWORDS.greeting)) {
      return {
        reply:
          "Hi! 👋 I'm the Anupam Health Care assistant. I can tell you about our services, pricing, or help you book an appointment. What would you like to know?",
        quickReplies: MAIN_MENU_QUICK_REPLIES,
      };
    }

    if (matchesAny(text, KEYWORDS.services)) {
      const services = await this.prisma.service.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        take: 6,
      });
      if (services.length === 0) {
        return { reply: `We're updating our services list right now — please call us on ${PHONE_NUMBER} for details.` };
      }
      return {
        reply: "Here's what we offer:",
        items: services.map((s) => ({ title: s.title, desc: s.desc })),
        itemsType: "services",
        quickReplies: [...services.map((s) => s.title), "Book appointment"],
      };
    }

    if (matchesAny(text, KEYWORDS.pricing)) {
      const packages = await this.prisma.package.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      });
      if (packages.length === 0) {
        return { reply: `For current pricing, please call us on ${PHONE_NUMBER} — our packages are being updated.` };
      }
      return {
        reply: "Here are our care packages:",
        items: packages.map((p) => ({ title: p.name, desc: "", price: p.price })),
        itemsType: "packages",
        quickReplies: ["Book appointment", "Our services"],
      };
    }

    if (matchesAny(text, KEYWORDS.contact)) {
      return {
        reply: `You can call or WhatsApp us anytime at ${PHONE_NUMBER} — we're available 24/7.`,
        quickReplies: MAIN_MENU_QUICK_REPLIES,
      };
    }

    if (matchesAny(text, KEYWORDS.area)) {
      return {
        reply: `We currently serve: ${AREAS.join(", ")}. Don't see your area? Call us at ${PHONE_NUMBER} and we'll try to help.`,
        quickReplies: MAIN_MENU_QUICK_REPLIES,
      };
    }

    if (matchesAny(text, KEYWORDS.thanks)) {
      return { reply: "You're welcome! Let me know if there's anything else I can help with. 😊" };
    }

    if (matchesAny(text, KEYWORDS.bye)) {
      return { reply: `Take care! Call us anytime at ${PHONE_NUMBER} if you need us.` };
    }

    // Check if the message names a specific live service.
    const matchedService = await this.findMatchingService(text);
    if (matchedService) {
      const features = toJsonArray(matchedService.features);
      return {
        reply: `${matchedService.title}:`,
        items: [
          {
            title: matchedService.title,
            desc: matchedService.desc,
            features: features.length > 0 ? features : undefined,
          },
        ],
        itemsType: "services",
        quickReplies: ["Book appointment", "Our services"],
      };
    }

    return {
      reply: `I can help with our services, pricing, or booking an appointment. You can also call us directly at ${PHONE_NUMBER}.`,
      quickReplies: MAIN_MENU_QUICK_REPLIES,
    };
  }

  // ---------- helpers ----------

  private async findMatchingService(text: string) {
    const services = await this.prisma.service.findMany({ where: { published: true } });
    return services.find(
      (s) => text.includes(s.title.toLowerCase()) || s.title.toLowerCase().includes(text)
    );
  }

  private async getOrCreateSession(sessionId: string) {
    const existing = await this.prisma.chatSession.findUnique({ where: { sessionId } });
    if (existing) return existing;
    return this.prisma.chatSession.create({ data: { sessionId } });
  }

  private async appendHistory(sessionId: string, userText: string, botText: string) {
    const session = await this.getOrCreateSession(sessionId);
    const messages = parseMessages(session.messages);
    const now = new Date().toISOString();
    messages.push({ role: "user", text: userText, at: now });
    messages.push({ role: "bot", text: botText, at: now });
    // Cap history so a long-running session doesn't grow the document forever.
    const trimmed = messages.slice(-50);

    await this.prisma.chatSession.update({
      where: { sessionId },
      data: { messages: JSON.stringify(trimmed) },
    });
  }
}