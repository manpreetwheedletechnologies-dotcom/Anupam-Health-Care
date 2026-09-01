import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getServices } from "@/lib/api";
import ServiceCard from "@/components/ServiceCard";
import Testimonials from "@/components/Testimonials";
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Phone, 
  CalendarCheck,
  Stethoscope,
  Heart,
  Home,
  Ambulance,
  Droplets,
  Activity,
  Users,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Services | Anupam Health Care Services",
  description:
    "Nursing care, elder care, equipment on rent, blood collection, physiotherapy, doctor consultation and ambulance service at home in Ghaziabad.",
};

// Trust points for the services section
const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    desc: "All our healthcare staff are background-checked and verified",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    desc: "Round-the-clock service for emergencies and scheduled care",
  },
  {
    icon: Star,
    title: "Quality Assured",
    desc: "Consistently rated 4.9/5 by families across Ghaziabad",
  },
];

// Service categories for filtering
const SERVICE_CATEGORIES = [
  "All Services",
  "Nursing Care",
  "Elder Care",
  "Physiotherapy",
  "Medical Equipment",
  "Emergency Services",
];

export default async function ServicesPage() {
  const services = await getServices().catch(() => []);

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
            What We Offer
          </span>
          <h1 className="mt-4 text-4xl font-bold text-brand-navy sm:text-5xl md:text-6xl">
            Our <span className="bg-gradient-to-r from-brand-green to-brand-sky bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
            Professional healthcare delivered with compassion, right at your
            doorstep in Ghaziabad.
          </p>
          
          {/* Quick Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Stethoscope size={18} className="text-brand-green" />
              <span>{services.length} Services</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={18} className="text-brand-sky" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users size={18} className="text-brand-navy" />
              <span>500+ Happy Families</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - New */}
      <section className="border-y border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-5 py-6 md:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {TRUST_POINTS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-sky/20">
                  <Icon size={18} className="text-brand-navy" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid - Enhanced */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-green">
              Our Services
            </span>
            <h2 className="mt-1 text-2xl font-bold text-brand-navy">
              Professional care at your doorstep
            </h2>
          </div>
          
          {/* Category Filter - Optional */}
          <div className="flex flex-wrap gap-2">
            {SERVICE_CATEGORIES.slice(0, 3).map((category) => (
              <button
                key={category}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  category === "All Services"
                    ? "bg-brand-navy text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {services.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 py-20 text-center">
            <Heart size={48} className="text-gray-300" />
            <p className="mt-4 text-lg font-medium text-gray-500">
              Services will appear here shortly.
            </p>
            <p className="text-sm text-gray-400">
              Please check back soon or call us on{" "}
              <a
                href="tel:7011598306"
                className="font-semibold text-brand-navy hover:underline"
              >
                7011598306
              </a>
              {" / "}
              <a
                href="tel:9818283386"
                className="font-semibold text-brand-navy hover:underline"
              >
                9818283386
              </a>
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Why Choose Us - New Section */}
      <section className="bg-gradient-to-b from-white to-brand-sky/20 px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-semibold text-brand-green">
              Why Anupam Health Care
            </span>
            <h2 className="mt-2 text-2xl font-bold text-brand-navy">
              Why choose us for your healthcare needs?
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600">
              We combine professional expertise with compassionate care to
              ensure the best outcomes for your family.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Home,
                title: "Home Visits",
                desc: "Professional care delivered to your doorstep",
              },
              {
                icon: Stethoscope,
                title: "Qualified Staff",
                desc: "Trained nurses, physiotherapists, and GDAs",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                desc: "Round-the-clock availability for emergencies",
              },
              {
                icon: Heart,
                title: "Compassionate Care",
                desc: "Treating patients like our own family members",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-green/10 to-brand-sky/10 transition-all duration-300 group-hover:scale-110">
                  <Icon size={24} className="text-brand-navy" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="px-5 py-12 md:px-8">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navy/95 p-8 text-center text-white shadow-xl md:p-12">
          <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-brand-green/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-brand-sky/20 blur-3xl" />
          
          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <Phone size={28} className="text-white" />
            </div>
            
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Need immediate care or have questions?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/80 md:text-base">
              Our team is available 24/7 to help you with any healthcare needs
              or service inquiries.
            </p>
            
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="tel:7011598306"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-navy transition-all hover:bg-gray-100"
              >
                <Phone size={16} />
                Call: 7011598306
              </a>
              <a
                href="tel:9818283386"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-navy transition-all hover:bg-gray-100"
              >
                <Phone size={16} />
                Call: 9818283386
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
              >
                <CalendarCheck size={18} />
                Book a Service
              </Link>
            </div>
            
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1">
                <CheckCircle size={12} className="text-brand-green" />
                Free consultation
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={12} className="text-brand-green" />
                No obligation
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={12} className="text-brand-green" />
                Same-day service
              </span>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </main>
  );
}