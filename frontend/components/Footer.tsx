"use client";

import { Heart, Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Twitter, Award, Shield } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/our-team" },
  { label: "Blogs & Resources", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

const CONTACT_INFO = [
  { icon: Phone, label: "7011598306", href: "tel:7011598306" },
  { icon: Mail, label: "info@anupamhealthcare.com", href: "mailto:info@anupamhealthcare.com" },
  { icon: MapPin, label: "123, Health Care Street, Ghaziabad, India-201001" },
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

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-white/90">Contact Us</h4>
            <ul className="mt-4 space-y-3">
              {CONTACT_INFO.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="flex items-start gap-3 text-sm text-white/60 transition hover:text-white"
                    >
                      <Icon size={16} className="shrink-0 mt-0.5 text-brand-green" />
                      <span>{label}</span>
                    </a>
                  ) : (
                    <div className="flex items-start gap-3 text-sm text-white/60">
                      <Icon size={16} className="shrink-0 mt-0.5 text-brand-green" />
                      <span>{label}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {/* Emergency Badge */}
            <div className="mt-4 rounded-xl bg-brand-green/20 p-3 border border-brand-green/30">
              <p className="flex items-center gap-2 text-xs font-semibold text-brand-green">
                <Phone size={14} />
                Emergency: 7011598306
              </p>
              <p className="text-[10px] text-white/40">Available 24/7 for emergencies</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Anupam Health Care Services. All rights reserved.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> — </span>
            Care Beyond Compare
          </p>
          <p className="mt-1 text-[10px] text-white/20">
            Made with ❤️ for better healthcare at home
          </p>
        </div>
      </div>
    </footer>
  );
}