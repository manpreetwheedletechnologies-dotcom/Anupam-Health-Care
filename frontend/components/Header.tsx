"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Menu,
  X,
  Ambulance,
  Clock,
  ChevronDown,
  CalendarCheck,
} from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import { useSiteData } from "@/context/SiteDataContext";
import { getIcon } from "@/lib/icons";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Blogs & Resources", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const { openModal } = useBookingModal();
  const { services } = useSiteData();
  const pathname = usePathname();

  // Helper: exact match for "/" ; startsWith for everything else so
  // nested routes (e.g. /services/xyz) still mark the parent active.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isServicesActive = pathname.startsWith("/services");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);

      // Hide header while scrolling down (past the initial 100px),
      // bring it back as soon as the user scrolls up.
      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true);
        setServicesOpen(false);
        setOpen(false);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Close mobile menu / dropdowns whenever the route changes
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white/90 backdrop-blur-sm"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-[80px] w-[80px]">
            <img
              src="/logo.png"
              alt="Anupam Health Care Logo"
              className="h-full w-full object-contain p-1"
            />
          </div>
          <span className="leading-tight">
            <span className="block text-[16px] font-bold tracking-wide text-brand-navy">
              ANUPAM
            </span>
            <span className="block text-[9px] font-semibold tracking-[0.15em] text-brand-green">
              HEALTH CARE SERVICES
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-gray-700 md:flex">
          <div className="relative" ref={servicesRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              className={`flex items-center gap-1 transition-colors hover:text-brand-navy ${
                isServicesActive ? "text-brand-navy" : ""
              }`}
            >
              Patient Services
              <ChevronDown
                size={14}
                className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {/* underline indicator for Services, matches the style used on NAV_LINKS */}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-brand-green transition-all ${
                isServicesActive ? "w-full" : "w-0"
              }`}
            />

            {servicesOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-3 w-[560px] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl">
                <div className="grid grid-cols-2 gap-1.5">
                  {services.slice(0, 6).map(({ title, desc, icon, color, slug }) => {
                    const active = isActive(`/services/${slug}`);
                    const Icon = getIcon(icon);
                    return (
                      <Link
                        key={slug}
                        href={`/services/${slug}`}
                        onClick={() => setServicesOpen(false)}
                        className={`flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-brand-sky/40 ${
                          active ? "bg-brand-sky/50" : ""
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            color === "navy" ? "bg-brand-navy" : "bg-brand-green"
                          }`}
                        >
                          <Icon size={16} className="text-white" />
                        </div>
                        <div>
                          <p
                            className={`text-[13px] font-semibold ${
                              active ? "text-brand-navy" : "text-gray-900"
                            }`}
                          >
                            {title}
                          </p>
                          <p className="text-[11px] text-gray-500">{desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/services"
                  onClick={() => setServicesOpen(false)}
                  className="mt-2 block rounded-xl bg-brand-navy/5 py-2 text-center text-xs font-semibold text-brand-navy hover:bg-brand-navy/10"
                >
                  {services.length > 6
                    ? `More services (+${services.length - 6}) →`
                    : "View all services →"}
                </Link>
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative transition-colors hover:text-brand-navy after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-green after:transition-all hover:after:w-full ${
                  active
                    ? "text-brand-navy after:w-full"
                    : "after:w-0"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openModal}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-brand-green to-brand-green/80 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:shadow-lg hover:scale-105 sm:flex"
          >
            <CalendarCheck size={15} /> Book Service
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-brand-navy transition hover:bg-brand-sky md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-slide-down relative z-50 border-t border-gray-100 bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              className={`flex items-center justify-between py-2 px-3 rounded-lg hover:bg-brand-sky/30 ${
                isServicesActive ? "bg-brand-sky/30 text-brand-navy" : ""
              }`}
            >
              Services
              <ChevronDown
                size={14}
                className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-gray-100 pl-3">
                {services.slice(0, 6).map((s) => {
                  const active = isActive(`/services/${s.slug}`);
                  return (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={() => setOpen(false)}
                      className={`py-1.5 px-2 text-[13px] hover:text-brand-navy ${
                        active
                          ? "font-semibold text-brand-navy"
                          : "text-gray-600"
                      }`}
                    >
                      {s.title}
                    </Link>
                  );
                })}
                <Link
                  href="/services"
                  onClick={() => setOpen(false)}
                  className="py-1.5 px-2 text-[13px] font-semibold text-brand-navy"
                >
                  {services.length > 6
                    ? `More services (+${services.length - 6}) →`
                    : "View all services →"}
                </Link>
              </div>
            )}

            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`py-2 px-3 rounded-lg transition-colors hover:bg-brand-sky/30 ${
                    active
                      ? "bg-brand-sky/30 font-semibold text-brand-navy"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openModal();
              }}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-green to-brand-green/80 px-5 py-3 text-sm font-medium text-white shadow-md"
            >
              <CalendarCheck size={15} /> Book Service
            </button>
            <a
              href="tel:7011598306"
              className="mt-1 flex items-center justify-center gap-2 rounded-full border border-brand-navy/20 px-5 py-3 text-sm font-medium text-brand-navy"
            >
              <Phone size={15} /> Call: 7011598306
            </a>
            <a
              href="tel:9818283386"
              className="mt-1 flex items-center justify-center gap-2 rounded-full border border-brand-navy/20 px-5 py-3 text-sm font-medium text-brand-navy"
            >
              <Phone size={15} /> Call: 9818283386
            </a>
          </nav>
        </div>
      )}

      <div className="relative overflow-hidden bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy py-2.5">
        <div className="relative flex flex-wrap items-center justify-center gap-3 text-center text-[10px] font-semibold tracking-[0.15em] text-white sm:text-xs">
          <span>✦ YOUR HEALTH, OUR PRIORITY ✦</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1">
            <Ambulance size={12} className="text-brand-green" />
            24/7 Emergency Support
          </span>
          <span className="hidden sm:inline">|</span>
          <span>✦ CARE BEYOND COMPARE ✦</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-brand-green" />
            Free Patient Assessment
          </span>
        </div>
      </div>
    </header>
  );
}