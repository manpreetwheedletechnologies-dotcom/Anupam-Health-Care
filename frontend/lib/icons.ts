import {
  Stethoscope,
  Accessibility,
  BedDouble,
  Microscope,
  HomeIcon,
  Activity,
  UserRound,
  Ambulance,
  HeartHandshake,
  Headset,
  HelpCircle,
  Syringe,
  Pill,
  ShieldCheck,
  Baby,
  Bandage,
  LucideIcon,
} from "lucide-react";

// Icons a service can use. Stored as a plain string name in the database
// so new services (added from the admin dashboard) just need to name one
// of these — no code change required. Add more here if you need a new
// icon; keep the list to icons that exist in lucide-react.
export const ICON_MAP: Record<string, LucideIcon> = {
  Stethoscope,
  Accessibility,
  BedDouble,
  Microscope,
  HomeIcon,
  Activity,
  UserRound,
  Ambulance,
  HeartHandshake,
  Headset,
  Syringe,
  Pill,
  ShieldCheck,
  Baby,
  Bandage,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? HelpCircle;
}
