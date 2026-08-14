import { Check, Sparkles, Clock, Users, Heart, Star } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  popular?: boolean;
  bestFor?: string;
  duration?: string;
  equipment?: string[];
  services?: string[];
};

const PLANS: Plan[] = [
  {
    name: "Basic Care",
    price: "₹1,200",
    desc: "Essential daily care support",
    features: [
      "12-hour attendant",
      "Daily vitals check",
      "Basic hygiene support",
      "Medication reminder",
    ],
    bestFor: "Daily assistance",
    duration: "12 hours",
    equipment: ["Hospital Bed", "Oxygen Support"],
    services: ["Attendant", "Hygiene Support"],
  },
  {
    name: "Standard Care",
    price: "₹1,800",
    desc: "Complete 24/7 care with physiotherapy",
    features: [
      "24-hour trained nurse",
      "Physiotherapy sessions",
      "Equipment included",
      "Full hygiene support",
      "Meal preparation",
    ],
    popular: true,
    bestFor: "Round-the-clock care",
    duration: "24 hours",
    equipment: ["Hospital Bed", "Oxygen Support", "BP Monitor"],
    services: ["Nursing 24/7", "Physiotherapy", "Hygiene Support"],
  },
  {
    name: "Premium Care",
    price: "₹2,600",
    desc: "Comprehensive care with doctor visits",
    features: [
      "24-hour trained nurse",
      "Weekly doctor visits",
      "Full equipment support",
      "Specialized care plan",
      "Emergency support",
    ],
    bestFor: "Complete care package",
    duration: "24/7 coverage",
    equipment: ["Hospital Bed", "Oxygen", "BP Monitor", "Suction Machine"],
    services: ["Nursing 24/7", "Doctor Visits", "Full Equipment"],
  },
];

export default function Packages() {
  return (
    <section id="packages" className="relative bg-white px-5 py-12 md:px-8 md:py-20 overflow-hidden">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-sky/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-greenLight/30 px-4 py-1.5 text-xs font-semibold text-brand-green">
            <Sparkles size={14} />
            Flexible Plans
          </div>
          <h2 className="mt-4 text-3xl font-bold text-brand-navy sm:text-4xl">
            Premium Care Packages
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-base text-gray-500">
            Compare our packages and choose the best standard of care for your 
            loved one's recovery at home
          </p>
        </div>

        {/* Plan Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`group relative flex flex-col rounded-2xl bg-white p-7 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? "border-2 border-brand-navy shadow-xl shadow-brand-navy/10"
                  : "border border-gray-200 shadow-card hover:shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-6">
                  <span className="inline-block rounded-full bg-gradient-to-r from-brand-green to-brand-green/80 px-4 py-1 text-[10px] font-bold tracking-wide text-white shadow-md">
                    ★ MOST POPULAR
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-brand-navy">
                    {plan.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">{plan.bestFor}</p>
                </div>
                {plan.duration && (
                  <span className="flex items-center gap-1 rounded-full bg-brand-sky/30 px-2 py-1 text-[9px] font-medium text-brand-navy">
                    <Clock size={10} />
                    {plan.duration}
                  </span>
                )}
              </div>

              <p className="mt-4 text-3xl font-bold text-brand-navy">
                {plan.price}
                <span className="text-sm font-normal text-gray-400"> / day</span>
              </p>
              <p className="mt-2 text-[13px] text-gray-500">{plan.desc}</p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[13px] text-gray-600"
                  >
                    <Check size={15} className="shrink-0 mt-0.5 text-brand-green" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#hero-form"
                className={`mt-7 block rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white shadow-md hover:shadow-lg hover:scale-[1.02]"
                    : "border-2 border-brand-navy text-brand-navy hover:bg-brand-sky/30 hover:border-brand-navy/70"
                }`}
              >
                Choose {plan.name}
              </a>
            </div>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <div className="mt-16 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-card">
          <div className="px-6 py-4 bg-gradient-to-r from-brand-sky/20 to-transparent">
            <h3 className="text-lg font-bold text-brand-navy">Detailed Service & Equipment Comparison</h3>
            <p className="text-xs text-gray-500">*All packages include trained & verified professionals</p>
          </div>
          
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Service / Equipment</th>
                {PLANS.map((plan) => (
                  <th key={plan.name} className={`px-6 py-3 text-center font-medium ${
                    plan.popular ? "text-brand-green" : "text-gray-500"
                  }`}>
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Equipment Row */}
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-700">Hospital Bed</td>
                {PLANS.map((plan) => (
                  <td key={plan.name} className="px-6 py-3 text-center">
                    {plan.equipment?.some(e => e.includes("Bed")) ? "✓" : "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-700">Oxygen Support</td>
                {PLANS.map((plan) => (
                  <td key={plan.name} className="px-6 py-3 text-center">
                    {plan.equipment?.some(e => e.includes("Oxygen")) ? "✓" : "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-700">BP Monitor</td>
                {PLANS.map((plan) => (
                  <td key={plan.name} className="px-6 py-3 text-center">
                    {plan.equipment?.some(e => e.includes("BP")) ? "✓" : "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-700">24/7 Nursing Staff</td>
                {PLANS.map((plan) => (
                  <td key={plan.name} className="px-6 py-3 text-center">
                    {plan.services?.some(s => s.includes("Nursing")) ? "✓" : "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-700">Physiotherapy</td>
                {PLANS.map((plan) => (
                  <td key={plan.name} className="px-6 py-3 text-center">
                    {plan.services?.some(s => s.includes("Physiotherapy")) ? "✓" : "—"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-gray-700">Doctor Visits</td>
                {PLANS.map((plan) => (
                  <td key={plan.name} className="px-6 py-3 text-center">
                    {plan.services?.some(s => s.includes("Doctor")) ? "✓" : "—"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          
          <div className="px-6 py-4 bg-gray-50 text-xs text-gray-400 border-t border-gray-200">
            *Final charges as per the assessment by our medical team. Minimum service period of 7 days applies. 
            Medicines, lab tests, and additional services will be charged extra.
          </div>
        </div>

        {/* Trust Note */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Heart size={12} className="text-brand-green" />
            <span>All plans include trained & verified professionals</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-brand-green" />
            <span>24/7 support available</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={12} className="text-brand-green" />
            <span>500+ families served</span>
          </div>
        </div>
      </div>
    </section>
  );
}