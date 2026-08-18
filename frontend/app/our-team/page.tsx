import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  UserRound,
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
  Users,
  Phone,
  CalendarCheck,
  Stethoscope,
  Accessibility,
  Activity,
  Sparkles,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";
import { getTeam, resolveImageUrl } from "@/lib/api";
import BookServiceButton from "@/components/BookServiceButton";
import Testimonials from "@/components/Testimonials";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Team | Anupam Health Care Services",
  description:
    "Meet the nurses, GDA staff, and physiotherapists behind Anupam Health Care Services in Ghaziabad.",
};

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: "Verified & background-checked",
    desc: "Every team member is screened before they ever visit a home.",
  },
  {
    icon: GraduationCap,
    title: "Trained & experienced",
    desc: "Qualified nurses, GDAs, and physiotherapists — not general help.",
  },
  {
    icon: HeartHandshake,
    title: "Chosen for compassion",
    desc: "Skill matters, but so does how someone treats your family.",
  },
];

// Team statistics live down in the "Stats Bar" section — computed for
// real from the actual team data, not hardcoded here.

function iconForRole(role: string) {
  const r = role.toLowerCase();
  if (r.includes("nurse")) return Stethoscope;
  if (r.includes("gda") || r.includes("attendant") || r.includes("elder")) return Accessibility;
  if (r.includes("physio")) return Activity;
  return UserRound;
}

function getBadgeColor(role: string) {
  const r = role.toLowerCase();
  if (r.includes("nurse")) return "bg-blue-100 text-blue-700 border-blue-200";
  if (r.includes("gda") || r.includes("attendant")) return "bg-green-100 text-green-700 border-green-200";
  if (r.includes("physio")) return "bg-purple-100 text-purple-700 border-purple-200";
  return "bg-gray-100 text-gray-700 border-gray-200";
}

// Get gradient based on role
function getRoleGradient(role: string) {
  const r = role.toLowerCase();
  if (r.includes("nurse")) return "from-blue-50 to-blue-100/50";
  if (r.includes("gda") || r.includes("attendant")) return "from-green-50 to-green-100/50";
  if (r.includes("physio")) return "from-purple-50 to-purple-100/50";
  return "from-gray-50 to-gray-100/50";
}

export default async function OurTeamPage() {
  const team = await getTeam().catch(() => []);
  const uniqueRoles = new Set(team.map((m) => m.role)).size;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-sky/30 via-white to-brand-sky/10 px-5 py-16 text-center md:px-8 md:py-20">
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-brand-green/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-brand-sky/20 blur-3xl" />
        
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-green">
            <Sparkles size={14} />
            Our Team
          </span>
          <h1 className="mt-4 text-4xl font-bold text-brand-navy sm:text-5xl md:text-6xl">
            The People Behind <br />
            <span className="bg-gradient-to-r from-brand-green to-brand-sky bg-clip-text text-transparent">
              Your Care
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
            Every staff member is verified, trained, and chosen for the same
            quality: genuine care.
          </p>
          
          {/* Hero Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users size={18} className="text-brand-green" />
              <span>{team.length} Team Members</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Award size={18} className="text-brand-sky" />
              <span>{uniqueRoles} Specialities</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={18} className="text-brand-navy" />
              <span>24/7 Availability</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Banner Image */}
      <section className="mx-auto max-w-6xl px-5 pt-6 md:px-8">
        <div className="relative h-64 overflow-hidden rounded-3xl shadow-xl sm:h-80 md:h-96">
          <Image
            src="/images/nurse-patient-care.png"
            alt="Anupam Health Care team caring for a patient"
            fill
            unoptimized
            className="object-cover object-top transition-transform duration-700 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
          
          {/* Overlay Text */}
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-sm font-medium text-white/90">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
                {team.length} Dedicated Professionals
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar - Enhanced */}
      {team.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 pt-8 md:px-8">
          <div className="grid grid-cols-3 gap-3 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy/95 p-6 shadow-xl">
            <div className="text-center text-white">
              <p className="text-3xl font-bold">{team.length}</p>
              <p className="mt-1 text-xs text-white/70">Team Members</p>
            </div>
            <div className="border-x border-white/20 text-center text-white">
              <p className="text-3xl font-bold">{uniqueRoles}</p>
              <p className="mt-1 text-xs text-white/70">Care Specialities</p>
            </div>
            <div className="text-center text-white">
              <p className="text-3xl font-bold">24/7</p>
              <p className="mt-1 text-xs text-white/70">Availability</p>
            </div>
          </div>
        </section>
      )}

      {/* Trust Block - Enhanced */}
      <section className="px-5 py-14 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-brand-sky/20 px-4 py-1.5 text-xs font-semibold text-brand-navy">
              Why Trust Us
            </span>
            <h2 className="mt-2 text-2xl font-bold text-brand-navy">
              Why families trust our team
            </h2>
          </div>
          
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {TRUST_POINTS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-green/10 to-brand-sky/10 transition-all duration-300 group-hover:scale-110 group-hover:from-brand-green/20 group-hover:to-brand-sky/20">
                  <Icon size={24} className="text-brand-navy" />
                </div>
                <p className="mt-4 text-sm font-semibold text-gray-900">{title}</p>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid - Fully Enhanced */}
      {/* Team grid - Full Profile Cards with Name, Role, Bio */}
      <section className="mx-auto max-w-6xl px-5 py-6 md:px-8">
        {team.length === 0 ? (
          <p className="text-center text-sm text-gray-400">Team details coming soon.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => {
              const RoleIcon = iconForRole(member.role);
              const badgeColor = getBadgeColor(member.role);
              return (
                <div
                  key={member.id}
                  className="group rounded-2xl border border-gray-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-cardHover overflow-hidden"
                >
                  {/* Profile Image Section */}
                  <div className="relative h-64 w-full bg-gradient-to-br from-brand-navy/10 to-brand-sky/30">
                    {member.image ? (
                      <Image
                        src={resolveImageUrl(member.image)}
                        alt={member.name}
                        fill
                        unoptimized
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-brand-navy/20">
                          <RoleIcon size={56} className="text-brand-navy/60" />
                        </div>
                      </div>
                    )}
                    {/* Role Badge Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-sm ${badgeColor} bg-opacity-90`}>
                        <RoleIcon size={14} />
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Profile Info Section - Only Name, Role, Bio */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-navy transition-colors">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {member.desc || "Dedicated healthcare professional committed to providing compassionate care."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA Section - Enhanced */}
      <section className="px-5 py-12 md:px-8">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navy/95 p-8 text-center text-white shadow-xl md:p-12">
          <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-brand-green/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-brand-sky/20 blur-3xl" />
          
          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <Users size={28} className="text-white" />
            </div>
            
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Want this team caring for your family?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/80 md:text-base">
              Tell us what kind of support you need and we'll match the right
              person to your case.
            </p>
            
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <BookServiceButton className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-brand-navy transition-all hover:gap-3 hover:bg-gray-100">
                <CalendarCheck size={18} /> Book a service
              </BookServiceButton>
              <a
                href="tel:7011598306"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
              >
                <Phone size={18} /> 7011598306
              </a>
            </div>
            
            <p className="mt-4 text-xs text-white/50">
              <CheckCircle size={12} className="inline text-brand-green" /> Free consultation • No obligation
            </p>
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </main>
  );
}