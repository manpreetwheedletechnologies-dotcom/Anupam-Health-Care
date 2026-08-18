import { IsIn, IsOptional, MaxLength } from "class-validator";

export class UpdateLeadDto {
  @IsOptional()
  @IsIn(["new", "contacted", "confirmed", "converted", "closed"])
  status?: string;

  // Set by the admin when scheduling/confirming the appointment.
  @IsOptional()
  @MaxLength(20)
  confirmedDate?: string;

  @IsOptional()
  @MaxLength(20)
  confirmedTime?: string;
}
