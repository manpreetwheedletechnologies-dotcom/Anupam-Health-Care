"use client";

import Image from "next/image";
import { CheckCircle2, Sparkles, Award, Users, Clock, Shield, Star, ArrowRight, Heart, ThumbsUp } from "lucide-react";
import { useState } from "react";

const REASONS = [
  {
    title: "Expert Care",
    desc: "By trained & verified professionals",
    image: "/images/expert_care.png",
    color: "navy",
    stat: "100+ certified nurses",
    icon: Heart,
  },
  {
    title: "Best Equipment",
    desc: "Latest & well maintained equipment on rent",
    image: "/images/best_equipment.png",
    color: "green",
    stat: "50+ equipment types",
    icon: Shield,
  },
  {
    title: "Safe & Hygienic",
    desc: "Strict hygiene protocols for your safety",
    image: "/images/blood-collection.png",
    color: "navy",
    stat: "99.9% sterilization rate",
    icon: CheckCircle2,
  },
  {
    title: "Always Here For You",
    desc: "24x7 support for all your healthcare needs",
    image: "/images/customer-support.png",
    color: "green",
    stat: "15 min response time",
    icon: Clock,
  },
];

const STATS = [
  { icon: Award, value: "7+", label: "Years of Service", color: "text-brand-green" },
  { icon: Users, value: "500+", label: "Families Served", color: "text-brand-navy" },
  { icon: ThumbsUp, value: "98%", label: "Satisfaction Rate", color: "text-brand-green" },
  { icon: Star, value: "4.9", label: "Average Rating", color: "text-brand-navy" },
];

const FEATURES = [
  "Trained & verified healthcare professionals",
  "State-of-the-art medical equipment",
  "Strict hygiene & safety protocols",
  "24/7 emergency support",
  "Personalized care plans",
  "Affordable & transparent pricing",
];

export default function WhyChooseUs() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-gradient-to-br from-white via-brand-sky/5 to-gray-50/80 px-5 py-16 md:px-8 md:py-24 overflow-hidden">
      {/* Animated decorative elements */}
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-brand-sky/5 blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-greenLight/5 blur-3xl animate-pulse-slow delay-1000" />
      
      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-brand-green animate-float" style={{ animationDuration: '8s' }} />
        <div className="absolute top-3/4 right-1/3 h-3 w-3 rounded-full bg-brand-navy animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 right-1/4 h-2.5 w-2.5 rounded-full bg-brand-green animate-float" style={{ animationDuration: '9s', animationDelay: '4s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          {/* Left: Enhanced intro text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-sky/30 to-brand-green/30 px-5 py-2 text-xs font-semibold text-brand-navy shadow-sm backdrop-blur-sm border border-white/50">
              <Sparkles size={14} className="text-brand-green" />
              Why Choose Anupam
              <div className="ml-1 flex h-1.5 w-1.5 rounded-full bg-brand-green animate-ping" />
            </div>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl font-bold text-brand-navy leading-[1.15]">
              <span className="relative">
                Why Families Trust
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 8" fill="none">
                  <path d="M2 5.5C50 0.5 150 0.5 298 5.5" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
                </svg>
              </span>
              <span className="block bg-gradient-to-r from-brand-navy to-brand-green bg-clip-text text-transparent">
                Us With Their Care
              </span>
            </h2>

            <p className="mt-4 max-w-md text-base leading-relaxed text-gray-500 md:text-lg">
              From the hands that care to the equipment that supports —
              every part of our service is chosen to keep your loved ones
              safe, comfortable, and looked after like family.
            </p>

            {/* Enhanced feature list */}
            <div className="mt-6 space-y-2.5">
              {FEATURES.slice(0, 4).map((feature, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-3 group cursor-default"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 rounded-full bg-brand-green/20 blur-sm group-hover:bg-brand-green/30 transition-colors" />
                    <CheckCircle2 size={18} className="relative text-brand-green transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-brand-navy">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Enhanced stats pills with animation */}
            <div className="mt-8 flex flex-wrap gap-3">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-sm border border-gray-100/80 transition-all duration-500 hover:shadow-md hover:-translate-y-0.5 hover:border-brand-green/20"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`p-1 rounded-lg bg-gradient-to-br from-white to-gray-50/50 ${stat.color}`}>
                    <stat.icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-900">{stat.value}</span>
                    <span className="ml-1 text-xs text-gray-400">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Enhanced 2x2 grid with cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {REASONS.map(({ title, desc, image, color, stat, icon: Icon }, index) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-brand-navy/10"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Animated gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color === 'navy' ? 'from-brand-navy/5 via-transparent to-transparent' : 'from-brand-green/5 via-transparent to-transparent'} opacity-0 transition-opacity duration-700 group-hover:opacity-100`} />
                
                {/* Image container with overlay */}
                <div className="relative h-32 w-full overflow-hidden sm:h-36">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay on image */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                  
                  {/* Icon badge on image */}
                  <div className={`absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                    color === 'navy' ? 'text-brand-navy' : 'text-brand-green'
                  }`}>
                    <Icon size={14} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`flex items-center gap-1.5 text-[13px] font-bold ${
                        color === 'navy' ? 'text-brand-navy' : 'text-brand-green'
                      }`}>
                        <CheckCircle2 size={14} className="shrink-0 text-brand-green" />
                        {title}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-gray-500">
                        {desc}
                      </p>
                    </div>
                    {/* Animated stat badge */}
                    <div className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                      color === 'navy' ? 'bg-brand-navy/10 text-brand-navy' : 'bg-brand-green/10 text-brand-green'
                    } opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 scale-95`}>
                      {stat}
                    </div>
                  </div>

                  {/* Progress bar on hover */}
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-brand-green/30 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ width: `${(index + 1) * 25}%` }} />
                </div>

                {/* Decorative corner accent */}
                <div className={`absolute -top-6 -right-6 h-12 w-12 rotate-45 ${
                  color === 'navy' ? 'bg-brand-navy/5' : 'bg-brand-green/5'
                } transition-all duration-500 group-hover:scale-150`} />
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 rounded-3xl bg-white/80 backdrop-blur-sm px-8 py-6 shadow-xl shadow-brand-navy/5 max-w-4xl mx-auto border border-gray-100/80">
          {[
            { icon: Shield, label: "ISO Certified", sub: "Quality Standards" },
            { icon: Heart, label: "Patient First", sub: "Care Philosophy" },
            { icon: Star, label: "Top Rated", sub: "4.9/5 from Families" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-default">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-brand-green/10 blur-sm transition-opacity group-hover:opacity-100 opacity-0" />
                <item.icon size={22} className="text-brand-green relative transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
              {i < 2 && <div className="hidden h-8 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent sm:block" />}
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-brand-navy/5 to-brand-green/5 p-6 text-center border border-brand-green/10">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-brand-navy">Trusted by families across Ghaziabad</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-gray-500">Join 500+ happy families today</span>
          </p>
        </div>
      </div>
    </section>
  );
}