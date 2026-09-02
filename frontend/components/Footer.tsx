"use client";

import Link from "next/link";
import { Heart, Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Twitter, Award, Shield, Lock } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Blogs & Resources", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

const CONTACT_INFO = [
  { icon: Phone, label: "7011598306", href: "tel:7011598306" },
  { icon: Phone, label: "9818283386", href: "tel:9818283386" },
  { icon: Mail, label: "info@anupamhealthcare.com", href: "mailto:info@anupamhealthcare.com" },
  { icon: MapPin, label: "Main Office: GF 10, Ansal Satyam Building, RDC, Raj Nagar, Ghaziabad" },
  { icon: MapPin, label: "Branch: T1 MCC Signature Heights, Raj Nagar Extn, Ghaziabad" },
  { icon: MapPin, label: "Branch: D 564, Govindpuram, Ghaziabad" },
  { icon: Clock, label: "Available 24/7 for Emergencies" },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export default function Footer() {
  const { services } = useSiteData();
  const servicesList = services.map((s) => ({ label: s.title, slug: s.slug }));

  return (
    <footer className="bg-[#022b51] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
                        <div className="flex h-[80px] w-[80px]">
            <img
              src="/logo.png"
              alt="Anupam Health Care Logo"
              className="h-full w-full object-contain p-1"
            />
          </div>
              <div>
                <p className="text-lg font-bold tracking-wide">ANUPAM</p>
                <p className="text-[9px] font-semibold tracking-[0.15em] text-brand-green">
                  HEALTH CARE SERVICES
                </p>
              </div>
            </div>
            <p className="text-sm text-white/70 max-w-xs leading-relaxed">
              Care Beyond Compare — Your health is our priority. 
              Trusted healthcare services at your doorstep with compassion and expertise.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Shield size={14} className="text-brand-green" />
              <span>Verified & Trusted</span>
              <span className="mx-1">|</span>
              <Award size={14} className="text-brand-green" />
              <span>Quality Assured</span>
            </div>
            <div className="flex gap-3 pt-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-brand-green hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-white/90">Quick Links</h4>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/60 transition hover:text-white hover:pl-1"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-white/90">Our Services</h4>
            <ul className="mt-4 space-y-2.5">
              {servicesList.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/60 transition hover:text-white hover:pl-1"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Office Locations */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white/90">Contact & Locations</h4>
            
            {/* Direct Contact Numbers */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white/80">
                <Phone size={14} className="text-brand-green shrink-0" />
                <a href="tel:7011598306" className="hover:text-white font-semibold">7011598306</a>
                <span>/</span>
                <a href="tel:9818283386" className="hover:text-white font-semibold">9818283386</a>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Mail size={14} className="text-brand-green shrink-0" />
                <a href="mailto:info@anupamhealthcare.com" className="hover:text-white">info@anupamhealthcare.com</a>
              </div>
            </div>

            {/* Office Locations with distinct colored badges */}
            <div className="space-y-2.5 pt-1">
              {/* Head Office */}
              <div className="rounded-xl bg-white/5 p-2.5 border border-amber-400/30">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 border border-amber-400/40">
                    ⭐ MAIN HEAD OFFICE
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/90 font-medium leading-tight">
                  GF 10, Ansal Satyam Building, RDC, Raj Nagar, Ghaziabad
                </p>
              </div>

              {/* Branch 1 */}
              <div className="rounded-xl bg-white/5 p-2.5 border border-emerald-500/30">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-500/40">
                    🏢 BRANCH 1 (Raj Nagar Extn)
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/75 leading-tight">
                  T1 MCC Signature Heights, Raj Nagar Extension
                </p>
              </div>

              {/* Branch 2 */}
              <div className="rounded-xl bg-white/5 p-2.5 border border-sky-500/30">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded bg-sky-500/20 px-1.5 py-0.5 text-[9px] font-bold text-sky-300 border border-sky-500/40">
                    🏢 BRANCH 2 (Govindpuram)
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/75 leading-tight">
                  D 564, Govindpuram, Ghaziabad
                </p>
              </div>
            </div>

            {/* Emergency Badge */}
            <div className="rounded-xl bg-brand-green/20 p-2.5 border border-brand-green/30">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-green">
                <Clock size={13} />
                <span>24/7 Available for Emergencies</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Anupam Health Care Services. All rights reserved.
            <span className="hidden sm:inline"> — </span>
            Care Beyond Compare
          </p>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/40 transition hover:bg-white/10 hover:text-white"
            >
              <Lock size={12} className="text-brand-green" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}