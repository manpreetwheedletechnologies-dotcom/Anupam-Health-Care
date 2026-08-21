import { IsIn, IsNotEmpty, IsOptional, Matches, MaxLength } from "class-validator";

// Mirrors AREAS in create-lead.dto.ts / frontend context — keep in sync.
const AREAS = ["Raj Nagar", "Indirapuram", "Vaishali", "Other Ghaziabad"];

export class ChatBookDto {
  @IsNotEmpty()
  @MaxLength(80)
  sessionId!: string;

  @IsNotEmpty()
  @MaxLength(80)
  name!: string;

  @Matches(/^[0-9]{10}$/, { message: "phone must be a 10-digit number" })
  phone!: string;

  @IsNotEmpty()
  @MaxLength(120)
  service!: string;

  @IsIn(AREAS)
  area!: string;

  @IsOptional()
  @MaxLength(20)
  preferredDate?: string;

  @IsOptional()
  @MaxLength(60)
  preferredTime?: string;
}
