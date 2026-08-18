"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, ReactNode } from "react";
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
  Menu,
  X,
  Crown,
  Sparkles,
  ChevronRight,
  Bell,
  Settings,
  HelpCircle,
  User,
  Zap,
  Gem,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, badge: null },
  { href: "/admin/leads", label: "Leads", icon: Users, badge: null },
  { href: "/admin/services", label: "Services", icon: Stethoscope, badge: null },
  { href: "/admin/packages", label: "Packages", icon: Package, badge: null },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote, badge: null },
  { href: "/admin/team", label: "Team", icon: UsersRound, badge: null },
  { href: "/admin/about", label: "About Page", icon: Info, badge: null },
  { href: "/admin/blog", label: "Blog", icon: Newspaper, badge: null },
];

const QUICK_ACTIONS = [
  { label: "Add Lead", icon: Users, color: "blue" },
  { label: "New Service", icon: Stethoscope, color: "emerald" },
  { label: "Create Package", icon: Package, color: "purple" },
  { label: "Write Blog", icon: Newspaper, color: "rose" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { email, logout } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80">
      {/* Desktop Sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-white/20 bg-white/80 backdrop-blur-xl shadow-xl shadow-gray-200/30 sm:flex sm:flex-col sticky top-0 h-screen">
        {/* Brand Section */}
        <div className="relative px-5 py-6">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-brand-navy/5 to-blue-500/5 blur-2xl" />
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-gradient-to-tr from-violet-500/5 to-purple-500/5 blur-2xl" />
          
          <div className="relative flex items-center gap-3">
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
          </div>
        </div>


        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>
          {NAV.map(({ href, label, icon: Icon, badge }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-brand-navy to-blue-700 text-white shadow-lg shadow-brand-navy/20"
                    : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={active ? "text-white/90" : "text-gray-400 group-hover:text-gray-600"} />
                  <span>{label}</span>
                </div>
                {badge && (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    active 
                      ? "bg-white/20 text-white" 
                      : "bg-rose-100 text-rose-600"
                  }`}>
                    {badge}
                  </span>
                )}
                {active && (
                  <div className="absolute -right-0.5 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-white/50" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-100/80 p-4">
          <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 p-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-blue-700 text-sm font-semibold text-white shadow-lg shadow-brand-navy/20">
                  {email?.[0]?.toUpperCase() || "A"}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{email || "Admin"}</p>
                <p className="text-[10px] text-gray-400">Administrator</p>
              </div>
              <button
                onClick={logout}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                title="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1 rounded-lg p-1">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <ExternalLink size={13} />
              Live Site
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/20 bg-white/80 px-4 py-3 backdrop-blur-xl sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-1.5 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-navy to-blue-700 text-xs font-bold text-white shadow-lg shadow-brand-navy/20">
              A
            </div>
            <p className="text-sm font-bold text-gray-900">Anupam</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative rounded-lg p-1.5 hover:bg-gray-100">
              <Bell size={18} className="text-gray-500" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
            <button onClick={logout} className="rounded-lg p-1.5 text-gray-400 hover:text-rose-500">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute inset-x-0 top-14 z-20 border-b border-gray-100 bg-white/95 backdrop-blur-xl shadow-xl sm:hidden">
            <nav className="space-y-0.5 p-3">
              {NAV.map(({ href, label, icon: Icon, badge }) => {
                const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-gradient-to-r from-brand-navy to-blue-700 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={17} />
                      <span>{label}</span>
                    </div>
                    {badge && (
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        active ? "bg-white/20 text-white" : "bg-rose-100 text-rose-600"
                      }`}>
                        {badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-8 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}