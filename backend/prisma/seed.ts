import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const SERVICES = [
  { title: "Nursing Staff", slug: "nursing-care", desc: "Qualified & experienced nurses for all types of care at home.", longDesc: "Our registered nurses bring hospital-level clinical care into your home — from post-surgery recovery to managing chronic conditions — so your family member gets expert attention without repeated hospital trips.", icon: "UserRound", color: "navy", bg: "sky", features: ["24/7 availability", "Trained professionals", "Post-surgery care"], benefits: ["Reduces hospital readmissions", "One-on-one attention", "Peace of mind for the family"], process: ["Call us and share the patient's needs", "We match a qualified nurse to the case", "Nurse begins care at your home, same day or next"], image: "/images/services/nursing-care.png", order: 1 },
  { title: "GDA Staff", slug: "elder-care", desc: "Trained GDA's for patient assistance, elderly care & daily support.", longDesc: "Our General Duty Assistants help elderly or recovering patients with everyday activities — bathing, mobility, meals, and companionship — so they can stay comfortable and independent at home.", icon: "Accessibility", color: "green", bg: "greenLight", features: ["Companionship", "Daily assistance", "Hygiene support"], benefits: ["Trained specifically for elder care", "Consistent, familiar caregiver", "Reduces caregiver burnout for family"], process: ["Tell us about the patient's daily routine", "We assign a trained GDA suited to the case", "Support begins with a short handover to the family"], image: "/images/services/elder-care.png", order: 2 },
  { title: "All Medical Equipment on Rent", slug: "equipment-rent", desc: "Hospital beds, oxygen concentrators, wheelchairs, nebulizers, BP monitors, suction machines & more.", longDesc: "Buying medical equipment for short-term recovery is expensive and wasteful. We deliver, install, and support hospital-grade equipment on flexible rental terms — often the same day you call.", icon: "BedDouble", color: "navy", bg: "sky", features: ["Latest equipment", "Home delivery", "Installation support"], benefits: ["No large upfront purchase cost", "Same-day delivery in most cases", "We handle setup and pickup"], process: ["Tell us what equipment is needed", "We confirm availability and delivery time", "Equipment is delivered, installed, and demonstrated"], image: "/images/services/equipment-rent.png", order: 3 },
  { title: "Blood Sample Collection at Home", slug: "blood-sample-collection", desc: "Hassle-free blood sample collection at your home by trained professionals.", longDesc: "Skip the clinic queue. Our trained phlebotomists collect blood samples at your doorstep with proper safety protocols, and reports are shared as soon as they're ready.", icon: "Microscope", color: "green", bg: "greenLight", features: ["Hassle-free", "Trained phlebotomists", "Quick results"], benefits: ["No travel needed for elderly or unwell patients", "Safe, hygienic collection at home", "Reports shared digitally"], process: ["Book a slot over call", "Technician visits at the scheduled time", "Reports are shared once ready"], image: "/images/services/blood-sample-collection.png", order: 4 },
  { title: "Patient Care at Home", slug: "patient-care", desc: "Post-surgery care, chronic disease management, dressing, catheter care, injections & more.", longDesc: "From wound dressing to catheter care and medication management, our home patient care covers the day-to-day clinical needs of recovering or chronically ill patients.", icon: "HomeIcon", color: "navy", bg: "sky", features: ["Post-surgery care", "Wound management", "Catheter care"], benefits: ["Faster, more comfortable recovery at home", "Reduces risk of hospital-acquired infection", "Regular monitoring and reporting to family"], process: ["Share the patient's medical history and needs", "We assign the right care professional", "Care begins with a personalized care plan"], image: "/images/services/patient-care.png", order: 5 },
  { title: "Physiotherapy at Home", slug: "physiotherapy-at-home", desc: "Pain relief, mobility exercises, post-surgery rehab at your home.", longDesc: "Our licensed physiotherapists design a recovery plan around the patient's condition and deliver sessions at home — helping regain mobility and manage pain without repeated clinic visits.", icon: "Activity", color: "green", bg: "greenLight", features: ["Pain relief", "Mobility exercises", "Rehabilitation"], benefits: ["Personalized recovery plan", "Progress tracked session to session", "Comfortable, familiar environment for exercises"], process: ["Share the diagnosis or mobility concern", "Physiotherapist assesses and builds a plan", "Regular sessions begin at home"], image: "/images/services/physiotherapy-at-home.png", order: 6 },
  { title: "Doctor Consultation", slug: "doctor-consultation", desc: "Consult experienced doctors at home as per your need.", longDesc: "For patients who find it difficult to travel, our home doctor consultations bring experienced physicians to you for assessment, diagnosis, and care coordination.", icon: "Stethoscope", color: "navy", bg: "sky", features: ["Experienced doctors", "Home visits", "Care coordination"], benefits: ["No travel stress for the patient", "Unhurried, thorough consultation", "Coordinates with nursing/physio if needed"], process: ["Call to describe the concern", "We schedule a doctor visit at a convenient time", "Doctor consults and shares a care plan"], image: "/images/services/doctor-consultation.png", order: 7 },
  { title: "Ambulance Service", slug: "ambulance-service", desc: "24x7 ambulance service with trained staff & life support.", longDesc: "Available round the clock, our ambulances are staffed with trained paramedics and equipped for life support — for emergencies or scheduled hospital transfers alike.", icon: "Ambulance", color: "green", bg: "greenLight", features: ["24/7 service", "Life support", "Trained paramedics"], benefits: ["Rapid response, day or night", "Trained paramedic on board", "Equipped for critical transfers"], process: ["Call our emergency line", "Nearest ambulance is dispatched", "Patient is transported with paramedic support"], image: "/images/services/ambulance-service.png", order: 8 },
  { title: "Quality Care at Home", slug: "quality-care-at-home", desc: "Trained & verified staff, hygiene & safety assured, timely & professional service.", longDesc: "Every professional we send into your home — nurse, GDA, or attendant — is verified, trained, and held to the same standard of hygiene, punctuality, and professionalism.", icon: "HeartHandshake", color: "navy", bg: "sky", features: ["Verified staff", "Hygiene assured", "Professional service"], benefits: ["Background-verified caregivers only", "Consistent quality across every visit", "Direct accountability to our team"], process: ["Share your care requirement", "We match verified staff to your case", "Service begins with clear expectations set"], image: "/images/services/quality-care-at-home.png", order: 9 },
  { title: "24x7 Customer Support", slug: "24x7-customer-support", desc: "We are always here to assist you anytime, anywhere.", longDesc: "Questions, emergencies, or a change in care needs — our support team is reachable around the clock so families are never left waiting for a response.", icon: "Headset", color: "green", bg: "greenLight", features: ["Round the clock support", "Quick response", "Always available"], benefits: ["No waiting on hold for hours", "One point of contact for all services", "Support available even late at night"], process: ["Call or message us anytime", "Our team responds and coordinates", "Follow-up until the concern is resolved"], image: "/images/services/24x7-customer-support.png", order: 10 },
];

