"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Package,
  MessageSquareQuote,
  UsersRound,
  Newspaper,
  Info,
  LogOut,
  ExternalLink,
  Shield,
  UserCheck,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { ReactNode } from "react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads & Bookings", icon: Users },
  { href: "/admin/services", label: "Services", icon: Stethoscope },
  { href: "/admin/packages", label: "Care Packages", icon: Package },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/team", label: "Team Members", icon: UsersRound },
  { href: "/admin/about", label: "About Page", icon: Info },
  { href: "/admin/blog", label: "Blogs & News", icon: Newspaper },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { email, logout } = useAdminAuth();

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out of the admin panel?")) {
      logout();
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-200/80 bg-white sm:flex">
        {/* Brand Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-navy/5 p-1">
            <img
              src="/logo.png"
              alt="Anupam Health Care Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <span className="block text-base font-bold tracking-wide text-brand-navy">
              ANUPAM
            </span>
            <span className="block text-[9px] font-extrabold tracking-[0.15em] text-brand-green">
              ADMIN PORTAL
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Management
          </p>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-brand-navy text-white shadow-sm shadow-brand-navy/20"
                    : "text-gray-600 hover:bg-gray-100 hover:text-brand-navy"
                }`}
              >
                <Icon size={18} className={active ? "text-brand-green" : "text-gray-400"} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User info & Log out */}
        <div className="border-t border-gray-100 bg-gray-50/50 p-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-white hover:text-brand-navy hover:shadow-sm"
          >
            <ExternalLink size={14} className="text-brand-green" />
            View Live Website
          </a>

          <div className="mt-2 rounded-2xl border border-gray-200/70 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white">
                A
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-gray-800">
                  {email || "Administrator"}
                </p>
                <p className="text-[10px] text-brand-green font-semibold">
                  ● Super Admin
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/70 py-2 text-xs font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
            >
              <LogOut size={14} />
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Header bar for mobile & desktop */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200/80 bg-white px-5 sm:px-8">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-brand-green sm:hidden" />
            <span className="text-sm font-bold text-brand-navy sm:text-base">
              Anupam Health Care Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              <ExternalLink size={13} className="text-brand-green" />
              Live Site
            </a>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-1.5 text-xs font-bold text-red-600 shadow-sm transition hover:bg-red-600 hover:text-white"
            >
              <LogOut size={14} />
              Log Out
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-8 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
