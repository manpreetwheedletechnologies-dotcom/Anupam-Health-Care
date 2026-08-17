"use client";

import { Heart, HeartHandshake, UserCheck, ShieldCheck, Sparkles, Award, Users, Clock, ChevronRight, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
const PILLARS = [
  { 
    icon: Heart, 
    title: "Care", 
    desc: "We care for you like family", 
    color: "navy",
    detail: "Personalized attention for every patient",
    stat: "500+ families served",
    gradient: "from-brand-navy to-brand-navy/80",
    hoverGradient: "from-brand-navy/20 to-brand-navy/5"
  },
  {
    icon: HeartHandshake,
    title: "Compassion",
    desc: "Compassion in every service",
    color: "green",
    detail: "Empathy drives our every action",
    stat: "98% satisfaction rate",
    gradient: "from-brand-green to-brand-green/80",
    hoverGradient: "from-brand-green/20 to-brand-green/5"
  },
  {
    icon: UserCheck,
    title: "Commitment",
    desc: "Committed to your well-being",
    color: "navy",
    detail: "Dedicated to your recovery journey",
    stat: "24/7 availability",
    gradient: "from-brand-navy to-brand-navy/80",
    hoverGradient: "from-brand-navy/20 to-brand-navy/5"
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    desc: "Building trust every day",
    color: "green",
    detail: "Reliability you can count on",
    stat: "7+ years of service",
    gradient: "from-brand-green to-brand-green/80",
    hoverGradient: "from-brand-green/20 to-brand-green/5"
  },
] as const;

export default function TrustPillars() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <section className="relative bg-white px-5 py-12 md:px-8 md:py-20 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-sky/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-greenLight/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
<div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-sky/30 to-brand-green/30 px-5 py-2 text-xs font-semibold text-brand-navy shadow-sm backdrop-blur-sm border border-white/50 animate-pulse-slow">
            <Sparkles size={14} className="text-brand-green" />
            Our Core Values
            <div className="ml-1 flex h-1.5 w-1.5 rounded-full bg-brand-green animate-ping" />
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
        {/* Pillars Grid with enhanced hover effects */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, desc, color, detail, stat, gradient, hoverGradient }, index) => (
            <div
              key={title}
              className="group relative rounded-3xl bg-white/80 backdrop-blur-sm p-8 text-center shadow-lg transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:shadow-brand-navy/10 border border-white/50"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated gradient background on hover */}
              <div 
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${hoverGradient} opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
              />
              
              {/* Glow effect */}
              <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-20`} />

              {/* Icon with rotating ring */}
              <div className="relative mx-auto">
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 blur-md transition-opacity duration-700 group-hover:opacity-50`} />
                <div 
                  className={`relative flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 ${
                    color === "navy" 
                      ? "bg-gradient-to-br from-brand-navy to-brand-navy/80" 
                      : "bg-gradient-to-br from-brand-green to-brand-green/80"
                  }`}
                >
                  <Icon size={30} className="text-white transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>

              {/* Content with animated underline */}
              <h3
                className={`relative mt-5 text-xl font-bold transition-colors ${
                  color === "navy" ? "text-brand-navy" : "text-brand-green"
                }`}
              >
                {title}
                <span className={`absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r ${gradient} transition-all duration-500 group-hover:w-8`} />
              </h3>
              
              <p className="relative mt-2 text-sm font-medium text-gray-600">
                {desc}
              </p>
              
              <p className="relative mt-3 text-xs text-gray-400 leading-relaxed">
                {detail}
              </p>

              {/* Animated Stat with progress bar */}
              <div className="relative mt-5 pt-4 border-t border-gray-100/80">
                <div className="flex items-center justify-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${color === "navy" ? "bg-brand-navy" : "bg-brand-green"} animate-pulse`} />
                  <p className="text-xs font-bold text-brand-navy/70">
                    {stat}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-brand-green/30 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ width: `${(index + 1) * 25}%` }} />
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
                <ChevronRight size={16} className={`${color === "navy" ? "text-brand-navy/40" : "text-brand-green/40"}`} />
              </div>
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