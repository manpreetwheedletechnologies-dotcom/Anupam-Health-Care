"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Sparkles,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  CalendarCheck,
  User,
  Navigation,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Heart,
  Home,
  Building2,
  ExternalLink,
} from "lucide-react";
import { useSiteData, AREAS } from "@/context/SiteDataContext";
import { submitLead } from "@/lib/api";
import Testimonials from "@/components/Testimonials";
import ReviewAndLocationQR from "@/components/ReviewAndLocationQR";

type Status = "idle" | "submitting" | "success" | "error";

const BRANCHES = [
  {
    id: "main",
    type: "Head / Main Office",
    name: "Head Office — RDC Raj Nagar",
    shortName: "RDC Raj Nagar",
    address: "GF 10, Ansal Satyam Building, RDC, Raj Nagar, Ghaziabad, Uttar Pradesh 201002",
    phones: ["7011598306", "9818283386"],
    mapSrc: `https://www.google.com/maps?q=${encodeURIComponent(
      "GF 10, Ansal Satyam Building, RDC, Raj Nagar, Ghaziabad"
    )}&output=embed`,
    directionsUrl:
      "https://maps.google.com/?q=Anupam+Health+Care+GF+10+Ansal+Satyam+Building+RDC+Raj+Nagar+Ghaziabad",
  },
  {
    id: "rajnagar-ext",
    type: "Branch Office",
    name: "Branch Office — Raj Nagar Extension",
    shortName: "Raj Nagar Extension",
    address: "T1 MCC Signature Heights, Raj Nagar Extension, Ghaziabad, Uttar Pradesh 201003",
    phones: ["7011598306", "9818283386"],
    mapSrc: `https://www.google.com/maps?q=${encodeURIComponent(
      "T1 MCC SIGNATURE HEIGHTS, Raj Nagar Extension, Ghaziabad, Uttar Pradesh 201003"
    )}&output=embed`,
    directionsUrl:
      "https://maps.google.com/?q=T1+MCC+SIGNATURE+HEIGHTS+Raj+Nagar+Extension+Ghaziabad",
  },
  {
    id: "govindpuram",
    type: "Branch Office",
    name: "Branch Office — Govindpuram",
    shortName: "Govindpuram",
    address: "D 564, Govindpuram, Ghaziabad, Uttar Pradesh 201013",
    phones: ["7011598306", "9818283386"],
    mapSrc: `https://www.google.com/maps?q=${encodeURIComponent(
      "D 564, Govindpuram, Ghaziabad, Uttar Pradesh 201013"
    )}&output=embed`,
    directionsUrl:
      "https://maps.google.com/?q=D+564+Govindpuram+Ghaziabad",
  },
];

// Hero background image.
const HERO_IMAGE =
  "/images/services/24x7-customer-support.png";

