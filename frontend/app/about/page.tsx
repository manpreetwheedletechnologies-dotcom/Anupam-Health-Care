import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  UserCheck,
  HeartHandshake,
  Clock,
  Users,
  Stethoscope,
  MapPin,
  Target,
  Eye,
  Phone,
  ArrowRight,
  CalendarCheck,
  Quote,
} from "lucide-react";
import { getServices, getTeam, getAboutContent, resolveImageUrl } from "@/lib/api";
import BookServiceButton from "@/components/BookServiceButton";
import Testimonials from "@/components/Testimonials";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us | Anupam Health Care Services",
  description:
    "Anupam Health Care Services brings hospital-grade home healthcare to families in Ghaziabad — nursing, elder care, equipment and more.",
};

// Values are a fixed set of principles, not something that changes often
// enough to need its own dashboard editor — everything else on this page
// (hero text, story, founder quote, mission/vision) comes from AboutContent.
const VALUES = [
  { icon: Heart, title: "Care", desc: "We care for you like family", color: "navy" },
  { icon: HeartHandshake, title: "Compassion", desc: "Compassion in every service", color: "green" },
  { icon: UserCheck, title: "Commitment", desc: "Committed to your well-being", color: "navy" },
  { icon: ShieldCheck, title: "Trust", desc: "Building trust every day", color: "green" },
  { icon: Clock, title: "Availability", desc: "Here whenever you need us", color: "navy" },
  { icon: Users, title: "Family-first", desc: "You're kept informed, always", color: "green" },
] as const;

// Mirrors AREAS in context/SiteDataContext.tsx (used by the booking form).
const AREAS_SERVED = [
  "Raj Nagar (RDC)",
  "Raj Nagar Extension",
  "Govindpuram",
  "Indirapuram",
  "Vaishali",
  "Other Ghaziabad",
];

