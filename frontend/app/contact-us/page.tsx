"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, ChevronDown } from "lucide-react";
import { useSiteData, AREAS } from "@/context/SiteDataContext";
import { submitLead } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactUsPage() {
  const [status, setStatus] = useState<Status>("idle");
  const { services } = useSiteData();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement)
        .value,
      area: (form.elements.namedItem("area") as HTMLSelectElement).value,
    };

    try {
      await submitLead(payload);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-brand-sky/40 px-5 py-14 text-center md:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
          Contact us
        </p>
        <h1 className="mt-2 text-3xl font-bold text-brand-navy sm:text-4xl">
          We're here to help
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
          Call us anytime or send your details and our team will call you
          back within 10 minutes.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-14 md:grid-cols-2 md:px-8">
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <Phone size={18} className="mt-0.5 text-brand-green" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Phone</p>
              <a href="tel:7011598306" className="text-sm text-gray-600">
                7011598306
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 text-brand-green" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Email</p>
              <a
                href="mailto:info@anupamhealthcare.com"
                className="text-sm text-gray-600"
              >
                info@anupamhealthcare.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 text-brand-green" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Address</p>
              <p className="text-sm text-gray-600">
                123, Health Care Street, Ghaziabad, India - 201001
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={18} className="mt-0.5 text-brand-green" />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Availability
              </p>
              <p className="text-sm text-gray-600">
                Available 24/7 for emergencies
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-100 p-6 shadow-card"
        >
          <p className="text-base font-semibold text-brand-navy">
            Request a callback
          </p>
          <div className="mt-4 flex flex-col gap-2.5">
            <input
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-gray-200 bg-gray-50/80 px-3.5 py-2.5 text-sm outline-none focus:border-brand-navy focus:bg-white"
            />
            <input
              name="phone"
              required
              type="tel"
              pattern="[0-9]{10}"
              placeholder="Mobile number"
              className="w-full rounded-lg border border-gray-200 bg-gray-50/80 px-3.5 py-2.5 text-sm outline-none focus:border-brand-navy focus:bg-white"
            />
            <div className="relative">
              <select
                name="service"
                required
                defaultValue=""
                className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50/80 px-3.5 py-2.5 text-sm outline-none focus:border-brand-navy focus:bg-white"
              >
                <option value="" disabled>
                  Select service needed
                </option>
                {services.map((s) => (
                  <option key={s.title}>{s.title}</option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            <div className="relative">
              <select
                name="area"
                required
                defaultValue=""
                className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50/80 px-3.5 py-2.5 text-sm outline-none focus:border-brand-navy focus:bg-white"
              >
                <option value="" disabled>
                  Select your area
                </option>
                {AREAS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-1 w-full rounded-lg bg-brand-green py-2.5 text-sm font-semibold text-white shadow-md disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send message"}
            </button>
          </div>

          {status === "success" && (
            <p className="mt-3 text-center text-xs font-medium text-brand-green">
              Thanks — our team will call you shortly.
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-center text-xs font-medium text-red-600">
              Something went wrong. Please call 7011598306 instead.
            </p>
          )}
        </form>
      </section>

      <Footer />
    </main>
  );
}