const PACKAGES = [
  { name: "Basic Care", price: "₹1,200", desc: "Essential daily care support for independent living", features: ["12-hour attendant care", "Daily vitals monitoring", "Basic hygiene assistance", "Medication reminders", "Mobility support", "Meal assistance"], bestFor: "Daily assistance", duration: "12 hours", equipment: ["Hospital Bed", "Oxygen Support"], services: ["Attendant", "Hygiene Support"], rating: 4.2, savings: "Save ₹300", popular: false, order: 1 },
  { name: "Standard Care", price: "₹1,800", desc: "Complete 24/7 care with physiotherapy and full support", features: ["24-hour trained nurse", "Daily physiotherapy sessions", "Full equipment support", "Complete hygiene care", "Meal preparation & feeding", "Medication administration", "Health status tracking"], bestFor: "Round-the-clock care", duration: "24 hours", equipment: ["Hospital Bed", "Oxygen Support", "BP Monitor", "Nebulizer"], services: ["Nursing 24/7", "Physiotherapy", "Hygiene Support"], rating: 4.8, savings: "Save ₹600", popular: true, order: 2 },
  { name: "Premium Care", price: "₹2,600", desc: "Comprehensive care with expert medical supervision", features: ["24-hour specialized nurse", "Weekly doctor consultations", "Complete medical equipment", "Personalized care plan", "24/7 emergency response", "Specialist coordination", "Monthly health reports", "Family counseling sessions"], bestFor: "Complete care package", duration: "24/7 coverage", equipment: ["Hospital Bed", "Oxygen", "BP Monitor", "Suction Machine", "Ventilator"], services: ["Nursing 24/7", "Doctor Visits", "Full Equipment"], rating: 4.9, savings: "Save ₹900", popular: false, order: 3 },
];

