import { IsIn } from "class-validator";

export class UpdateLeadDto {
  @IsIn(["new", "contacted", "converted", "closed"])
  status!: string;
}
