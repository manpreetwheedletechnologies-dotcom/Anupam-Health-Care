"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Loader2,
  Users,
  UserPlus,
  CheckCircle2,
  CalendarCheck,
  Stethoscope,
  Package,
  MessageSquareQuote,
  UsersRound,
  Newspaper,
  Phone,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { adminGetStats, adminGetLeads, DashboardStats, LeadItem } from "@/lib/api";

export default function AdminDashboardHome() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    Promise.all([adminGetStats(token), adminGetLeads(token)])
      .then(([s, leads]) => {
        setStats(s);
        setRecentLeads(leads.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-sm text-gray-400">
        <Loader2 size={16} className="animate-spin" /> Loading dashboard...
      </div>
    );
  }

  const cards = [
    { label: "Total leads", value: stats.totalLeads, icon: Users, color: "bg-brand-navy" },
    { label: "New leads", value: stats.newLeads, icon: UserPlus, color: "bg-brand-green" },
    { label: "Converted", value: stats.convertedLeads, icon: CheckCircle2, color: "bg-emerald-500" },
    { label: "Leads today", value: stats.leadsToday, icon: CalendarCheck, color: "bg-amber-500" },
  ];

  const contentCards = [
    { label: "Services", value: stats.counts.services, icon: Stethoscope, href: "/admin/services" },
    { label: "Packages", value: stats.counts.packages, icon: Package, href: "/admin/packages" },
    { label: "Testimonials", value: stats.counts.testimonials, icon: MessageSquareQuote, href: "/admin/testimonials" },
    { label: "Team members", value: stats.counts.team, icon: UsersRound, href: "/admin/team" },
    { label: "Blog posts", value: stats.counts.blog, icon: Newspaper, href: "/admin/blog" },
  ];

  return (
    <div>
      <h1 className="text-lg font-bold text-brand-navy">Dashboard</h1>
      <p className="text-xs text-gray-400">Overview of leads and site content.</p>

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-gray-100 bg-white p-4">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
              <Icon size={15} className="text-white" />
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-gray-400">
        Site content
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {contentCards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-xl border border-gray-100 bg-white p-4 transition hover:border-brand-navy/30 hover:shadow-sm"
          >
            <Icon size={16} className="text-brand-navy" />
            <p className="mt-3 text-xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Recent leads
        </p>
        <Link href="/admin/leads" className="text-xs font-semibold text-brand-navy">
          View all →
        </Link>
      </div>
      <div className="mt-3 overflow-hidden rounded-xl border border-gray-100 bg-white">
        {recentLeads.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-400">No leads yet.</p>
        ) : (
          <ul className="divide-y divide-gray-50">
            {recentLeads.map((lead) => (
              <li key={lead.id} className="flex items-center justify-between px-5 py-3 text-sm">
                <div>
                  <p className="font-medium text-gray-800">{lead.name}</p>
                  <p className="text-xs text-gray-400">
                    {lead.service} · {lead.area}
                  </p>
                </div>
                <a
                  href={`tel:${lead.phone}`}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy"
                >
                  <Phone size={12} /> {lead.phone}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
