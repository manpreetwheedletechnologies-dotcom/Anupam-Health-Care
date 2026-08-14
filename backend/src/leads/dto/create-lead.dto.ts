import { IsIn, IsNotEmpty, Matches, MaxLength } from "class-validator";

// Keep this list in sync with SERVICES in frontend/components/Hero.tsx —
// a mismatch here silently 400s valid form submissions.
const SERVICES = [
  "Nursing care",
  "Elder care",
  "Equipment on rent",
  "Blood sample collection",
  "Physiotherapy",
  "Doctor consult",
];

// Keep this list in sync with AREAS in frontend/components/Hero.tsx.
const AREAS = ["Raj Nagar", "Indirapuram", "Vaishali", "Other Ghaziabad"];

export class CreateLeadDto {
  @IsNotEmpty()
  @MaxLength(80)
  name!: string;

  @Matches(/^[0-9]{10}$/, { message: "phone must be a 10-digit number" })
  phone!: string;

  @IsIn(SERVICES)
  service!: string;

  @IsIn(AREAS)
  area!: string;
}
