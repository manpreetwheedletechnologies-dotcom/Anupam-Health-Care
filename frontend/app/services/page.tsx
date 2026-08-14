import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SERVICES } from "@/lib/services";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Services | Anupam Health Care Services",
  description:
    "Nursing care, elder care, equipment on rent, blood collection, physiotherapy, doctor consultation and ambulance service at home in Ghaziabad.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-brand-sky/40 px-5 py-14 text-center md:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
          What we offer
        </p>
        <h1 className="mt-2 text-3xl font-bold text-brand-navy sm:text-4xl">
          Our Services
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
          Professional healthcare delivered with compassion, right at your
          doorstep in Ghaziabad.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, desc, icon: Icon, color, slug, features }) => (
            <a
              key={slug}
              href={`/services/${slug}`}
              className="group rounded-2xl border border-gray-100 p-6 shadow-card transition hover:-translate-y-1 hover:shadow-cardHover"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
                  color === "navy" ? "bg-brand-navy" : "bg-brand-green"
                }`}
              >
                <Icon size={20} className="text-white" />
              </div>
              <p className="text-base font-semibold text-gray-900">{title}</p>
              <p className="mt-1 text-sm text-gray-500">{desc}</p>
              <ul className="mt-4 space-y-1">
                {features.map((f) => (
                  <li key={f} className="text-xs text-gray-400">
                    • {f}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-navy">
                Learn more <ArrowRight size={14} />
              </span>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
