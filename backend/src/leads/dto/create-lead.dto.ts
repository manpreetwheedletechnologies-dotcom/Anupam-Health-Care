import { IsIn, IsNotEmpty, Matches, MaxLength } from "class-validator";

// Areas served. This mirrors AREAS in frontend/context/SiteDataContext.tsx.
// Update both if you expand service areas. Service *names* aren't
// validated here — they now come live from the Service table, so any
// current service title from the dropdown is accepted.
const AREAS = ["Raj Nagar", "Indirapuram", "Vaishali", "Other Ghaziabad"];

export class CreateLeadDto {
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
}
