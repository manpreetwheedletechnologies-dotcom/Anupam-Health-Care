import { IsNotEmpty, MaxLength } from "class-validator";

export class ChatMessageDto {
  @IsNotEmpty()
  @MaxLength(80)
  sessionId!: string;

  @IsNotEmpty()
  @MaxLength(500)
  message!: string;
}
