"use client";

import { useState, FormEvent, useEffect } from "react";
import { X, ChevronDown, CheckCircle, Shield, Calendar } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import { useSiteData, AREAS } from "@/context/SiteDataContext";
import { submitLead } from "@/lib/api";

const TIME_SLOTS = [
  "Morning (9 AM - 12 PM)",
  "Afternoon (12 PM - 4 PM)",
  "Evening (4 PM - 8 PM)",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function BookServiceModal() {
  const { isOpen, closeModal } = useBookingModal();
  const { services } = useSiteData();
  const [status, setStatus] = useState<Status>("idle");

  // Lock background scroll while modal is open, close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

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
      preferredDate: (form.elements.namedItem("preferredDate") as HTMLInputElement)?.value || undefined,
      preferredTime: (form.elements.namedItem("preferredTime") as HTMLSelectElement)?.value || undefined,
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-label="Book a service"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg font-bold text-brand-navy">Book a service</h3>
        <p className="mt-1 text-xs text-gray-500">
          Fill in your details — our team will call you within 10 minutes.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2.5">
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

          {/* Optional appointment scheduling */}
          <div className="grid grid-cols-2 gap-2.5">
            <input
              name="preferredDate"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded-lg border border-gray-200 bg-gray-50/80 px-3 py-2.5 text-sm outline-none focus:border-brand-navy focus:bg-white"
            />
            <div className="relative">
              <select
                name="preferredTime"
                defaultValue=""
                className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50/80 px-3 py-2.5 text-xs outline-none focus:border-brand-navy focus:bg-white"
              >
                <option value="">Any time</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <p className="-mt-1 flex items-center gap-1 text-[10px] text-gray-400">
            <Calendar size={11} /> Optional — pick a preferred date/time
          </p>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-1 w-full rounded-lg bg-brand-green py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Request callback"}
          </button>
        </form>

        <p className="mt-3 flex items-center justify-center gap-1 text-center text-[10px] text-gray-400">
          <Shield size={11} className="text-brand-green" />
          Your information is safe with us. 100% confidential
        </p>

        {status === "success" && (
          <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-3 text-center">
            <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-brand-green">
              <CheckCircle size={14} /> Thanks! Our team will call you
              shortly.
            </p>
          </div>
        )}
        {status === "error" && (
          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-center">
            <p className="text-xs font-medium text-red-600">
              Something went wrong. Please call 7011598306 instead.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
