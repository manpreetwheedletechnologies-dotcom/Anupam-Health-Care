"use client";

import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import ServiceCard from "@/components/ServiceCard";

const VISIBLE_COUNT = 4;

export default function Services() {
  const { services } = useSiteData();
  const visibleServices = services.slice(0, VISIBLE_COUNT);
  const hasMore = services.length > VISIBLE_COUNT;

  return (
    <section id="services" className="relative overflow-hidden bg-gray-50 px-5 py-12 md:px-8 md:py-20">
      {/* Decorative background, matching the rest of the page */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-sky/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-sky/30 to-brand-green/30 px-4 py-1.5 text-xs font-semibold text-brand-navy shadow-sm border border-white/50">
              <Sparkles size={14} className="text-brand-green" />
              Our Services
            </div>
            <h2 className="mt-4 text-3xl font-bold text-brand-navy sm:text-4xl">
              Comprehensive Healthcare
              <span className="block bg-gradient-to-r from-brand-navy to-brand-green bg-clip-text text-transparent">
                at Home
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-base text-gray-500 lg:mx-0 mx-auto">
              Professional medical care delivered with compassion, expertise,
              and a personal touch — right at your doorstep.
            </p>
          </div>
          <div className="relative mx-auto hidden h-40 w-40 shrink-0 overflow-hidden rounded-2xl shadow-card sm:block lg:h-44 lg:w-44 ring-4 ring-white">
            <Image
              src="/images/expert-care.png"
              alt="Nurse caring for patient at home"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
          {visibleServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>

        {/* View more */}
        {hasMore && (
          <div className="mt-10 text-center">
            <a
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-brand-navy/15 bg-white px-6 py-3 text-sm font-semibold text-brand-navy shadow-sm transition-all duration-300 hover:border-brand-navy/30 hover:shadow-lg"
            >
              View All Services
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
