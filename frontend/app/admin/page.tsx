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
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Circle,
  AlertCircle,
  Activity,
  BarChart3,
  Zap,
  Target,
  Crown,
  Gem,
  Star,
  Award,
  Bell,
  MoreHorizontal,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { adminGetStats, adminGetLeads, DashboardStats, LeadItem } from "@/lib/api";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "new":
      return "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-700 border-blue-200";
    case "contacted":
      return "bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-700 border-amber-200";
    case "converted":
      return "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-700 border-emerald-200";
    case "lost":
      return "bg-gradient-to-r from-rose-500/20 to-rose-600/20 text-rose-700 border-rose-200";
    default:
      return "bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-700 border-gray-200";
  }
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-brand-navy/20 to-blue-500/20" />
          <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-brand-navy/10 to-blue-500/10 blur-xl" />
          <Loader2 size={48} className="animate-spin text-brand-navy" />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-gray-600">Loading your dashboard</p>
          <p className="text-xs text-gray-400">Preparing insights and analytics...</p>
        </div>
      </div>
    );
  }

  const cards = [
    { 
      label: "Total Leads", 
      value: stats.totalLeads, 
      icon: Users, 
      gradient: "from-blue-500 to-blue-600",
      bg: "bg-gradient-to-br from-blue-50 to-blue-100/50",
      textColor: "text-blue-600",
      trend: "+12.5%",
      trendUp: true,
      description: "All time leads",
    },
    { 
      label: "New Leads", 
      value: stats.newLeads, 
      icon: UserPlus, 
      gradient: "from-emerald-500 to-emerald-600",
      bg: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
      textColor: "text-emerald-600",
      trend: "+8.2%",
      trendUp: true,
      description: "This month",
    },
    { 
      label: "Appointments", 
      value: stats.upcomingAppointments, 
      icon: CalendarClock, 
      gradient: "from-violet-500 to-violet-600",
      bg: "bg-gradient-to-br from-violet-50 to-violet-100/50",
      textColor: "text-violet-600",
      trend: "+5.8%",
      trendUp: true,
      description: "Scheduled",
    },
    { 
      label: "Conversion Rate", 
      value: `${Math.round((stats.convertedLeads / stats.totalLeads) * 100)}%`, 
      icon: Target, 
      gradient: "from-amber-500 to-amber-600",
      bg: "bg-gradient-to-br from-amber-50 to-amber-100/50",
      textColor: "text-amber-600",
      trend: "+3.2%",
      trendUp: true,
      description: "Conversion rate",
    },
    { 
      label: "Today's Leads", 
      value: stats.leadsToday, 
      icon: CalendarCheck, 
      gradient: "from-rose-500 to-rose-600",
      bg: "bg-gradient-to-br from-rose-50 to-rose-100/50",
      textColor: "text-rose-600",
      trend: "+4",
      trendUp: true,
      description: "New today",
    },
  ];

  const contentCards = [
    { label: "Services", value: stats.counts.services, icon: Stethoscope, href: "/admin/services", color: "rose" },
    { label: "Packages", value: stats.counts.packages, icon: Package, href: "/admin/packages", color: "indigo" },
    { label: "Testimonials", value: stats.counts.testimonials, icon: MessageSquareQuote, href: "/admin/testimonials", color: "amber" },
    { label: "Team", value: stats.counts.team, icon: UsersRound, href: "/admin/team", color: "emerald" },
    { label: "Blog", value: stats.counts.blog, icon: Newspaper, href: "/admin/blog", color: "violet" },
  ];

  const colorMap = {
    rose: "bg-rose-50 text-rose-600 hover:bg-rose-100 border-rose-200/50",
    indigo: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-200/50",
    amber: "bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200/50",
    emerald: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200/50",
    violet: "bg-violet-50 text-violet-600 hover:bg-violet-100 border-violet-200/50",
  };

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-brand-navy/95 to-blue-900 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
        
        <div className="relative flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 p-2.5 backdrop-blur-sm">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="mt-1 text-sm text-white/60">
                  Welcome back! Here's your business performance overview.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
              <span className="text-xs font-medium text-white/80">Live</span>
            </div>
            <button className="rounded-full bg-white/10 p-2.5 backdrop-blur-sm transition-all hover:bg-white/20">
              <Bell size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Mini stats */}
        <div className="relative mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl bg-white/5 p-3 backdrop-blur-sm">
            <p className="text-xs text-white/50">Active Leads</p>
            <p className="text-lg font-bold text-white">{stats.totalLeads - stats.convertedLeads}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3 backdrop-blur-sm">
            <p className="text-xs text-white/50">Conversion Rate</p>
            <p className="text-lg font-bold text-white">{Math.round((stats.convertedLeads / stats.totalLeads) * 100)}%</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3 backdrop-blur-sm">
            <p className="text-xs text-white/50">Avg Response</p>
            <p className="text-lg font-bold text-white">2.4h</p>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-5">
        {cards.map(({ label, value, icon: Icon, bg, textColor, trend, trendUp, description }, index) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-2xl border border-gray-100/80 bg-white p-6 transition-all duration-500 hover:shadow-xl hover:shadow-gray-100/50 hover:-translate-y-1 hover:border-gray-200"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className="relative">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bg} transition-transform duration-300 group-hover:scale-110`}>
                <Icon size={20} className={textColor} />
              </div>
              
              <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">{value}</p>
              
              <div className="mt-1 flex items-center gap-2">
                <p className="text-sm font-medium text-gray-600">{label}</p>
                {trend && (
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {trendUp ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                    {trend}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">{description}</p>
            </div>

            {/* Decorative element */}
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-gray-50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        ))}
      </div>

      {/* Quick Access with Premium Design */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1.5 rounded-full bg-gradient-to-b from-brand-navy to-blue-600" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Quick Access</p>
              <p className="text-xs text-gray-400">Manage your content in one click</p>
            </div>
          </div>
          <button className="text-xs text-gray-400 hover:text-gray-600">View all →</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {contentCards.map(({ label, value, icon: Icon, href, color }) => (
            <Link
              key={label}
              href={href}
              className={`group relative overflow-hidden rounded-2xl border ${colorMap[color as keyof typeof colorMap]} bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl p-2.5 ${colorMap[color as keyof typeof colorMap].split(" ")[0]}`}>
                    <Icon size={18} className={colorMap[color as keyof typeof colorMap].split(" ")[1]} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <p className="text-xs font-medium text-gray-500">{label}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
              </div>
              
              {/* Progress bar decoration */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-current to-transparent transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>

      {/* Appointments & Recent Leads with Premium Design */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Appointments */}
        <div className="rounded-2xl border border-gray-100/80 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-gradient-to-b from-violet-500 to-violet-600" />
                <p className="text-sm font-semibold text-gray-700">Upcoming Appointments</p>
              </div>
              <p className="text-xs text-gray-400">Scheduled client meetings</p>
            </div>
            <Link href="/admin/leads" className="group flex items-center gap-1 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-600 transition-all hover:bg-violet-100">
              View all 
              <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingAppointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-12">
                <div className="rounded-full bg-violet-50 p-4">
                  <CalendarClock size={32} className="text-violet-400" />
                </div>
                <p className="mt-3 text-sm font-medium text-gray-600">No upcoming appointments</p>
                <p className="text-xs text-gray-400">Confirm appointments from leads page</p>
              </div>
            ) : (
              upcomingAppointments.map((lead, index) => (
                <div
                  key={lead.id}
                  className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50/30 p-4 transition-all duration-300 hover:border-violet-200 hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-500/20">
                        {getInitials(lead.name)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{lead.name}</p>
                        <p className="text-xs text-gray-400">
                          {lead.service} · {lead.area}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700">
                        <Clock size={12} />
                        {formatDate(lead.confirmedDate)}
                        {lead.confirmedTime && ` · ${lead.confirmedTime}`}
                      </span>
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-violet-500 to-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="rounded-2xl border border-gray-100/80 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600" />
                <p className="text-sm font-semibold text-gray-700">Recent Leads</p>
              </div>
              <p className="text-xs text-gray-400">Latest client inquiries</p>
            </div>
            <Link href="/admin/leads" className="group flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition-all hover:bg-blue-100">
              View all 
              <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentLeads.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-12">
                <div className="rounded-full bg-blue-50 p-4">
                  <Users size={32} className="text-blue-400" />
                </div>
                <p className="mt-3 text-sm font-medium text-gray-600">No leads yet</p>
                <p className="text-xs text-gray-400">Leads will appear here once received</p>
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50/30 p-4 transition-all duration-300 hover:border-blue-200 hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
                        {getInitials(lead.name)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{lead.name}</p>
                        <p className="text-xs text-gray-400">
                          {lead.service} · {lead.area}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full border px-3 py-1.5 text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status || "New"}
                      </span>
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition-all hover:bg-blue-100"
                      >
                        <Phone size={12} /> {lead.phone}
                      </a>
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Premium Footer Note */}
      <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 text-center">
        <p className="text-xs text-gray-400">
          <span className="font-medium text-gray-500">✨ Premium Dashboard</span> · Last updated {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}