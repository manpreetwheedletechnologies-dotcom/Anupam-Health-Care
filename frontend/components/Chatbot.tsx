"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Loader2, Sparkles, ChevronDown, Paperclip, Smile, Heart, Stethoscope, CalendarCheck } from "lucide-react";
import { sendChatMessage, sendChatBooking } from "@/lib/api";
import { useSiteData, AREAS } from "@/context/SiteDataContext";

type ChatItem = { title: string; desc: string; price?: string; features?: string[] };
type Message = {
  role: "user" | "bot";
  text: string;
  items?: ChatItem[];
  itemsType?: "services" | "packages";
};

// Deliberately NOT persisted to localStorage/sessionStorage — a fresh
// session ID is generated once per full page load (component mount).
// It stays stable across in-app navigation (Next.js keeps this component
// mounted between route changes) but resets on an actual refresh, which
// also clears the visible chat history back to the welcome message.
function createSessionId(): string {
  if (typeof window === "undefined") return "";

  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 15)
  );
}

const WELCOME_MESSAGE: Message = {
  role: "bot",
  text: "Hi! 👋 I'm the Anupam Health Care assistant. I can tell you about our services, pricing, or help you book an appointment. What would you like to know?",
};
const WELCOME_QUICK_REPLIES = ["Our services", "Pricing", "Book appointment", "Contact us"];

// Theme configuration
type ThemeColors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  shadow: string;
  gradientStart: string;
  gradientEnd: string;
  success: string;
  warning: string;
  error: string;
  medical: string;
  medicalDark: string;
};

const DEFAULT_THEME: ThemeColors = {
  primary: "#0a3d5c",
  primaryLight: "#1a5a7a",
  primaryDark: "#062a3f",
  secondary: "#18B7B0",
  accent: "#3498db",
  background: "#f0f4f8",
  surface: "#ffffff",
  text: "#1a202c",
  textSecondary: "#4a5568",
  border: "#e2e8f0",
  shadow: "rgba(10, 61, 92, 0.15)",
  gradientStart: "#0a3d5c",
  gradientEnd: "#1a5a7a",
  success: "#48bb78",
  warning: "#ed8936",
  error: "#fc8181",
  medical: "#18B7B0",
  medicalDark: "#0e8a85",
};

interface ChatbotProps {
  theme?: Partial<ThemeColors>;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  welcomeMessage?: Message;
  welcomeQuickReplies?: string[];
  title?: string;
  subtitle?: string;
  className?: string;
  showPulse?: boolean;
  bounceIntensity?: "light" | "medium" | "strong";
  glassmorphism?: boolean;
  showTypingIndicator?: boolean;
}

