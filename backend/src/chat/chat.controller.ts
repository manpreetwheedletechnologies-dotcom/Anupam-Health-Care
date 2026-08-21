import { Body, Controller, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatMessageDto } from "./dto/chat-message.dto";
import { ChatBookDto } from "./dto/chat-book.dto";

@Controller("chat")
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  // Public — the chat widget on the site posts here. No admin auth
  // needed; sessionId (a random ID generated client-side, fresh on every
  // full page load) is what ties a visitor's messages together.
  @Post("message")
  message(@Body() dto: ChatMessageDto) {
    return this.chat.handleMessage(dto.sessionId, dto.message);
  }

  // Public — the in-chat booking form submits here directly, creating a
  // real Lead the same way the main booking form / modal does.
  @Post("book")
  book(@Body() dto: ChatBookDto) {
    return this.chat.bookAppointment(dto);
  }
}