export default async function AboutPage() {
  const [services, team, about] = await Promise.all([
    getServices().catch(() => []),
    getTeam().catch(() => []),
    getAboutContent().catch(() => null),
  ]);

  // Real, data-driven stats only — nothing fabricated like a founding
  // year or a "happy families" count we can't actually verify.
  const STATS = [
    { icon: Stethoscope, value: `${services.length}+`, label: "Services" },
    { icon: MapPin, value: `${AREAS_SERVED.length}`, label: "Areas covered" },
    { icon: Clock, value: "24/7", label: "Support" },
    { icon: Users, value: `${team.length || "—"}`, label: "Professionals" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-sky/30 via-white to-brand-green/5 px-5 pt-20 pb-16 md:px-8">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-brand-navy/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-medium text-brand-green">
                <ShieldCheck size={14} />
                About us
              </div>
              <h1 className="mt-4 text-4xl font-bold text-brand-navy sm:text-5xl md:text-6xl">
                {about?.heroTitle ?? "Care beyond compare"}
              </h1>
              <p className="mt-4 text-base text-gray-600 sm:text-lg">
                {about?.heroSubtitle}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <BookServiceButton className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                  <CalendarCheck size={16} /> Book a service
                </BookServiceButton>
                <a
                  href="tel:7011598306"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-navy/20 px-6 py-3 text-sm font-semibold text-brand-navy transition-all hover:border-brand-navy hover:bg-brand-navy/5"
                >
                  <Phone size={16} /> Call us
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src={resolveImageUrl(about?.storyImage || "/images/nurse-patient-care.png")}
                  alt="Anupam Health Care nurse caring for a patient at home"
                  fill
                  unoptimized
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — all real, live counts */}
      <section className="border-y border-gray-100 bg-white px-5 py-12 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="group text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy/5 transition-all group-hover:bg-brand-navy/10 group-hover:scale-110">
                  <Icon size={24} className="text-brand-navy" />
                </div>
                <p className="mt-3 text-3xl font-extrabold text-brand-navy">{value}</p>
                <p className="text-sm font-medium text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                Our story
              </span>
              <h2 className="mt-2 text-3xl font-bold text-brand-navy">
                Bringing care back
                <br />
                <span className="text-brand-green">to your doorstep</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {about?.storyParagraph1}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {about?.storyParagraph2}
              </p>
              <div className="mt-6 grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-brand-green/10 flex items-center justify-center">
                    <ShieldCheck size={14} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">Verified & trained staff</p>
                    <p className="text-xs text-gray-500">Every professional is background-checked</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-brand-green/10 flex items-center justify-center">
                    <Clock size={14} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">24/7 availability</p>
                    <p className="text-xs text-gray-500">Support whenever you need it</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src={resolveImageUrl(about?.storyImage || "/images/nurse-patient-care.png")}
                  alt="Anupam Health Care nurse caring for a patient at home"
                  fill
                  unoptimized
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
              </div>
              {about?.founderQuote && (
                <div className="absolute -bottom-4 -left-4 max-w-xs rounded-2xl bg-white p-5 shadow-xl">
                  <Quote size={20} className="text-brand-green" />
                  <p className="mt-2 text-sm font-medium text-gray-700">"{about.founderQuote}"</p>
                  <p className="mt-2 text-xs font-semibold text-brand-navy">— {about.founderName}</p>
                  <p className="text-xs text-gray-400">{about.founderRole}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-brand-navy px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="group relative overflow-hidden rounded-3xl bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-brand-green/10 blur-2xl" />
              <div className="relative">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green/20">
                  <Target size={24} className="text-brand-green" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white">Our mission</h3>
                <p className="mt-3 text-sm leading-relaxed text-blue-100">{about?.missionText}</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10">
              <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-brand-sky/10 blur-2xl" />
              <div className="relative">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-sky/20">
                  <Eye size={24} className="text-brand-sky" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white">Our vision</h3>
                <p className="mt-3 text-sm leading-relaxed text-blue-100">{about?.visionText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-green">
              Our values
            </span>
            <h2 className="mt-2 text-3xl font-bold text-brand-navy">What we stand for</h2>
            <p className="mt-3 text-gray-500">The principles that guide everything we do</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="group rounded-2xl bg-white p-6 text-center shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div
                  className={`mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all group-hover:scale-110 ${
                    color === "navy" ? "bg-brand-navy/10" : "bg-brand-green/10"
                  }`}
                >
                  <Icon size={24} className={color === "navy" ? "text-brand-navy" : "text-brand-green"} />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-900">{title}</p>
                <p className="mt-1 text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas we serve */}
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-green">
              Coverage
            </span>
            <h2 className="mt-2 text-3xl font-bold text-brand-navy">Areas we serve</h2>
            <p className="mt-3 text-gray-500">
              We currently serve families across these parts of Ghaziabad
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {AREAS_SERVED.map((area) => (
              <span
                key={area}
                className="flex items-center gap-2 rounded-full border-2 border-brand-navy/10 bg-white px-5 py-2.5 text-sm font-medium text-brand-navy transition-all hover:border-brand-navy hover:bg-brand-navy/5 hover:shadow-md"
              >
                <MapPin size={14} className="text-brand-green" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Team preview */}
      {team.length > 0 && (
        <section className="bg-gray-50 px-5 py-16 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                  Our team
                </span>
                <h2 className="mt-1 text-2xl font-bold text-brand-navy md:text-3xl">
                  Meet our professionals
                </h2>
              </div>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {team.slice(0, 4).map((member) => (
                <div
                  key={member.id}
                  className="group rounded-2xl bg-white p-6 text-center shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
                    {member.image ? (
                      <Image
                        src={resolveImageUrl(member.image)}
                        alt={member.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-brand-navy/10 flex items-center justify-center">
                        <UserCheck size={28} className="text-brand-navy" />
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-full ring-2 ring-brand-green/20 transition-all group-hover:ring-4" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-gray-900">{member.name}</p>
                  <p className="text-xs text-brand-green">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navy/90 p-10 text-center md:p-14">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-brand-green/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-sky/5 blur-3xl" />
            <div className="relative">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/20">
                <HeartHandshake size={32} className="text-brand-green" />
              </div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">Ready to get care started?</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-blue-100">
                Talk to our team about what your family needs — we'll help you pick the right service.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <BookServiceButton className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                  <CalendarCheck size={16} /> Book a service
                </BookServiceButton>
                <a
                  href="tel:7011598306"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <Phone size={16} /> 7011598306
                </a>
                <a
                  href="tel:9818283386"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <Phone size={16} /> 9818283386
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </main>
  );
}
