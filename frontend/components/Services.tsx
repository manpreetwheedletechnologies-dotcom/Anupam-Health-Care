import { Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/services";

export default function Services() {
  return (
    <section id="services" className="relative bg-gray-50 px-5 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-sky/30 px-4 py-1.5 text-xs font-semibold text-brand-navy">
            <Sparkles size={14} />
            Our Services
          </div>
          <h2 className="mt-4 text-3xl font-bold text-brand-navy sm:text-4xl">
            Comprehensive Healthcare at Home
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-base text-gray-500">
            Professional medical care delivered with compassion, expertise, 
            and a personal touch — right at your doorstep
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {SERVICES.map(({ title, desc, icon: Icon, color, bg, slug, features }) => (
            <a
              key={title}
              href={`/services/${slug}`}
              className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                bg === "sky" ? "bg-brand-sky" : "bg-brand-greenLight"
              }`}
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${
                  color === "navy" ? "bg-brand-navy" : "bg-brand-green"
                }`}
              >
                <Icon size={20} className="text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">{title}</p>
              <p className="mt-1 text-xs text-gray-600">{desc}</p>
              
              {features && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {features.map((f) => (
                    <span key={f} className="text-[9px] font-medium text-gray-600 bg-white/50 px-2 py-0.5 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-white/10 transition-transform group-hover:scale-150" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}