import { ClipboardCheck, FileText, Settings, UserCheck, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Free Patient Assessment",
    desc: "Our experienced medical team visits the hospital or home to understand patient needs, medical history, and care requirements.",
    color: "navy",
    number: "01",
  },
  {
    icon: FileText,
    title: "Personalized Care Plan",
    desc: "We create a detailed, transparent care plan with a comprehensive list of services, equipment, and costs tailored to your needs.",
    color: "green",
    number: "02",
  },
  {
    icon: Settings,
    title: "Equipment & Staff Setup",
    desc: "We install and test all medical equipment at our centre before installation at home, and assign trained, verified staff.",
    color: "navy",
    number: "03",
  },
  {
    icon: UserCheck,
    title: "Start Your Care Journey",
    desc: "Our Nursing Manager oversees the setup, ensures smooth handover, and provides ongoing support throughout your care journey.",
    color: "green",
    number: "04",
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-white px-5 py-12 md:px-8 md:py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-sky/5 blur-3xl" />
      
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-sky/30 px-4 py-1.5 text-xs font-semibold text-brand-navy">
            <Sparkles size={14} />
            Simple & Transparent
          </div>
          <h2 className="mt-4 text-3xl font-bold text-brand-navy sm:text-4xl">
            Home Care Setup in 4 Easy Steps
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-base text-gray-500">
            We believe that patient safety is the most critical determinant. 
            Our 4-step process ensures safe and smooth transition to home care.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {STEPS.map((step, idx) => (
            <div key={idx} className="group relative">
              {/* Connector line */}
              {idx < STEPS.length - 1 && (
                <div className="absolute left-1/2 top-16 hidden h-12 w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-green to-brand-sky md:block" />
              )}
              
              <div className="flex flex-col items-center text-center">
                {/* Icon circle */}
                <div className="relative">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                    step.color === "navy" 
                      ? "bg-gradient-to-br from-brand-navy to-brand-navy/80" 
                      : "bg-gradient-to-br from-brand-green to-brand-green/80"
                  }`}>
                    <step.icon size={32} className="text-white" />
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md text-xs font-bold text-brand-navy border-2 border-brand-navy/10">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="mt-4 text-lg font-bold text-brand-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <div className="mt-12 rounded-2xl bg-brand-sky/30 px-6 py-4 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-brand-navy">✓ All staff are verified & trained</span>
            <span className="mx-3 text-gray-300">|</span>
            <span className="font-semibold text-brand-navy">✓ Equipment tested for safety</span>
            <span className="mx-3 text-gray-300">|</span>
            <span className="font-semibold text-brand-navy">✓ 24/7 support available</span>
          </p>
        </div>
      </div>
    </section>
  );
}