const TESTIMONIALS = [
  { name: "Ritu Sharma", location: "Raj Nagar", quote: "Nursing staff was gentle and always on time for my father's care. It felt like family looking after him. They handled everything from medication to hygiene with utmost professionalism.", rating: 5, date: "2 months ago", service: "Nursing Care", order: 1 },
  { name: "Vikram Malhotra", location: "Indirapuram", quote: "Equipment was delivered the same day and saved us an unnecessary hospital admission. The team set everything up and showed us how to use it properly. Very professional service.", rating: 5, date: "1 month ago", service: "Equipment Rent", order: 2 },
  { name: "Anjali Tiwari", location: "Vaishali", quote: "Physiotherapy at home helped my mother walk again just weeks after her surgery. The therapist was patient and encouraging. Truly life-changing for our family!", rating: 5, date: "3 months ago", service: "Physiotherapy", order: 3 },
  { name: "Suresh Kumar", location: "Raj Nagar", quote: "The doctor consultation at home was thorough and comfortable. Saved us a trip to the hospital and provided personalized care that my elderly father really appreciated.", rating: 5, date: "1 month ago", service: "Doctor Consult", order: 4 },
  { name: "Priya Singh", location: "Indirapuram", quote: "24/7 ambulance service arrived within minutes during a medical emergency. The staff was professional and caring throughout. Highly recommend for peace of mind.", rating: 5, date: "2 weeks ago", service: "Ambulance", order: 5 },
  { name: "Amit Jain", location: "Vaishali", quote: "The entire team at Anupam Healthcare took care of my father like family. From nursing staff to the equipment support, everything was perfect. Highly recommend!", rating: 5, date: "1 month ago", service: "Complete Care", order: 6 },
];

const TEAM = [
  { name: "Aakash Kaushik", role: "Founder & Care Provider", desc: "Leads Anupam Health Care Services and personally oversees quality of care for every family.", order: 1 },
  { name: "Nursing team", role: "Registered nurses (M/F)", desc: "Qualified and experienced nurses trained for post-surgery care, injections, and chronic disease management.", order: 2 },
  { name: "GDA & attendant staff", role: "Elder care specialists", desc: "Trained General Duty Assistants for daily support, companionship, and mobility assistance.", order: 3 },
  { name: "Physiotherapy team", role: "Licensed physiotherapists", desc: "Home-based rehabilitation for pain relief, mobility, and post-surgery recovery.", order: 4 },
];