export default function ContactUsPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [selectedBranchId, setSelectedBranchId] = useState<string>("main");
  const { services } = useSiteData();

  const selectedBranch =
    BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      area: (form.elements.namedItem("area") as HTMLSelectElement).value,
      preferredDate: (form.elements.namedItem("preferredDate") as HTMLInputElement)?.value || undefined,
      preferredTime: (form.elements.namedItem("preferredTime") as HTMLSelectElement)?.value || undefined,
      message:
        (form.elements.namedItem("message") as HTMLTextAreaElement | null)
          ?.value || "",
    };

    try {
      await submitLead(payload);
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone (Primary)",
      value: "7011598306",
      href: "tel:7011598306",
    },
    {
      icon: Phone,
      title: "Phone (Secondary)",
      value: "9818283386",
      href: "tel:9818283386",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@anupamhealthcare.com",
      href: "mailto:info@anupamhealthcare.com",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "GF 10, Ansal Satyam Building, RDC, Raj Nagar, Ghaziabad",
      href: null,
    },
    {
      icon: Clock,
      title: "Hours",
      value: "Available 24/7 for emergencies",
      href: null,
    },
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Happy Families" },
    { icon: Star, value: "4.9/5", label: "Rating" },
    { icon: Clock, value: "24/7", label: "Support" },
    { icon: ShieldCheck, value: "100%", label: "Verified Staff" },
  ];

  return (
    <main
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
    >
      <Header />

      {/* Hero Section — background image with a floating form card on top,
          matching the "form pehle" reference layout (nothing else overlaps
          the hero: no side cards, no map here). */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="relative flex min-h-[640px] overflow-hidden rounded-3xl">
            <img
              src={HERO_IMAGE}
              alt="Caregiver supporting a patient at home"
              className="absolute inset-0 h-full w-full scale-110 object-cover"
            />
            {/* Blue only at the top, fading down to white — and white fades
                in from the left and right edges too, so only the top-center
                band of the image stays blue-tinted. Image is blurred and
                scaled up slightly (to hide blurred edges) so the overlaid
                text stays easy to read. */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 via-brand-navy/35 to-white" />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white to-transparent" />

            <div className="relative z-10 grid w-full items-center gap-8 p-6 sm:p-10 md:grid-cols-[1fr_1.1fr] lg:p-14">
              {/* Left: heading + quick contact */}
              <div className="rounded-3xl border border-white/40 bg-white/30 p-6 text-brand-navy shadow-lg backdrop-blur-xl sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-navy backdrop-blur-md">
                  <Sparkles size={14} className="text-brand-green" />
                  Get in Touch
                </span>
                <h1 className="mt-5 text-4xl font-bold text-brand-navy sm:text-5xl">
                  We're here to <br />
                  <span className="bg-gradient-to-r from-brand-green to-brand-sky bg-clip-text text-transparent">
                    help you
                  </span>
                </h1>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-navy/70 md:text-base">
                  Call us anytime or send your details and our team will call
                  you back within 10 minutes.
                </p>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                  {stats.map(({ icon: Icon, value, label }) => (
                    <div key={label} className="flex items-center gap-2 text-sm text-brand-navy/70">
                      <Icon size={16} className="text-brand-green" />
                      <span>
                        <span className="font-semibold text-brand-navy">{value}</span> {label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 hidden flex-col gap-4 md:flex">
                  {[
                    { icon: Phone, label: "7011598306", href: "tel:7011598306" },
                    { icon: Phone, label: "9818283386", href: "tel:9818283386" },
                    { icon: Mail, label: "info@anupamhealthcare.com", href: "mailto:info@anupamhealthcare.com" },
                    { icon: Clock, label: "Available 24/7 for emergencies" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-navy/10 bg-white/60 backdrop-blur-md">
                        <item.icon size={16} className="text-brand-green" />
                      </div>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-brand-navy/80 hover:text-brand-navy">
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-sm text-brand-navy/80">{item.label}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: floating form card — smaller and centered in its column */}
              <form
                onSubmit={handleSubmit}
                className="ml-auto w-full max-w-sm rounded-3xl border border-white/50 bg-white p-5 shadow-2xl transition-all duration-300 sm:p-6"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={20} className="text-brand-green" />
                    <p className="text-lg font-bold text-brand-navy">
                      Request a callback
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    Fill in your details and we'll get back to you within 10 minutes
                  </p>
                </div>

                <div className="space-y-3.5">
                  {/* Name Field */}
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <User size={16} className="text-brand-navy/40" />
                    </div>
                    <input
                      name="name"
                      required
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-3.5 py-3 text-sm outline-none transition-all focus:border-brand-navy focus:bg-white focus:shadow-sm"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <Phone size={16} className="text-brand-navy/40" />
                    </div>
                    <input
                      name="phone"
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder="Mobile number (10 digits)"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-3.5 py-3 text-sm outline-none transition-all focus:border-brand-navy focus:bg-white focus:shadow-sm"
                    />
                  </div>

                  {/* Service Select */}
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <Briefcase size={16} className="text-brand-navy/40" />
                    </div>
                    <select
                      name="service"
                      required
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-10 py-3 text-sm outline-none transition-all focus:border-brand-navy focus:bg-white focus:shadow-sm"
                    >
                      <option value="" disabled>
                        Select service needed
                      </option>
                      {services.map((s) => (
                        <option key={s.title} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-navy/40"
                    />
                  </div>

                  {/* Area Select */}
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <Navigation size={16} className="text-brand-navy/40" />
                    </div>
                    <select
                      name="area"
                      required
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-10 py-3 text-sm outline-none transition-all focus:border-brand-navy focus:bg-white focus:shadow-sm"
                    >
                      <option value="" disabled>
                        Select your area
                      </option>
                      {AREAS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-navy/40"
                    />
                  </div>

                  {/* Appointment scheduling (optional) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                        <CalendarCheck size={16} className="text-brand-navy/40" />
                      </div>
                      <input
                        name="preferredDate"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-3 py-3 text-sm outline-none transition-all focus:border-brand-navy focus:bg-white focus:shadow-sm"
                      />
                    </div>
                    <div className="relative">
                      <select
                        name="preferredTime"
                        defaultValue=""
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 px-3 pr-8 py-3 text-xs outline-none transition-all focus:border-brand-navy focus:bg-white focus:shadow-sm"
                      >
                        <option value="">Any time</option>
                        <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                        <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-navy/40"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <textarea
                      name="message"
                      placeholder="Tell us about your requirements (optional)"
                      rows={3}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-3 text-sm outline-none transition-all focus:border-brand-navy focus:bg-white focus:shadow-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand-navy to-brand-navy/90 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:from-brand-navy/90 hover:to-brand-navy disabled:opacity-60"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {status === "submitting" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send message
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-brand-green/10 p-3 text-xs font-medium text-brand-green">
                    <CheckCircle size={16} className="text-brand-green" />
                    Thanks — our team will call you shortly.
                  </div>
                )}
                {status === "error" && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600">
                    <AlertCircle size={16} className="text-red-500" />
                    Something went wrong. Please call 7011598306 or 9818283386 instead.
                  </div>
                )}

                {/* Trust Badge */}
                <div className="mt-6 flex items-center justify-center gap-4 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <ShieldCheck size={14} className="text-brand-green" />
                    Secure & confidential
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock size={14} className="text-brand-green" />
                    Fast response
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Heart size={14} className="text-brand-green" />
                    Compassionate care
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Details Section — 3 office locations + dynamic map */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-brand-green to-brand-sky" />
            <div>
              <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">
                Our Office Locations
              </h2>
              <p className="text-xs text-gray-500">
                Main Head Office + 2 Branch Offices across Ghaziabad
              </p>
            </div>
          </div>

          {/* Quick tab pills to toggle between 3 offices */}
          <div className="flex flex-wrap gap-2">
            {BRANCHES.map((b) => {
              const isActive = selectedBranchId === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBranchId(b.id)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-brand-navy text-white shadow-md shadow-brand-navy/20"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-brand-navy/30 hover:bg-gray-50"
                  }`}
                >
                  {b.shortName}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          {/* Left: 3 Office location cards with distinct styling */}
          <div className="space-y-4 md:col-span-6">
            {BRANCHES.map((b) => {
              const isSelected = selectedBranchId === b.id;
              const isMain = b.id === "main";
              const isBranch1 = b.id === "rajnagar-ext";

              // Color classes based on office type
              const badgeStyle = isMain
                ? "bg-amber-100 text-amber-900 border-amber-300"
                : isBranch1
                ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                : "bg-sky-100 text-sky-900 border-sky-300";

              const iconStyle = isMain
                ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-amber-200"
                : isBranch1
                ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-emerald-200"
                : "bg-gradient-to-br from-sky-500 to-brand-navy text-white shadow-sky-200";

              const borderStyle = isSelected
                ? isMain
                  ? "border-amber-400 bg-gradient-to-r from-amber-50/60 via-white to-brand-sky/20 ring-2 ring-amber-400/40 shadow-lg"
                  : isBranch1
                  ? "border-emerald-400 bg-gradient-to-r from-emerald-50/60 via-white to-brand-sky/20 ring-2 ring-emerald-400/40 shadow-lg"
                  : "border-sky-400 bg-gradient-to-r from-sky-50/60 via-white to-brand-sky/20 ring-2 ring-sky-400/40 shadow-lg"
                : isMain
                ? "border-amber-200 bg-amber-50/20 hover:border-amber-400 hover:shadow-md"
                : "border-gray-200 bg-white hover:border-brand-sky/60 hover:shadow-md";

              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBranchId(b.id)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${borderStyle}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-sm ${iconStyle}`}
                      >
                        {isMain ? <Star size={20} className="fill-white" /> : <Building2 size={20} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${badgeStyle}`}
                          >
                            {isMain ? "⭐ MAIN HEADQUARTERS" : b.type}
                          </span>
                          {isMain && (
                            <span className="rounded bg-brand-navy px-1.5 py-0.5 text-[9px] font-bold text-white">
                              PRIMARY
                            </span>
                          )}
                        </div>
                        <h4 className="mt-1 text-sm font-bold text-brand-navy sm:text-base">
                          {b.name}
                        </h4>
                      </div>
                    </div>

                    <a
                      href={b.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                        isMain
                          ? "border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-600 hover:text-white"
                          : "border-gray-200 bg-white text-brand-navy hover:bg-brand-navy hover:text-white"
                      }`}
                    >
                      <Navigation size={13} className={isMain ? "text-amber-600" : "text-brand-green"} />
                      Directions
                    </a>
                  </div>

                  <p className="mt-3.5 text-xs leading-relaxed text-gray-700 font-medium">
                    <MapPin size={14} className="mr-1.5 inline text-brand-green" />
                    {b.address}
                  </p>

                  <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-brand-green" />
                      <a
                        href={`tel:${b.phones[0]}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-brand-navy hover:underline"
                      >
                        {b.phones[0]}
                      </a>
                      <span className="text-gray-300">|</span>
                      <a
                        href={`tel:${b.phones[1]}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-brand-navy hover:underline"
                      >
                        {b.phones[1]}
                      </a>
                    </div>
                    <div className="flex items-center gap-1 font-medium text-brand-green">
                      <Clock size={12} />
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected office map embed (6 cols) */}
          <div className="relative flex min-h-[380px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm md:col-span-6">
            <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#2c3e50]/90 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              <MapPin size={12} className="text-brand-green" />
              {selectedBranch.name}
            </div>

            <a
              href={selectedBranch.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-brand-green px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-brand-green/90"
            >
              <ExternalLink size={12} />
              Open GPS
            </a>

            <iframe
              key={selectedBranch.id}
              title={`${selectedBranch.name} location map`}
              src={selectedBranch.mapSrc}
              className="h-full w-full min-h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* QR Scanner Section */}
        <div className="mt-10">
          <ReviewAndLocationQR />
        </div>
      </section>

      {/* Emergency CTA Section */}
      <section className="px-5 py-8 md:px-8">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navy/95 p-8 text-center text-white shadow-xl md:p-12">
          <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-brand-green/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-brand-sky/20 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <CalendarCheck size={28} className="text-white" />
            </div>

            <h3 className="mt-4 text-2xl font-bold">Need immediate care?</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/80">
              For urgent medical assistance, call us directly. We're available
              24/7 for emergencies.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="tel:7011598306"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-green/90 hover:shadow-xl"
              >
                <Phone size={18} />
                Emergency: 7011598306
              </a>
              <a
                href="tel:9818283386"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-green/90 hover:shadow-xl"
              >
                <Phone size={18} />
                Emergency: 9818283386
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
              >
                <Home size={18} />
                Book Home Visit
              </a>
            </div>

            <p className="mt-4 flex items-center justify-center gap-1 text-xs text-white/50">
              <CheckCircle size={12} className="text-brand-green" /> Free consultation • No obligation • Same-day service
            </p>
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </main>
  );
}