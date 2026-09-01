"use client";

import { useState, FormEvent } from "react";
import { 
  Clock, Users, ChevronDown, Phone, Shield, Award, 
  Ambulance, Target, Heart, TrendingUp, ArrowRight, CheckCircle, Calendar
} from "lucide-react";
import Image from "next/image";
import { useSiteData, AREAS } from "@/context/SiteDataContext";
import { submitLead } from "@/lib/api";

const FEATURES = [
  { 
    icon: Target, 
    title: "More Patients", 
    desc: "Target the right audience and improve appointments",
    color: "navy"
  },
  { 
    icon: Heart, 
    title: "Better Engagement", 
    desc: "Build trust and stronger patient relationships",
    color: "green"
  },
  { 
    icon: TrendingUp, 
    title: "Measurable Growth", 
    desc: "Track performance and maximize ROI",
    color: "navy"
  },
];

const TIME_SLOTS = [
  "Morning (9 AM - 12 PM)",
  "Afternoon (12 PM - 4 PM)",
  "Evening (4 PM - 8 PM)",
];

const TRUST_BADGES = [
  { icon: Shield, label: "Verified Professionals" },
  { icon: Award, label: "Quality Assured" },
  { icon: Clock, label: "Fast Callback" },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function Hero() {
  const [status, setStatus] = useState<Status>("idle");
  const { services } = useSiteData();

  // Data-driven stats only — a service count we actually have, plus
  // operational commitments (24/7), not invented review numbers.
  const STATS = [
    { value: `${services.length || "10"}+`, label: "Services Offered", icon: Users, bg: "bg-brand-sky" },
    { value: "24/7", label: "Emergency Support", icon: Ambulance, bg: "bg-brand-greenLight" },
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      area: (form.elements.namedItem("area") as HTMLSelectElement).value,
      preferredDate: (form.elements.namedItem("preferredDate") as HTMLInputElement)?.value || undefined,
      preferredTime: (form.elements.namedItem("preferredTime") as HTMLSelectElement)?.value || undefined,
    };

    try {
      await submitLead(payload);
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <section id="top" className="relative overflow-hidden px-5 py-10 md:px-8 md:py-16 min-h-[620px] flex items-center bg-white">
      {/* Background Image - contained, not full-bleed, so it stays visible and doesn't get over-cropped */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_bg.png"
          alt="Healthcare background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlays for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/30 to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/5 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-sky/20 blur-3xl z-0" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-greenLight/20 blur-3xl z-0" />
      
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          {/* Left Column */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-greenLight/80 backdrop-blur-sm px-3.5 py-1.5 text-xs font-semibold text-brand-green border border-brand-green/20 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
              Bringing Hospital-Grade Care to Your Home
            </div>
            
            {/* Heading */}
            <h1 className="mt-4 text-3xl font-bold leading-[1.15] text-brand-navy sm:text-4xl md:text-5xl">
              Professional & 
              <br />
              <span className="relative inline-block text-brand-green">
                Affordable Healthcare
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 10" fill="none">
                  <path d="M0 5 Q50 0 100 5 Q150 10 200 5" stroke="#2e7d32" strokeWidth="2" strokeOpacity="0.3"/>
                </svg>
              </span>
              <br />
              <span className="text-2xl md:text-3xl">at Your Doorstep</span>
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-[15px]">
              Nursing, elder care, medical equipment, blood collection, physiotherapy, 
              and doctor consults — delivered with compassion and expertise across Ghaziabad.
            </p>

            {/* Trust Badges */}
            <div className="mt-4 flex flex-wrap gap-2.5">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-[11px] text-gray-600 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-sm border border-gray-100">
                  <Icon size={12} className="text-brand-green" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Features - 3 Column Grid */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    feature.color === "navy" ? "bg-brand-navy" : "bg-brand-green"
                  }`}>
                    <feature.icon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900">{feature.title}</p>
                    <p className="text-[10px] text-gray-500 leading-tight">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#hero-form"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-navy to-brand-navy/90 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl hover:scale-105"
              >
                Get Free Assessment
                <ArrowRight size={16} />
              </a>
              <a
                href="tel:7011598306"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-greenLight to-brand-greenLight/70 px-5 py-2.5 text-sm font-semibold text-brand-green transition hover:shadow-lg hover:scale-105"
              >
                <Phone size={16} />
                Call 24/7
              </a>
            </div>

            {/* Stats */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-2 rounded-xl ${s.bg} px-3.5 py-2 transition hover:scale-105 backdrop-blur-sm border border-white/50`}
                >
                  <s.icon size={15} className="text-brand-navy/60" />
                  <div>
                    <p className="text-sm font-bold text-brand-navy">{s.value}</p>
                    <p className="text-[9px] text-gray-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form (more compact) */}
          <div className="relative">
            <form
              id="hero-form"
              onSubmit={handleSubmit}
              className="relative mx-auto max-w-sm rounded-2xl border border-brand-navy/10 bg-white/95 backdrop-blur-md p-5 shadow-2xl shadow-brand-navy/10 sm:p-6"
            >
              {/* Badge */}
              <div className="absolute -top-3 -right-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-green to-brand-green/80 px-2.5 py-1 text-[9px] font-bold text-white shadow-lg">
                  <CheckCircle size={11} />
                  FREE ASSESSMENT
                </span>
              </div>
              
              {/* Form Header */}
              <div className="text-center border-b border-gray-100 pb-3">
                <h3 className="text-lg font-bold text-brand-navy">
                  Unlock Your Free Consultation
                </h3>
                <p className="mt-1 text-[11px] text-gray-500">
                  Fill out the form and our healthcare expert will connect with you.
                </p>
              </div>

              {/* Form Fields */}
              <div className="mt-4 flex flex-col gap-2.5">
                <input
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full rounded-lg bg-gray-50/80 border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-brand-navy focus:bg-white"
                />
                <input
                  name="phone"
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="Phone Number"
                  className="w-full rounded-lg bg-gray-50/80 border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-brand-navy focus:bg-white"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address (Optional)"
                  className="w-full rounded-lg bg-gray-50/80 border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-brand-navy focus:bg-white"
                />
                <div className="relative">
                  <select
                    name="service"
                    required
                    defaultValue=""
                    className="w-full appearance-none rounded-lg bg-gray-50/80 border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-brand-navy focus:bg-white"
                  >
                    <option value="" disabled className="text-gray-400">
                      Select service needed
                    </option>
                    {services.map((s) => (
                      <option key={s.slug}>{s.title}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
                <div className="relative">
                  <select
                    name="area"
                    required
                    defaultValue=""
                    className="w-full appearance-none rounded-lg bg-gray-50/80 border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-brand-navy focus:bg-white"
                  >
                    <option value="" disabled className="text-gray-400">
                      Select your area
                    </option>
                    {AREAS.map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                {/* Optional appointment scheduling */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="relative">
                    <input
                      name="preferredDate"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full rounded-lg bg-gray-50/80 border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-brand-navy focus:bg-white"
                    />
                  </div>
                  <div className="relative">
                    <select
                      name="preferredTime"
                      defaultValue=""
                      className="w-full appearance-none rounded-lg bg-gray-50/80 border border-gray-200 px-3 py-2.5 text-xs text-gray-900 outline-none transition focus:border-brand-navy focus:bg-white"
                    >
                      <option value="" className="text-gray-400">
                        Any time
                      </option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={13}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>
                <p className="-mt-1.5 flex items-center gap-1 text-[10px] text-gray-400">
                  <Calendar size={11} /> Optional — pick a preferred date/time for your appointment
                </p>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-1 w-full rounded-lg bg-gradient-to-r from-brand-green to-brand-green/80 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:scale-[1.02] disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Get Free Consultation
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Security Note */}
              <p className="mt-3 text-center text-[10px] text-gray-400 flex items-center justify-center gap-1">
                <Shield size={11} className="text-brand-green" />
                Your information is safe with us. 100% Confidential
              </p>

              {status === "success" && (
                <div className="mt-3 animate-fade-up rounded-xl bg-green-50 p-3 text-center border border-green-200">
                  <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-brand-green">
                    <CheckCircle size={14} /> Thanks! Our team will call you within 10 minutes.
                  </p>
                </div>
              )}
              {status === "error" && (
                <div className="mt-3 animate-fade-up rounded-xl bg-red-50 p-3 text-center border border-red-200">
                  <p className="text-xs font-medium text-red-600">
                    Something went wrong. Please call 7011598306 or 9818283386 instead.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}