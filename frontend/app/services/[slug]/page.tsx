import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getServiceBySlug, getServices, getTestimonials, resolveImageUrl } from "@/lib/api";
import { getIcon } from "@/lib/icons";
import {
  CheckCircle,
  Phone,
  ShieldCheck,
  Clock,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import BookServiceButton from "@/components/BookServiceButton";
import ServiceCard from "@/components/ServiceCard";
import Testimonials from "@/components/Testimonials";

// Service content is managed live from the admin dashboard, so render
// this on every request rather than caching a stale set of slugs.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug).catch(() => null);
  if (!service) return {};
  return {
    title: `${service.title} | Anupam Health Care Services`,
    description: service.desc,
  };
}

// Trust points shown on every service page — not tied to any one
// service, so this stays a small constant rather than admin-managed
// content. Edit the text here if you want to change it site-wide.
const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: "Verified & trained staff",
    desc: "Every caregiver is background-checked and trained for the role.",
  },
  {
    icon: Clock,
    title: "Fast response",
    desc: "Most requests are arranged within hours, not days.",
  },
  {
    icon: Users,
    title: "Family-first approach",
    desc: "We keep you informed and involved in every care decision.",
  },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getServiceBySlug(params.slug).catch(() => null);
  if (!service) notFound();

  const [allServices, testimonials] = await Promise.all([
    getServices().catch(() => []),
    getTestimonials().catch(() => []),
  ]);

  const { title, desc, longDesc, icon, color, features, benefits, process, image } = service;
  const Icon = getIcon(icon);

  // Other services to explore next — same list every visitor sees on
  // /services, just minus the one they're already looking at.
  const relatedServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  // Prefer testimonials tagged with this service; fall back to the
  // general set so the section never looks empty for a new service.
  const matchingTestimonials = testimonials.filter(
    (t) => t.service && t.service.toLowerCase() === title.toLowerCase()
  );
  const shownTestimonials = (matchingTestimonials.length > 0 ? matchingTestimonials : testimonials).slice(0, 2);

  return (
    <main className="min-h-screen bg-white">
      <Header />

{/* // Enhanced Hero Section with gradient overlay and better visual hierarchy */}
      <section className="relative h-[450px] w-full overflow-hidden sm:h-[500px] md:h-[680px]">
        <Image
          src={resolveImageUrl(image)}
          alt={title}
          fill
          unoptimized
          className="object-cover object-top"
          priority
        />

        {/* Multi-layer gradient overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/40 to-brand-navy/10" />

        {/* Bottom gradient for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          {/* Icon with enhanced styling */}
          <div
            className={`mb-5 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/30 shadow-xl ${color === "navy" ? "bg-brand-navy" : "bg-brand-green"
              }`}
          >
            <Icon size={36} className="text-white" />
          </div>

          <h1 className="text-4xl font-bold text-white drop-shadow-lg sm:text-5xl md:text-6xl">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-base text-white/90 drop-shadow sm:text-lg">
            {desc}
          </p>

          {/* Decorative line */}
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-white/60" />

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <BookServiceButton className="rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-brand-navy shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              Book this service
            </BookServiceButton>
            <a
              href="tel:7011598306"
              className="flex items-center gap-2 rounded-lg border-2 border-white/80 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
            >
              <Phone size={18} /> Call now
            </a>
          </div>

          {/* Quick stats/trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-white/70" />
              <span className="text-sm">Verified Staff</span>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-white/70" />
              <span className="text-sm">Fast Response</span>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              <Users size={16} className="text-white/70" />
              <span className="text-sm">Family First</span>
            </div>
          </div>
        </div>
      </section>



      {/* Fuller description, when set from the admin dashboard */}
      {longDesc && (
        <section className="mx-auto max-w-3xl px-5 pt-12 md:px-8">
          <h2 className="text-xl font-bold text-brand-navy">About this service</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{longDesc}</p>
        </section>
      )}

      {/* What's included */}
      <section className="mx-auto max-w-3xl px-5 py-12 md:px-8">
        <h2 className="text-xl font-bold text-brand-navy">What's included</h2>
        {features.length > 0 ? (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                <CheckCircle size={16} className="text-brand-green shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-gray-400">
            Call us for a full breakdown of what this service covers.
          </p>
        )}
      </section>

      {/* How it works — ordered steps, when set from the admin dashboard */}
      {process.length > 0 && (
        <section className="bg-brand-sky/20 px-5 py-12 md:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-brand-navy">How it works</h2>
            <ol className="mt-6 space-y-5">
              {process.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-sm text-gray-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Benefits — "why choose this", when set from the admin dashboard */}
      {benefits.length > 0 && (
        <section className="mx-auto max-w-3xl px-5 py-12 md:px-8">
          <h2 className="text-xl font-bold text-brand-navy">Why choose this service</h2>
          <ul className="mt-4 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                <CheckCircle size={16} className="mt-0.5 text-brand-green shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Why families choose us — same trust block on every service page */}
      <section className="bg-gray-50 px-5 py-12 md:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-xl font-bold text-brand-navy">
            Why families choose Anupam for {title.toLowerCase()}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {TRUST_POINTS.map(({ icon: TrustIcon, title: t, desc: d }) => (
              <div key={t} className="rounded-2xl bg-white p-5 text-center shadow-card">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy/10">
                  <TrustIcon size={18} className="text-brand-navy" />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-900">{t}</p>
                <p className="mt-1 text-xs text-gray-500">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials relevant to this service */}
      {shownTestimonials.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <h2 className="text-xl font-bold text-brand-navy">What our clients say</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {shownTestimonials.map((t) => (
              <div key={t.id} className="rounded-2xl border border-gray-100 p-5 shadow-card">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-700">"{t.quote}"</p>
                <p className="mt-3 text-xs font-semibold text-gray-900">
                  {t.name} <span className="font-normal text-gray-400">· {t.location}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
          <h2 className="text-xl font-bold text-brand-navy">You might also need</h2>
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
            {relatedServices.map((s) => (
              <ServiceCard key={s.id} {...s} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:underline"
            >
              View all services <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="px-5 pb-14 md:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl bg-brand-navy/5 p-6 text-center">
          <p className="text-sm text-gray-700">
            Not sure this is the right fit for your family's needs?
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Call us on{" "}
            <a href="tel:7011598306" className="font-semibold text-brand-navy">
              7011598306
            </a>{" "}
            and our team will help you choose the right service.
          </p>
        </div>
      </section>
       <Testimonials />
      <Footer />
    </main>
  );
}
