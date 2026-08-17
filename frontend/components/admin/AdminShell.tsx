"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Package,
  MessageSquareQuote,
  UsersRound,
  Newspaper,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { ReactNode } from "react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/services", label: "Services", icon: Stethoscope },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/team", label: "Team", icon: UsersRound },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { email, logout } = useAdminAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-60 shrink-0 border-r border-gray-100 bg-white sm:flex sm:flex-col">
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-navy text-xs font-bold text-white">
            A
          </div>
          <div>
            <p className="text-sm font-bold text-brand-navy leading-tight">Anupam</p>
            <p className="text-[10px] text-gray-400 leading-tight">Admin dashboard</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-brand-navy text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-brand-navy"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 p-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50"
          >
            <ExternalLink size={14} />
            View live site
          </a>
          <div className="mt-1 flex items-center justify-between rounded-lg px-3 py-2">
            <span className="truncate text-xs text-gray-400">{email}</span>
            <button
              onClick={logout}
              title="Log out"
              className="text-gray-400 hover:text-red-500"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-100 bg-white px-5 py-3 sm:hidden">
          <p className="text-sm font-bold text-brand-navy">Anupam Admin</p>
          <button onClick={logout} className="text-xs font-medium text-red-500">
            Log out
          </button>
        </header>
        <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
