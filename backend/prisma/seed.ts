import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const SERVICES = [
  { title: "Nursing Staff", slug: "nursing-care", desc: "Qualified & experienced nurses for all types of care at home.", icon: "UserRound", color: "navy", bg: "sky", features: ["24/7 availability", "Trained professionals", "Post-surgery care"], image: "/images/services/nursing-care.jpg", order: 1 },
  { title: "GDA Staff", slug: "elder-care", desc: "Trained GDA's for patient assistance, elderly care & daily support.", icon: "Accessibility", color: "green", bg: "greenLight", features: ["Companionship", "Daily assistance", "Hygiene support"], image: "/images/services/elder-care.jpg", order: 2 },
  { title: "All Medical Equipment on Rent", slug: "equipment-rent", desc: "Hospital beds, oxygen concentrators, wheelchairs, nebulizers, BP monitors, suction machines & more.", icon: "BedDouble", color: "navy", bg: "sky", features: ["Latest equipment", "Home delivery", "Installation support"], image: "/images/services/equipment-rent.jpg", order: 3 },
  { title: "Blood Sample Collection at Home", slug: "blood-sample-collection", desc: "Hassle-free blood sample collection at your home by trained professionals.", icon: "Microscope", color: "green", bg: "greenLight", features: ["Hassle-free", "Trained phlebotomists", "Quick results"], image: "/images/services/blood-sample-collection.jpg", order: 4 },
  { title: "Patient Care at Home", slug: "patient-care", desc: "Post-surgery care, chronic disease management, dressing, catheter care, injections & more.", icon: "HomeIcon", color: "navy", bg: "sky", features: ["Post-surgery care", "Wound management", "Catheter care"], image: "/images/services/patient-care.jpg", order: 5 },
  { title: "Physiotherapy at Home", slug: "physiotherapy-at-home", desc: "Pain relief, mobility exercises, post-surgery rehab at your home.", icon: "Activity", color: "green", bg: "greenLight", features: ["Pain relief", "Mobility exercises", "Rehabilitation"], image: "/images/services/physiotherapy-at-home.jpg", order: 6 },
  { title: "Doctor Consultation", slug: "doctor-consultation", desc: "Consult experienced doctors at home as per your need.", icon: "Stethoscope", color: "navy", bg: "sky", features: ["Experienced doctors", "Home visits", "Care coordination"], image: "/images/services/doctor-consultation.jpg", order: 7 },
  { title: "Ambulance Service", slug: "ambulance-service", desc: "24x7 ambulance service with trained staff & life support.", icon: "Ambulance", color: "green", bg: "greenLight", features: ["24/7 service", "Life support", "Trained paramedics"], image: "/images/services/ambulance-service.jpg", order: 8 },
  { title: "Quality Care at Home", slug: "quality-care-at-home", desc: "Trained & verified staff, hygiene & safety assured, timely & professional service.", icon: "HeartHandshake", color: "navy", bg: "sky", features: ["Verified staff", "Hygiene assured", "Professional service"], image: "/images/services/quality-care-at-home.jpg", order: 9 },
  { title: "24x7 Customer Support", slug: "24x7-customer-support", desc: "We are always here to assist you anytime, anywhere.", icon: "Headset", color: "green", bg: "greenLight", features: ["Round the clock support", "Quick response", "Always available"], image: "/images/services/24x7-customer-support.jpg", order: 10 },
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
  { title: "5 signs your elderly parent may need a home attendant", slug: "signs-elderly-parent-needs-home-attendant", date: "August 2026", excerpt: "Common signs to watch for — and how a GDA attendant can help your family manage day-to-day care safely.", content: "" },
  { title: "Post-surgery recovery at home: a simple checklist", slug: "post-surgery-recovery-checklist", date: "July 2026", excerpt: "What to prepare before a patient comes home after surgery, from equipment to wound care routines.", content: "" },
  { title: "Choosing between a nurse and a GDA attendant", slug: "nurse-vs-gda-attendant", date: "July 2026", excerpt: "Understanding the difference in training and scope so you book the right kind of support.", content: "" },
  { title: "Home blood sample collection: what to expect", slug: "home-blood-sample-collection-guide", date: "June 2026", excerpt: "How the process works, how to prepare, and how soon you'll get results.", content: "" },
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
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: { ...s, features: JSON.stringify(s.features) },
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
