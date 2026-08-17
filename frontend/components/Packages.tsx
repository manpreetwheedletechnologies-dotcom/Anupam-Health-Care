"use client";

import { Check, Sparkles, Clock, Users, Heart, Star, Shield, Award, Phone, ArrowRight, CircleCheck, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";

export default function Packages() {
  const { packages: PLANS } = useSiteData();
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  if (PLANS.length === 0) return null;

  const handleBookNow = (planName: string) => {
    // Scroll to form or open booking modal
    const formElement = document.getElementById('hero-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
    // You can also track analytics here
    console.log(`Booking selected: ${planName}`);
  };

  return (
    <section id="packages" className="relative bg-gradient-to-b from-white via-brand-sky/5 to-white px-5 py-16 md:px-8 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-sky/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brand-navy/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-greenLight/30 px-5 py-2 text-xs font-semibold text-brand-green border border-brand-green/10 backdrop-blur-sm">
            <Sparkles size={14} className="animate-pulse" />
            Flexible Care Plans
          </div>
          <h2 className="mt-5 text-4xl font-bold text-brand-navy sm:text-5xl">
            Premium Care <span className="text-brand-green">Packages</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base text-gray-500 leading-relaxed">
            Choose the perfect care plan for your loved one's recovery journey. 
            All packages include <span className="text-brand-navy font-medium">trained & verified professionals</span>.
          </p>
          
          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-brand-sky/20 p-1.5">
                <Users size={14} className="text-brand-navy" />
              </div>
              <span className="text-gray-600"><strong className="text-brand-navy">500+</strong> families served</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-brand-green/20 p-1.5">
                <Shield size={14} className="text-brand-green" />
              </div>
              <span className="text-gray-600"><strong className="text-brand-navy">100%</strong> verified caregivers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-yellow-400/20 p-1.5">
                <Award size={14} className="text-yellow-600" />
              </div>
              <span className="text-gray-600"><strong className="text-brand-navy">4.8★</strong> average rating</span>
            </div>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`group relative flex flex-col rounded-2xl transition-all duration-500 ${
                plan.popular
                  ? "bg-gradient-to-b from-white via-white to-brand-sky/5 border-2 border-brand-navy shadow-2xl shadow-brand-navy/10 scale-[1.02] hover:scale-[1.04]"
                  : "bg-white/80 backdrop-blur-sm border border-gray-200 shadow-card hover:shadow-2xl hover:-translate-y-3"
              }`}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-block rounded-full bg-gradient-to-r from-brand-navy to-brand-green px-5 py-1.5 text-[10px] font-bold tracking-wider text-white shadow-lg shadow-brand-navy/20 animate-pulse">
                    ⭐ MOST POPULAR
                  </span>
                </div>
              )}

              {/* Rating badge */}
              {plan.rating && (
                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-yellow-600 shadow-sm border border-yellow-200">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  {plan.rating}
                </div>
              )}

              <div className="p-7">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-bold text-brand-navy">
                      {plan.name}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">{plan.bestFor}</p>
                  </div>
                  {plan.duration && (
                    <span className="flex items-center gap-1 rounded-full bg-brand-sky/20 px-3 py-1 text-[10px] font-semibold text-brand-navy border border-brand-sky/20">
                      <Clock size={10} />
                      {plan.duration}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-brand-navy tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm font-normal text-gray-400"> / day</span>
                </div>
                {plan.savings && (
                  <p className="mt-0.5 text-xs font-medium text-green-600">
                    {plan.savings} with long-term commitment
                  </p>
                )}
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{plan.desc}</p>

                {/* Features */}
                <ul className="mt-5 space-y-2.5">
                  {plan.features.slice(0, 5).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-gray-600 group-hover:translate-x-0.5 transition-transform duration-200"
                    >
                      <Check size={16} className="shrink-0 mt-0.5 text-brand-green" />
                      {f}
                    </li>
                  ))}
                  {plan.features.length > 5 && (
                    <li 
                      className="flex items-center gap-2 text-sm text-brand-navy font-medium cursor-pointer hover:text-brand-green transition-colors"
                      onClick={() => setExpandedPlan(expandedPlan === plan.name ? null : plan.name)}
                    >
                      {expandedPlan === plan.name ? (
                        <>
                          <Minus size={14} />
                          Show less
                        </>
                      ) : (
                        <>
                          <Plus size={14} />
                          Show {plan.features.length - 5} more features
                        </>
                      )}
                    </li>
                  )}
                  {/* Expanded features */}
                  {expandedPlan === plan.name && (
                    <div className="mt-2 space-y-2.5 animate-fadeIn">
                      {plan.features.slice(5).map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-sm text-gray-600"
                        >
                          <Check size={16} className="shrink-0 mt-0.5 text-brand-green" />
                          {f}
                        </li>
                      ))}
                    </div>
                  )}
                </ul>

                {/* Equipment & Services Tags */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1.5">
                    {plan.equipment?.slice(0, 3).map((item) => (
                      <span 
                        key={item} 
                        className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-brand-sky/10 text-brand-navy border border-brand-sky/10"
                      >
                        {item}
                      </span>
                    ))}
                    {plan.equipment && plan.equipment.length > 3 && (
                      <span className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-gray-100 text-gray-500">
                        +{plan.equipment.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => handleBookNow(plan.name)}
                    className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                        : "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    Book {plan.name}
                  </button>
                  
                  <button
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-medium text-gray-400 hover:text-brand-navy transition-colors group"
                  >
                    <Phone size={14} className="group-hover:text-brand-green" />
                    <span>Call for consultation</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Detailed Comparison Table */}
        <div className="mt-16 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="px-6 py-5 bg-gradient-to-r from-brand-sky/10 via-white to-brand-green/5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-brand-navy">Detailed Service & Equipment Comparison</h3>
                <p className="text-sm text-gray-500 mt-1">Compare what each package includes</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-3 py-1.5 text-[10px] font-medium rounded-full bg-green-100 text-green-700 border border-green-200 flex items-center gap-1">
                  <CircleCheck size={12} />
                  Verified
                </span>
              </div>
            </div>
          </div>
          
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Service / Equipment</th>
                {PLANS.map((plan) => (
                  <th key={plan.name} className={`px-6 py-4 text-center font-semibold ${
                    plan.popular ? "text-brand-navy" : "text-gray-600"
                  }`}>
                    <div className="flex flex-col items-center">
                      <span>{plan.name}</span>
                      {plan.popular && (
                        <span className="text-[9px] font-bold text-brand-green uppercase tracking-wider">★ Popular</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { label: "Hospital Bed", key: "Bed" },
                { label: "Oxygen Support", key: "Oxygen" },
                { label: "BP Monitor", key: "BP" },
                { label: "Nebulizer", key: "Nebulizer" },
                { label: "24/7 Nursing Staff", key: "Nursing" },
                { label: "Physiotherapy", key: "Physiotherapy" },
                { label: "Doctor Visits", key: "Doctor" },
                { label: "Emergency Support", key: "Emergency" },
              ].map((row) => (
                <tr key={row.key} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3.5 font-medium text-gray-700">{row.label}</td>
                  {PLANS.map((plan) => (
                    <td key={plan.name} className="px-6 py-3.5 text-center">
                      {plan.equipment?.some(e => e.includes(row.key)) || 
                       plan.services?.some(s => s.includes(row.key)) ? (
                        <Check size={18} className="inline text-brand-green" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white text-xs text-gray-400 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2">
            <span>*Final charges as per medical assessment. Minimum 7-day service period applies.</span>
            <span className="flex items-center gap-1">
              <Heart size={12} className="text-brand-green" />
              Medicines, lab tests, and additional services charged separately
            </span>
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { icon: Heart, label: "Trained & Verified", desc: "All caregivers are background verified and professionally trained" },
            { icon: Clock, label: "24/7 Support", desc: "Round-the-clock assistance with emergency response team" },
            { icon: Shield, label: "Insurance Covered", desc: "All packages include comprehensive insurance coverage" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 rounded-xl bg-white/80 backdrop-blur-sm p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-brand-sky/10 p-3 text-brand-navy shrink-0">
                <item.icon size={18} />
              </div>
              <div>
                <p className="font-semibold text-brand-navy text-sm">{item.label}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            Need help choosing? <a href="#" className="text-brand-navy font-medium hover:underline">Talk to our care advisors</a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}