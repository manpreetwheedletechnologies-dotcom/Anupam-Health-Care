import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Heart, ShieldCheck, UserCheck, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "About Us | Anupam Health Care Services",
  description:
    "Anupam Health Care Services brings hospital-grade home healthcare to families in Ghaziabad — nursing, elder care, equipment and more.",
};

const VALUES = [
  { icon: Heart, title: "Care", desc: "We care for you like family", color: "navy" },
  { icon: HeartHandshake, title: "Compassion", desc: "Compassion in every service", color: "green" },
  { icon: UserCheck, title: "Commitment", desc: "Committed to your well-being", color: "navy" },
  { icon: ShieldCheck, title: "Trust", desc: "Building trust every day", color: "green" },
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-brand-sky/40 px-5 py-14 text-center md:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
          About us
        </p>
        <h1 className="mt-2 text-3xl font-bold text-brand-navy sm:text-4xl">
          Care beyond compare
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600">
          Anupam Health Care Services was founded to bring reliable,
          compassionate healthcare into people's homes — for the families
          who want their loved ones cared for the way they would care for
          them themselves.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-14 md:grid-cols-2 md:px-8">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">Our story</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            Anupam Health Care Services started with a simple idea — that
            good medical care shouldn't stop at the hospital door. Based in
            Raj Nagar, Ghaziabad, we work with qualified nurses, GDA staff
            and physiotherapists to bring nursing, elder care, equipment
            rental, and doctor consultations directly to people's homes.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            Every family we work with gets the same promise: expert care,
            verified staff, and support that's available whenever it's
            needed — day or night.
          </p>
        </div>
        <div className="relative h-72 overflow-hidden rounded-2xl shadow-card md:h-full">
          <Image
            src="/images/nurse-patient-care.png"
            alt="Anupam Health Care nurse caring for a patient at home"
            fill
            className="object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-xl bg-brand-navy/90 backdrop-blur-sm p-4 text-white">
            <p className="text-xs font-semibold text-emerald-200">
              Founder & Care Provider
            </p>
            <p className="mt-1 text-lg font-bold">Aakash Kaushik</p>
            <p className="mt-2 text-xs italic text-blue-100">
              "Committed to your health and well-being — every family
              deserves care they can trust."
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-5 py-14 md:px-8">
        <h2 className="text-center text-xl font-bold text-brand-navy">
          What we stand for
        </h2>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="text-center">
              <div
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                  color === "navy" ? "bg-brand-navy" : "bg-brand-green"
                }`}
              >
                <Icon size={20} className="text-white" />
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-900">
                {title}
              </p>
              <p className="mt-1 text-xs text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
