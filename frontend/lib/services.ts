import {
  Stethoscope,
  Accessibility,
  BedDouble,
  Microscope,
  HomeIcon,
  Activity,
  UserRound,
  Ambulance,
  LucideIcon,
} from "lucide-react";

export type Service = {
  title: string;
  desc: string;
  icon: LucideIcon;
  color: "navy" | "green";
  bg: "sky" | "greenLight";
  slug: string;
  features: string[];
};

export const SERVICES: Service[] = [
  {
    title: "Nursing Staff",
    desc: "Qualified male & female nurses",
    icon: UserRound,
    color: "navy",
    bg: "sky",
    slug: "nursing-care",
    features: ["24/7 availability", "Trained professionals", "Post-surgery care"],
  },
  {
    title: "GDA Staff",
    desc: "Elder care & daily support",
    icon: Accessibility,
    color: "green",
    bg: "greenLight",
    slug: "elder-care",
    features: ["Companionship", "Daily assistance", "Hygiene support"],
  },
  {
    title: "Equipment Rent",
    desc: "Beds, O2, wheelchairs",
    icon: BedDouble,
    color: "navy",
    bg: "sky",
    slug: "equipment-rent",
    features: ["Latest equipment", "Home delivery", "Installation support"],
  },
  {
    title: "Blood Collection",
    desc: "Free sample pickup at home",
    icon: Microscope,
    color: "green",
    bg: "greenLight",
    slug: "blood-sample-collection",
    features: ["Hassle-free", "Trained phlebotomists", "Quick results"],
  },
  {
    title: "Patient Care",
    desc: "Post-surgery, wound dressing",
    icon: HomeIcon,
    color: "navy",
    bg: "sky",
    slug: "patient-care",
    features: ["Post-surgery care", "Wound management", "Catheter care"],
  },
  {
    title: "Physiotherapy",
    desc: "Mobility & pain relief",
    icon: Activity,
    color: "green",
    bg: "greenLight",
    slug: "physiotherapy-at-home",
    features: ["Pain relief", "Mobility exercises", "Rehabilitation"],
  },
  {
    title: "Doctor Consult",
    desc: "At-home visits",
    icon: Stethoscope,
    color: "navy",
    bg: "sky",
    slug: "doctor-consultation",
    features: ["Experienced doctors", "Home visits", "Care coordination"],
  },
  {
    title: "Ambulance",
    desc: "24x7 with life support",
    icon: Ambulance,
    color: "green",
    bg: "greenLight",
    slug: "ambulance-service",
    features: ["24/7 service", "Life support", "Trained paramedics"],
  },
];
