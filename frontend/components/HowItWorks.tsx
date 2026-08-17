"use client";

import { ClipboardCheck, FileText, Settings, UserCheck, Sparkles, Award, Users, Clock, Star, Phone, Mail, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Free Patient Assessment",
    desc: "Our medical team visits the hospital or home to understand needs, history, and care requirements.",
    color: "navy",
    tag: "At your door",
    gradient: "from-brand-navy to-brand-navy/80",
    hoverGradient: "from-brand-navy/20 to-brand-navy/5",
    image: "/images/free_patient_assessment.png",
  },
  {
    icon: FileText,
    title: "Personalized Care Plan",
    desc: "A transparent plan with the exact services, equipment, and costs — nothing bundled in the dark.",
    color: "green",
    tag: "On paper",
    gradient: "from-brand-green to-brand-green/80",
    hoverGradient: "from-brand-green/20 to-brand-green/5",
    image: "/images/personalized_care_plan.png",
  },
  {
    icon: Settings,
    title: "Equipment & Staff Setup",
    desc: "Equipment is tested at our centre first. Staff are trained, verified, and matched to the case.",
    color: "navy",
    tag: "Before day one",
    gradient: "from-brand-navy to-brand-navy/80",
    hoverGradient: "from-brand-navy/20 to-brand-navy/5",
    image: "/images/equipment_staff_setup.png",
  },
  {
    icon: UserCheck,
    title: "Start Your Care Journey",
    desc: "A Nursing Manager oversees handover and stays on for ongoing support through the journey.",
    color: "green",
    tag: "Ongoing",
    gradient: "from-brand-green to-brand-green/80",
    hoverGradient: "from-brand-green/20 to-brand-green/5",
    image: "/images/start_your_care_journy.png",
  },
] as const;

export default function HowItWorks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="relative bg-white px-5 py-12 md:px-8 md:py-20 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-sky/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-greenLight/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-sky/30 to-brand-green/30 px-5 py-2 text-xs font-semibold text-brand-navy shadow-sm backdrop-blur-sm border border-white/50 animate-pulse-slow">
            <Sparkles size={14} className="text-brand-green" />
            Simple & Transparent
            <div className="ml-1 flex h-1.5 w-1.5 rounded-full bg-brand-green animate-ping" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-brand-navy sm:text-4xl">
            Home Care Setup <br className="sm:hidden" />
            in 4 Easy Steps
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-base text-gray-500">
            Patient safety is the most critical determinant. Our 4-step process
            ensures a safe and smooth transition to home care.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="group relative rounded-3xl bg-white/80 backdrop-blur-sm text-center shadow-lg transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:shadow-brand-navy/10 border border-white/50 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Photo */}
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${step.color === "navy" ? "from-brand-navy/70" : "from-brand-green/70"} via-black/10 to-transparent`} />
                {/* Step number on the photo */}
                <span className="absolute right-4 top-4 text-xs font-bold text-white/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative px-8 pb-8">
                {/* Animated gradient background on hover */}
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${step.hoverGradient} opacity-0 transition-opacity duration-700 group-hover:opacity-100`} />

                {/* Icon badge, overlapping the photo */}
                <div className="relative mx-auto -mt-8">
                  <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 blur-md transition-opacity duration-700 group-hover:opacity-50`} />
                  <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg ring-4 ring-white transition-all duration-700 group-hover:scale-110 group-hover:rotate-6`}>
                    <step.icon size={26} className="text-white transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </div>

                {/* Content with animated underline */}
                <h3 className={`relative mt-4 text-lg font-bold transition-colors ${step.color === "navy" ? "text-brand-navy" : "text-brand-green"}`}>
                  {step.title}
                  <span className={`absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r ${step.gradient} transition-all duration-500 group-hover:w-8`} />
                </h3>

                <p className="relative mt-3 text-sm leading-relaxed text-gray-500">{step.desc}</p>

                {/* Tag row, echoing the pillar's stat row */}
                <div className="relative mt-5 pt-4 border-t border-gray-100/80">
                  <div className="flex items-center justify-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${step.color === "navy" ? "bg-brand-navy" : "bg-brand-green"} animate-pulse`} />
                    <p className="text-xs font-bold text-brand-navy/70">{step.tag}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar + Contact card — side by side */}
        <div className="mt-16 grid gap-6 lg:grid-cols-5 max-w-6xl mx-auto">
          {/* Trust Badge bar — same pattern as the pillars section */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-3xl bg-white/80 backdrop-blur-sm px-8 py-6 shadow-xl shadow-brand-navy/5 border border-gray-100">
            <div className="flex items-center gap-3">
              <Award size={28} className="text-brand-green shrink-0" />
              <div>
                <p className="text-sm font-bold text-gray-900">Verified Staff</p>
                <p className="text-xs text-gray-400">Background checked & trained</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={28} className="text-brand-navy shrink-0" />
              <div>
                <p className="text-sm font-bold text-gray-900">24/7 Support</p>
                <p className="text-xs text-gray-400">Round-the-clock assistance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users size={28} className="text-brand-green shrink-0" />
              <div>
                <p className="text-sm font-bold text-gray-900">500+ Families</p>
                <p className="text-xs text-gray-400">Trusted service</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star size={28} className="text-brand-navy shrink-0" />
              <div>
                <p className="text-sm font-bold text-gray-900">No Hidden Charges</p>
                <p className="text-xs text-gray-400">Flexible payment plans</p>
              </div>
            </div>
          </div>

          {/* Contact card */}
          <div className="lg:col-span-2 relative flex flex-col justify-center gap-5 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green to-brand-green/90 p-6 shadow-xl shadow-brand-green/20 md:p-8">
            <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-brand-navy/20 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Ready when you are</p>
              <p className="mt-1 text-xl font-bold text-white">Book your free assessment</p>
            </div>

            <div className="relative flex flex-col items-start gap-3">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white">
                <Phone size={16} />
                +91 98765 43210
              </a>
              <a href="mailto:care@anupamhealth.com" className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white">
                <Mail size={16} />
                care@anupamhealth.com
              </a>
              <button className="mt-1 flex items-center gap-1.5 rounded-full bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]">
                Get Assessment
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}