const BLOG = [
  {
    title: "5 signs your elderly parent may need a home attendant",
    slug: "signs-elderly-parent-needs-home-attendant",
    date: "August 2026",
    excerpt: "Common signs to watch for — and how a GDA attendant can help your family manage day-to-day care safely.",
    image: "/images/services/elder-care.png",
    content: "As parents age, it isn't always obvious when they need extra support at home. Here are a few signs worth paying attention to.\n\n## Signs to watch for\n\n- Missed medication doses or confusion about dosage\n- Difficulty with daily tasks like bathing or dressing\n- Unexplained bruises or falls around the house\n- Noticeable weight loss or an empty fridge\n- Withdrawing from calls or visits with family\n\n## How a GDA attendant helps\n\nA trained General Duty Assistant can support daily routines — hygiene, mobility, meals, and medication reminders — while keeping your family informed. It's often a lighter-touch option than full nursing care, and can be adjusted as needs change.\n\nIf a few of these signs sound familiar, it may be worth arranging a short trial period with an attendant to see how your parent responds.",
  },
  {
    title: "Post-surgery recovery at home: a simple checklist",
    slug: "post-surgery-recovery-checklist",
    date: "July 2026",
    excerpt: "What to prepare before a patient comes home after surgery, from equipment to wound care routines.",
    image: "/images/services/patient-care.png",
    content: "Bringing a patient home after surgery goes more smoothly with a little preparation.\n\n## Before discharge\n\n- Confirm the discharge summary and any dressing/wound-care instructions\n- Arrange any equipment needed — hospital bed, walker, commode\n- Stock up on prescribed medication\n\n## At home\n\n- Keep the recovery area on the ground floor if mobility is limited\n- Set reminders for medication and dressing changes\n- Watch for fever, unusual pain, or discharge from the wound — these need a call to the doctor\n\nA home nurse can take a lot of this off your plate in the first days after discharge, when routines are hardest to manage.",
  },
  {
    title: "Choosing between a nurse and a GDA attendant",
    slug: "nurse-vs-gda-attendant",
    date: "July 2026",
    excerpt: "Understanding the difference in training and scope so you book the right kind of support.",
    image: "/images/services/nursing-care.png",
    content: "Families often aren't sure whether they need a nurse or an attendant — here's the difference.\n\n## A registered nurse\n\nHandles clinical tasks: injections, wound dressing, catheter care, monitoring vitals, and coordinating with doctors.\n\n## A GDA attendant\n\nSupports daily living: bathing, feeding, mobility, and companionship — not clinical procedures.\n\nIf the patient has an active medical condition being managed at home, start with a nurse. If the need is mainly daily support for an elderly or recovering family member, a GDA is usually the right fit — and more affordable.",
  },
  {
    title: "Home blood sample collection: what to expect",
    slug: "home-blood-sample-collection-guide",
    date: "June 2026",
    excerpt: "How the process works, how to prepare, and how soon you'll get results.",
    image: "/images/services/blood-sample-collection.png",
    content: "Getting blood work done without a clinic visit is simple once you know what to expect.\n\n## Before the visit\n\n- Fasting tests usually require 8-10 hours without food — check with us when booking\n- Keep any previous reports handy for reference\n\n## During the visit\n\nA trained technician arrives at the scheduled time, follows standard safety protocols, and collects the sample in a few minutes.\n\n## After\n\nMost reports are shared digitally within 24 hours, depending on the test.",
  },
];

async function main() {
  console.log("Seeding database...");

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.upsert({
      where: { email: adminEmail.trim().toLowerCase() },
      update: {},
      create: { email: adminEmail.trim().toLowerCase(), passwordHash, name: "Admin" },
    });
    console.log(`Admin user ready: ${adminEmail}`);
  } else {
    console.log(
      "Skipped admin user (set ADMIN_EMAIL and ADMIN_PASSWORD in .env, or run `npm run create-admin` separately)."
    );
  }

  for (const s of SERVICES) {
    const data = {
      ...s,
      features: JSON.stringify(s.features),
      benefits: JSON.stringify(s.benefits),
      process: JSON.stringify(s.process),
    };
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: data, // keep existing services in sync with new longDesc/benefits/process content
      create: data,
    });
  }

  for (const p of PACKAGES) {
    const existing = await prisma.package.findFirst({ where: { name: p.name } });
    if (!existing) {
      await prisma.package.create({
        data: {
          ...p,
          features: JSON.stringify(p.features),
          equipment: JSON.stringify(p.equipment),
          services: JSON.stringify(p.services),
        },
      });
    }
  }

  for (const t of TESTIMONIALS) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name, quote: t.quote } });
    if (!existing) {
      await prisma.testimonial.create({
        data: {
          ...t,
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            t.name
          )}&background=2e7d32&color=fff&size=100&bold=true`,
        },
      });
    }
  }

  for (const m of TEAM) {
    const existing = await prisma.teamMember.findFirst({ where: { name: m.name } });
    if (!existing) await prisma.teamMember.create({ data: m });
  }

  for (const b of BLOG) {
    await prisma.blogPost.upsert({ where: { slug: b.slug }, update: {}, create: b });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
