"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Loader2,
  Users,
  UserPlus,
  CheckCircle2,
  CalendarCheck,
  CalendarClock,
  Stethoscope,
  Package,
  MessageSquareQuote,
  UsersRound,
  Newspaper,
  Phone,
  TrendingUp,
  Clock,
  ArrowRight,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Percent,
  Target,
  Award,
  Shield,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { adminGetStats, adminGetLeads, DashboardStats, LeadItem } from "@/lib/api";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// Simple chart components
function MiniBarChart({ data, color = "brand-navy" }: { data: number[]; color?: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-12">
      {data.map((value, i) => (
        <div
          key={i}
          className={`w-4 rounded-t bg-${color} transition-all duration-500`}
          style={{ height: `${(value / max) * 100}%`, minHeight: "4px" }}
        />
      ))}
    </div>
  );
}

function DonutChart({ percentage, label }: { percentage: number; label: string }) {
  const circumference = 2 * Math.PI * 24;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <svg className="h-16 w-16 -rotate-90">
          <circle
            className="text-gray-100"
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r="24"
            cx="32"
            cy="32"
          />
          <circle
            className="text-brand-navy transition-all duration-1000"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="24"
            cx="32"
            cy="32"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold">{percentage}%</span>
        </div>
      </div>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

export default function AdminDashboardHome() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<LeadItem[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    Promise.all([adminGetStats(token), adminGetLeads(token)])
      .then(([s, leads]) => {
        setStats(s);
        setRecentLeads(leads.slice(0, 5));
        setUpcomingAppointments(
          leads
            .filter((l) => !!l.confirmedDate)
            .sort((a, b) => a.confirmedDate.localeCompare(b.confirmedDate))
            .slice(0, 5)
        );
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading || !stats) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-brand-navy" />
          <p className="text-sm text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate some metrics for charts
  const conversionRate = stats.totalLeads > 0 
    ? Math.round((stats.convertedLeads / stats.totalLeads) * 100) 
    : 0;
  
  const appointmentRate = stats.upcomingAppointments > 0 
    ? Math.round((stats.upcomingAppointments / stats.totalLeads) * 100) 
    : 0;

  const weeklyTrend = [12, 8, 15, 10, 18, 14, stats.leadsToday];
  const monthlyLeads = [45, 52, 38, 60, 48, 55];

  // Define all data arrays
  const cards = [
    { label: "Total leads", value: stats.totalLeads, icon: Users, color: "from-blue-500 to-blue-600", bg: "bg-blue-50" },
    { label: "New leads", value: stats.newLeads, icon: UserPlus, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50" },
    { label: "Appointments", value: stats.upcomingAppointments, icon: CalendarClock, color: "from-purple-500 to-purple-600", bg: "bg-purple-50" },
    { label: "Converted", value: stats.convertedLeads, icon: CheckCircle2, color: "from-teal-500 to-teal-600", bg: "bg-teal-50" },
    { label: "Leads today", value: stats.leadsToday, icon: CalendarCheck, color: "from-amber-500 to-amber-600", bg: "bg-amber-50" },
  ];

  const contentCards = [
    { label: "Services", value: stats.counts.services, icon: Stethoscope, href: "/admin/services", desc: "Manage services" },
    { label: "Packages", value: stats.counts.packages, icon: Package, href: "/admin/packages", desc: "Manage packages" },
    { label: "Testimonials", value: stats.counts.testimonials, icon: MessageSquareQuote, href: "/admin/testimonials", desc: "Manage testimonials" },
    { label: "Team members", value: stats.counts.team, icon: UsersRound, href: "/admin/team", desc: "Manage team" },
    { label: "Blog posts", value: stats.counts.blog, icon: Newspaper, href: "/admin/blog", desc: "Manage blog" },
  ];

  const quickActions = [
    { label: "Add Lead", icon: UserPlus, href: "/admin/leads/add", color: "blue" },
    { label: "New Service", icon: Stethoscope, href: "/admin/services/add", color: "emerald" },
    { label: "Add Package", icon: Package, href: "/admin/packages/add", color: "purple" },
    { label: "Write Blog", icon: Newspaper, href: "/admin/blog/add", color: "amber" },
  ];

  const insightCards = [
    { 
      label: "Conversion Rate", 
      value: `${conversionRate}%`, 
      icon: Target, 
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      change: "+12%"
    },
    { 
      label: "Appointment Ratio", 
      value: `${appointmentRate}%`, 
      icon: Calendar, 
      color: "text-purple-600",
      bg: "bg-purple-50",
      change: "+5%"
    },
    { 
      label: "Avg. Response", 
      value: "2.4h", 
      icon: Clock, 
      color: "text-blue-600",
      bg: "bg-blue-50",
      change: "-30%"
    },
    { 
      label: "Lead Quality", 
      value: "High", 
      icon: Award, 
      color: "text-amber-600",
      bg: "bg-amber-50",
      change: "+8%"
    },
  ];


  return (
    <div className="space-y-6">
      {/* Header with Time */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your leads and content.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </div>
          <div className="text-xs text-gray-400">
            <Clock size={12} className="inline mr-1" />
            {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="flex flex-wrap gap-2">
        {quickActions.map(({ label, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className={`inline-flex items-center gap-2 rounded-full bg-${color}-50 px-4 py-2 text-xs font-medium text-${color}-600 transition-all hover:bg-${color}-100 hover:scale-105`}
          >
            <Icon size={14} /> {label}
          </Link>
        ))}
      </div> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:shadow-gray-100/50"
          >
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity" />
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
              <Icon size={18} className="text-gray-700" />
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts & Analytics Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Weekly Trend */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Weekly Leads Trend</p>
              <p className="text-xl font-bold text-gray-900">{stats.leadsToday} today</p>
            </div>
            <TrendingUp size={18} className="text-emerald-500" />
          </div>
          <MiniBarChart data={weeklyTrend} color="brand-navy" />
          <div className="mt-2 flex justify-between text-[10px] text-gray-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Conversion Metrics */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500">Conversion Metrics</p>
            <PieChart size={18} className="text-brand-navy" />
          </div>
          <div className="mt-3 space-y-3">
            <DonutChart percentage={conversionRate} label="Conversion Rate" />
            <DonutChart percentage={appointmentRate} label="Appointment Rate" />
          </div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {insightCards.map(({ label, value, icon: Icon, color, bg, change }) => (
          <div key={label} className="rounded-2xl border border-gray-100 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${bg}`}>
                <Icon size={16} className={color} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-lg font-bold text-gray-900">{value}</p>
              </div>
            </div>
            <p className={`mt-1 text-xs ${change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
              {change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Site Content */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-4 w-1 rounded-full bg-brand-navy" />
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Site Content
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          {contentCards.map(({ label, value, icon: Icon, href, desc }) => (
            <Link
              key={label}
              href={href}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:border-brand-navy/20 hover:shadow-lg hover:shadow-brand-navy/5"
            >
              <Icon size={18} className="text-brand-navy transition-transform group-hover:scale-110" />
              <p className="mt-3 text-xl font-bold text-gray-900">{value}</p>
              <p className="text-xs font-medium text-gray-900">{label}</p>
              <p className="mt-0.5 text-xs text-gray-400">{desc}</p>
              <ArrowRight size={12} className="absolute bottom-3 right-3 text-gray-300 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-1 rounded-full bg-purple-500" />
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Upcoming Appointments
            </p>
            <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-600">
              {upcomingAppointments.length}
            </span>
          </div>
          <Link
            href="/admin/leads"
            className="flex items-center gap-1 text-xs font-semibold text-brand-navy transition-colors hover:text-brand-navy/70"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          {upcomingAppointments.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12">
              <CalendarClock size={32} className="text-gray-300" />
              <p className="text-sm text-gray-400">No confirmed appointments yet</p>
              <p className="text-xs text-gray-300">Confirm one from the Leads page</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {upcomingAppointments.map((lead) => (
                <li
                  key={lead.id}
                  className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-xs font-semibold text-purple-600">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-500">
                        {lead.service} · {lead.area}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-gray-400" />
                    <span className="text-xs font-semibold text-purple-600">
                      {formatDate(lead.confirmedDate)}
                      {lead.confirmedTime && ` · ${lead.confirmedTime}`}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recent Leads */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-1 rounded-full bg-blue-500" />
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Recent Leads
            </p>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
              {recentLeads.length}
            </span>
          </div>
          <Link
            href="/admin/leads"
            className="flex items-center gap-1 text-xs font-semibold text-brand-navy transition-colors hover:text-brand-navy/70"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          {recentLeads.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12">
              <Users size={32} className="text-gray-300" />
              <p className="text-sm text-gray-400">No leads yet</p>
              <p className="text-xs text-gray-300">Leads will appear here once submitted</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {recentLeads.map((lead) => (
                <li
                  key={lead.id}
                  className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-500">
                        {lead.service} · {lead.area}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-100"
                  >
                    <Phone size={12} /> {lead.phone}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}