export default function Chatbot({ 
  theme: customTheme = {},
  position = "bottom-right",
  welcomeMessage = WELCOME_MESSAGE,
  welcomeQuickReplies = WELCOME_QUICK_REPLIES,
  title = "Anupam Assistant",
  subtitle = "Online",
  className = "",
  showPulse = true,
  bounceIntensity = "medium",
  glassmorphism = false,
  showTypingIndicator = true,
}: ChatbotProps) {
  const theme = { ...DEFAULT_THEME, ...customTheme };
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [quickReplies, setQuickReplies] = useState<string[]>(welcomeQuickReplies);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fresh per full page load — see createSessionId() above.
  const [sessionId] = useState(createSessionId);

  // In-chat booking form
  const { services } = useSiteData();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    service: "",
    area: "",
    preferredDate: "",
    preferredTime: "",
  });

  const positionStyles = {
    "bottom-right": "bottom-[20px] right-5",
    "bottom-left": "bottom-[20px] left-5",
    "top-right": "top-[20px] right-5",
    "top-left": "top-[20px] left-5",
  };

  const bounceConfigs = {
    light: { duration: "2s", distance: "6px" },
    medium: { duration: "1.5s", distance: "10px" },
    strong: { duration: "1s", distance: "15px" },
  };

  const bounceConfig = bounceConfigs[bounceIntensity];

  useEffect(() => {
    const timer = setTimeout(() => setIsFirstVisit(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending, showBookingForm]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setQuickReplies([]);
    setSending(true);

    try {
      const { reply, quickReplies: nextQuickReplies, form, items, itemsType } = await sendChatMessage(sessionId, trimmed);
      setMessages((prev) => [...prev, { role: "bot", text: reply, items, itemsType }]);
      setQuickReplies(nextQuickReplies ?? []);
      if (form === "booking") {
        setBookingError(null);
        setShowBookingForm(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I'm having trouble connecting right now. Please call us at 7011598306.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  async function submitBookingForm(e: React.FormEvent) {
    e.preventDefault();
    if (bookingSubmitting) return;

    const { name, phone, service, area } = bookingData;
    if (!name.trim() || !/^[0-9]{10}$/.test(phone) || !service || !area) {
      setBookingError("Please fill in your name, a valid 10-digit phone number, service, and area.");
      return;
    }

    setBookingSubmitting(true);
    setBookingError(null);

    try {
      const { reply, quickReplies: nextQuickReplies } = await sendChatBooking({
        sessionId,
        ...bookingData,
      });
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          text: `📋 ${bookingData.name} · ${bookingData.phone} · ${bookingData.service} · ${bookingData.area}`,
        },
        { role: "bot", text: reply },
      ]);
      setQuickReplies(nextQuickReplies ?? []);
      setShowBookingForm(false);
      setBookingData({ name: "", phone: "", service: "", area: "", preferredDate: "", preferredTime: "" });
    } catch (err: any) {
      setBookingError(err.message || "Something went wrong — please try again or call us directly.");
    } finally {
      setBookingSubmitting(false);
    }
  }

  // Custom SVG Doctor Bot Icon Component
  const DoctorBotIcon = ({ 
    size = 60, 
    color = "#0a3d5c",
    showPulse = false,
    className = ""
  }) => {
    return (
      <div 
        className={`relative ${className}`}
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 550 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300"
        >
          {/* Antenna */}
          <path
            d="M275 166V139"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Antenna Ball */}
          <circle
            cx="275"
            cy="123"
            r="14"
            fill={theme.medical}
            stroke={color}
            strokeWidth="5"
          >
            {showPulse && (
              <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite" />
            )}
          </circle>

          {/* Left Signal */}
          <path
            d="M207 120C195 128 189 140 188 154"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M221 133C214 138 210 145 209 153"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Right Signal */}
          <path
            d="M343 120C355 128 361 140 362 154"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M329 133C336 138 340 145 341 153"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Robot Head */}
          <rect
            x="188"
            y="166"
            width="174"
            height="123"
            rx="49"
            stroke={color}
            strokeWidth="5"
            fill="none"
          />

          {/* Left Ear */}
          <path
            d="M188 205H182C174 205 169 211 169 219V240C169 248 174 253 182 253H188"
            stroke={color}
            strokeWidth="5"
            fill="none"
          />

          {/* Right Ear */}
          <path
            d="M362 205H368C376 205 381 211 381 219V240C381 248 376 253 368 253H362"
            stroke={color}
            strokeWidth="5"
            fill="none"
          />

          {/* Robot Face */}
          <rect
            x="210"
            y="199"
            width="129"
            height="51"
            rx="22"
            stroke={color}
            strokeWidth="5"
            fill="none"
          />

          {/* Left Eye */}
          <ellipse
            cx="247"
            cy="224.5"
            rx="10"
            ry="14"
            fill={theme.medical}
            stroke={color}
            strokeWidth="3"
          >
            {showPulse && (
              <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
            )}
          </ellipse>

          {/* Right Eye */}
          <ellipse
            cx="303"
            cy="224.5"
            rx="10"
            ry="14"
            fill={theme.medical}
            stroke={color}
            strokeWidth="3"
          >
            {showPulse && (
              <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
            )}
          </ellipse>

          {/* Smile */}
          <path
            d="M258 261C263 268 269 271 276 271C283 271 289 268 294 261"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Shield */}
          <path
            d="M226 306L275 288L326 306V336C326 365 307 384 275 393C243 384 226 365 226 336V306Z"
            stroke={theme.medical}
            strokeWidth="5"
            strokeLinejoin="round"
            fill="none"
          >
            {showPulse && (
              <animate attributeName="stroke-opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite" />
            )}
          </path>

          {/* Medical Plus */}
          <path
            d="M266 314H284V329H299V347H284V360H266V347H252V329H266V314Z"
            fill={theme.medical}
          >
            {showPulse && (
              <animate attributeName="opacity" values="1;0.7;1" dur="1.5s" repeatCount="indefinite" />
            )}
          </path>
        </svg>
      </div>
    );
  };

  // Styles for animations
  const styles = `
    @keyframes pulse-ring {
      0% { transform: scale(0.95); opacity: 0.7; }
      50% { transform: scale(1.05); opacity: 0.3; }
      100% { transform: scale(0.95); opacity: 0.7; }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-${bounceConfig.distance}); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes notification-pop {
      0% { transform: scale(0) rotate(-10deg); opacity: 0; }
      70% { transform: scale(1.3) rotate(3deg); }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes slide-up {
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(1.05); }
      50% { transform: scale(1); }
      75% { transform: scale(1.05); }
    }
    .glass-effect {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: ${glassmorphism ? `rgba(255, 255, 255, 0.7)` : theme.surface};
      border: ${glassmorphism ? '1px solid rgba(255, 255, 255, 0.3)' : `1px solid ${theme.border}`};
    }
    .glass-header {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: ${glassmorphism ? `rgba(10, 61, 92, 0.8)` : `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`};
    }
    .heartbeat {
      animation: heartbeat 2s ease-in-out infinite;
    }
    .icon-glow {
      filter: drop-shadow(0 0 20px ${theme.medical}30);
    }
  `;

  return (
    <div className={`fixed ${positionStyles[position]} z-50 flex flex-col items-end gap-3 ${className}`}>
      <style>{styles}</style>

      {isOpen && (
        <div 
          className="flex h-[620px] w-[380px] flex-col overflow-hidden rounded-3xl shadow-2xl animate-in glass-effect sm:w-[400px]"
          style={{
            boxShadow: `0 25px 80px ${theme.shadow}`,
            animation: "slide-up 0.3s ease-out",
          }}
        >
          {/* Header */}
          <div className="glass-header flex items-center justify-between px-5 py-4 relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                background: `linear-gradient(90deg, transparent, ${theme.surface}30, transparent)`,
                backgroundSize: "200% 100%",
                animation: "shimmer 3s infinite",
              }}
            />
            
            <div className="relative z-10 flex items-center gap-3">
              <div className="relative heartbeat">
                <DoctorBotIcon size={32} color={theme.surface} showPulse={false} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white" style={{ backgroundColor: theme.secondary }} />
              </div>
              <div>
                <p className="text-sm font-bold flex items-center gap-2" style={{ color: theme.surface }}>
                  {title}
                  <Stethoscope size={12} className="animate-pulse" style={{ color: theme.secondary }} />
                </p>
                <p className="flex items-center gap-1.5 text-[11px]" style={{ color: `${theme.surface}cc` }}>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ backgroundColor: theme.secondary }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: theme.secondary }} />
                  </span>
                  {subtitle}
                </p>
              </div>
            </div>
            
            <div className="relative z-10 flex items-center gap-1">
              <button
                type="button"
                onClick={() => {}}
                aria-label="Minimize"
                className="rounded-full p-1.5 transition-all hover:scale-110 hover:bg-white/10 active:scale-95"
                style={{ color: `${theme.surface}cc` }}
              >
                <ChevronDown size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 transition-all hover:scale-110 hover:bg-white/10 active:scale-95"
                style={{ color: `${theme.surface}cc` }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef} 
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4 scroll-smooth"
            style={{ backgroundColor: theme.background }}
          >
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in`}
                style={{ animation: "slide-up 0.3s ease-out" }}
              >
                <div className={`flex items-start gap-2 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  {m.role === "bot" && i === 0 && (
                    <div className="flex-shrink-0 mt-1 heartbeat icon-glow">
                      <DoctorBotIcon size={32} color={theme.primary} showPulse={false} />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
                      m.role === "user" 
                        ? "rounded-br-sm" 
                        : "rounded-bl-sm"
                    }`}
                    style={{
                      backgroundColor: m.role === "user" ? theme.primary : theme.surface,
                      color: m.role === "user" ? theme.surface : theme.text,
                      border: m.role === "bot" ? `1px solid ${theme.border}` : "none",
                      boxShadow: m.role === "bot" ? `0 2px 12px ${theme.shadow}` : "none",
                    }}
                  >
                    {m.role === "bot" && i === 0 && (
                      <span className="inline-block mr-1">🩺</span>
                    )}
                    {m.text}

                    {/* Structured items (services / packages) rendered one by one */}
                    {m.items && m.items.length > 0 && (
                      <div className="mt-2.5 space-y-1.5">
                        {m.items.map((it, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg px-2.5 py-2"
                            style={{
                              backgroundColor: theme.background,
                              border: `1px solid ${theme.border}`,
                            }}
                          >
                            <p className="font-semibold text-[12.5px]" style={{ color: theme.primary }}>
                              {it.title}
                            </p>
                            {it.desc && (
                              <p className="text-[12px] mt-0.5" style={{ color: theme.textSecondary }}>
                                {it.desc}
                              </p>
                            )}
                            {it.features && it.features.length > 0 && (
                              <p className="text-[11.5px] mt-1" style={{ color: theme.textSecondary }}>
                                {it.features.join(", ")}
                              </p>
                            )}
                            {it.price && (
                              <p className="text-[12.5px] font-semibold mt-1" style={{ color: theme.medical }}>
                                {it.price}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {sending && showTypingIndicator && (
              <div className="flex justify-start animate-in" style={{ animation: "slide-up 0.3s ease-out" }}>
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1 heartbeat icon-glow">
                    <DoctorBotIcon size={32} color={theme.primary} showPulse={true} />
                  </div>
                  <div 
                    className="flex items-center gap-2 rounded-2xl rounded-bl-sm px-4 py-3"
                    style={{
                      backgroundColor: theme.surface,
                      border: `1px solid ${theme.border}`,
                      boxShadow: `0 2px 12px ${theme.shadow}`,
                    }}
                  >
                    <Loader2 size={14} className="animate-spin" style={{ color: theme.primary }} />
                    <span className="text-[12px]" style={{ color: theme.textSecondary }}>
                      <span className="inline-block animate-pulse">•</span>
                      <span className="inline-block animate-pulse" style={{ animationDelay: "0.2s" }}>•</span>
                      <span className="inline-block animate-pulse" style={{ animationDelay: "0.4s" }}>•</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* In-chat booking form */}
            {showBookingForm && (
              <div className="flex justify-start animate-in" style={{ animation: "slide-up 0.3s ease-out" }}>
                <form
                  onSubmit={submitBookingForm}
                  className="w-full max-w-[300px] space-y-2.5 rounded-2xl rounded-bl-sm p-4"
                  style={{
                    backgroundColor: theme.surface,
                    border: `1px solid ${theme.border}`,
                    boxShadow: `0 2px 12px ${theme.shadow}`,
                  }}
                >
                  <p className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: theme.primary }}>
                    <CalendarCheck size={13} /> Book an appointment
                  </p>

                  <input
                    type="text"
                    placeholder="Your name"
                    value={bookingData.name}
                    onChange={(e) => setBookingData((d) => ({ ...d, name: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-[12px] outline-none"
                    style={{ backgroundColor: theme.background, border: `1px solid ${theme.border}`, color: theme.text }}
                  />
                  <input
                    type="tel"
                    placeholder="10-digit phone number"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData((d) => ({ ...d, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                    className="w-full rounded-lg px-3 py-2 text-[12px] outline-none"
                    style={{ backgroundColor: theme.background, border: `1px solid ${theme.border}`, color: theme.text }}
                  />
                  <select
                    value={bookingData.service}
                    onChange={(e) => setBookingData((d) => ({ ...d, service: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-[12px] outline-none"
                    style={{ backgroundColor: theme.background, border: `1px solid ${theme.border}`, color: theme.text }}
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  <select
                    value={bookingData.area}
                    onChange={(e) => setBookingData((d) => ({ ...d, area: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-[12px] outline-none"
                    style={{ backgroundColor: theme.background, border: `1px solid ${theme.border}`, color: theme.text }}
                  >
                    <option value="">Select your area</option>
                    {AREAS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={bookingData.preferredDate}
                      onChange={(e) => setBookingData((d) => ({ ...d, preferredDate: e.target.value }))}
                      className="w-full rounded-lg px-2 py-2 text-[11px] outline-none"
                      style={{ backgroundColor: theme.background, border: `1px solid ${theme.border}`, color: theme.text }}
                    />
                    <select
                      value={bookingData.preferredTime}
                      onChange={(e) => setBookingData((d) => ({ ...d, preferredTime: e.target.value }))}
                      className="w-full rounded-lg px-2 py-2 text-[11px] outline-none"
                      style={{ backgroundColor: theme.background, border: `1px solid ${theme.border}`, color: theme.text }}
                    >
                      <option value="">Any time</option>
                      <option value="Morning (9 AM - 12 PM)">Morning</option>
                      <option value="Afternoon (12 PM - 4 PM)">Afternoon</option>
                      <option value="Evening (4 PM - 8 PM)">Evening</option>
                    </select>
                  </div>

                  {bookingError && (
                    <p className="text-[11px]" style={{ color: theme.error }}>
                      {bookingError}
                    </p>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowBookingForm(false);
                        setBookingError(null);
                      }}
                      className="flex-1 rounded-lg py-2 text-[12px] font-medium"
                      style={{ color: theme.textSecondary, border: `1px solid ${theme.border}` }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={bookingSubmitting}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[12px] font-semibold text-white disabled:opacity-60"
                      style={{ background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})` }}
                    >
                      {bookingSubmitting ? <Loader2 size={12} className="animate-spin" /> : <CalendarCheck size={12} />}
                      {bookingSubmitting ? "Booking..." : "Confirm"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Quick replies */}
          {quickReplies.length > 0 && !sending && (
            <div 
              className="flex flex-wrap gap-2 border-t px-4 py-3 animate-in"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border,
                animation: "slide-up 0.3s ease-out",
              }}
            >
              {quickReplies.map((q) => (
                <button
                  type="button"
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full px-4 py-1.5 text-[12px] font-medium transition-all hover:scale-105 hover:shadow-md active:scale-95 flex items-center gap-1"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}10, ${theme.primary}05)`,
                    color: theme.primary,
                    border: `1px solid ${theme.primary}20`,
                  }}
                >
                  {q === "Our services" && "🏥"}
                  {q === "Pricing" && "💰"}
                  {q === "Book appointment" && "📅"}
                  {q === "Contact us" && "📞"}
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (sending) return;
              send(input);
            }}
            className="flex items-center gap-2 border-t p-3"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}
          >
            
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.nativeEvent as any).isComposing) {
                  // guard against IME composition sending an unfinished string
                  e.preventDefault();
                }
              }}
              placeholder="Type a message..."
              disabled={sending}
              className="flex-1 rounded-full px-4 py-2.5 text-[13px] outline-none transition-all disabled:opacity-60"
              style={{
                backgroundColor: theme.background,
                color: theme.text,
                border: `1px solid ${theme.border}`,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.primary;
                e.target.style.boxShadow = `0 0 0 3px ${theme.primary}15`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme.border;
                e.target.style.boxShadow = "none";
              }}
            />
            
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all hover:scale-110 hover:shadow-lg active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
              style={{
                background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
                color: theme.surface,
                boxShadow: `0 4px 15px ${theme.primary}40`,
              }}
            >
              <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button with White Background and Bigger Icon */}
      <div className="relative">
        {showPulse && !isOpen && (
          <div 
            className="absolute inset-[-15px] rounded-full animate-ping"
            style={{
              animationDuration: "1.5s",
              backgroundColor: theme.medical,
              opacity: 0.1,
            }}
          />
        )}

        <button
          onClick={() => setIsOpen((v) => !v)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          className="relative flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: theme.surface,
            boxShadow: `0 8px 40px ${theme.shadow}`,
            animation: `bounce ${bounceConfig.duration} ease-in-out infinite`,
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            width: 60,
            height: 60,
          }}
        >
          {isOpen ? (
            <div 
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`,
              }}
            >
              <X size={24} className="text-white transition-transform duration-300 rotate-90" />
            </div>
          ) : (
            <div className="relative transition-transform duration-300 hover:rotate-6 heartbeat icon-glow">
              <DoctorBotIcon 
                size={85} 
                color={theme.primary}
                showPulse={true}
              />
            </div>
          )}

          {isHovered && !isOpen && (
            <span 
              className="absolute inset-[-5px] rounded-full"
              style={{
                animation: "pulse-ring 1s ease-out infinite",
                border: `2px solid ${theme.medical}`,
                opacity: 0.3,
              }}
            />
          )}
        </button>
      </div>
    </div>
  );
}