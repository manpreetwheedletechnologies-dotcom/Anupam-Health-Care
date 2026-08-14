"use client";

import { Heart, HeartHandshake, UserCheck, ShieldCheck, Sparkles, Award, Users, Clock } from "lucide-react";

const PILLARS = [
  { 
    icon: Heart, 
    title: "Care", 
    desc: "We care like family", 
    color: "navy",
    detail: "Personalized attention for every patient",
    stat: "500+ families served"
  },
  {
    icon: HeartHandshake,
    title: "Compassion",
    desc: "In every service",
    color: "green",
    detail: "Empathy drives our every action",
    stat: "98% satisfaction rate"
  },
  {
    icon: UserCheck,
    title: "Commitment",
    desc: "To your well-being",
    color: "navy",
    detail: "Dedicated to your recovery journey",
    stat: "24/7 availability"
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    desc: "Building trust daily",
    color: "green",
    detail: "Reliability you can count on",
    stat: "7+ years of service"
  },
] as const;

export default function TrustPillars() {
  return (
    <section className="relative bg-white px-5 py-12 md:px-8 md:py-20 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-sky/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-greenLight/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-sky/30 px-4 py-1.5 text-xs font-semibold text-brand-navy">
            <Sparkles size={14} />
            Our Core Values
          </div>
          <h2 className="mt-4 text-3xl font-bold text-brand-navy sm:text-4xl">
            Care, Compassion, <br className="sm:hidden" />
            Commitment, Trust
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-base text-gray-500">
            Our four promises to every family we serve — delivered with excellence
            and empathy at every step
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, desc, color, detail, stat }, index) => (
            <div
              key={title}
              className="group relative rounded-2xl bg-white p-8 text-center shadow-card transition-all duration-500 hover:-translate-y-3 hover:shadow-xl hover:shadow-brand-navy/5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand-navy/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              {/* Icon */}
              <div
                className={`relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                  color === "navy" 
                    ? "bg-gradient-to-br from-brand-navy to-brand-navy/80" 
                    : "bg-gradient-to-br from-brand-green to-brand-green/80"
                }`}
              >
                <Icon size={30} className="text-white" />
              </div>

              {/* Content */}
              <h3
                className={`relative mt-5 text-xl font-bold transition-colors ${
                  color === "navy" ? "text-brand-navy" : "text-brand-green"
                }`}
              >
                {title}
              </h3>
              <p className="relative mt-1 text-sm font-medium text-gray-600">
                {desc}
              </p>
              <p className="relative mt-2 text-xs text-gray-400">
                {detail}
              </p>

              {/* Stat */}
              <div className="relative mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-brand-navy/60">
                  {stat}
                </p>
              </div>

              {/* Decorative dot */}
              <div 
                className="absolute bottom-4 right-4 h-2 w-2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  backgroundColor: color === "navy" ? "#1a2a4a" : "#2e7d32"
                }}
              />
            </div>
          ))}
        </div>

        {/* Trust Badge - Enhanced with more stats */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 rounded-3xl bg-white/80 backdrop-blur-sm px-8 py-6 shadow-xl shadow-brand-navy/5 max-w-4xl mx-auto border border-gray-100">
          <div className="flex items-center gap-3">
            <Award size={28} className="text-brand-green" />
            <div>
              <p className="text-sm font-bold text-gray-900">7+ Years</p>
              <p className="text-xs text-gray-400">Of Quality Service</p>
            </div>
          </div>
          <div className="hidden h-10 w-px bg-gray-200 sm:block" />
          <div className="flex items-center gap-3">
            <Users size={28} className="text-brand-navy" />
            <div>
              <p className="text-sm font-bold text-gray-900">500+ Families</p>
              <p className="text-xs text-gray-400">Across Ghaziabad</p>
            </div>
          </div>
          <div className="hidden h-10 w-px bg-gray-200 sm:block" />
          <div className="flex items-center gap-3">
            <Clock size={28} className="text-brand-green" />
            <div>
              <p className="text-sm font-bold text-gray-900">24/7 Support</p>
              <p className="text-xs text-gray-400">Always Available</p>
            </div>
          </div>
          <div className="hidden h-10 w-px bg-gray-200 sm:block" />
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="text-sm font-bold text-gray-900">4.9/5 Rating</p>
              <p className="text-xs text-gray-400">From Families</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}