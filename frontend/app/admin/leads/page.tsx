"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Loader2,
  Phone,
  Trash2,
  CalendarCheck,
  CalendarClock,
  Pencil,
  X,
  Bot,
  Eye,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Stethoscope,
  MessageCircle,
  ExternalLink,
  Users,
  ShieldCheck,
  AlertCircle,
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useAdminToast } from "@/context/AdminToastContext";
import {
  adminGetLeads,
  adminUpdateLeadStatus,
  adminConfirmAppointment,
  adminDeleteLead,
  LeadItem,
} from "@/lib/api";

const STATUS_OPTIONS = ["new", "contacted", "confirmed", "converted", "closed"];

const STATUS_STYLES: Record<string, { badge: string; text: string }> = {
  new: { badge: "bg-blue-50 text-blue-700 border-blue-200", text: "New Lead" },
  contacted: { badge: "bg-amber-50 text-amber-700 border-amber-200", text: "Contacted" },
  confirmed: { badge: "bg-purple-50 text-purple-700 border-purple-200", text: "Confirmed" },
  converted: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", text: "Converted" },
  closed: { badge: "bg-gray-100 text-gray-600 border-gray-200", text: "Closed" },
};

const AREAS_LIST = [
  "Raj Nagar (RDC)",
  "Raj Nagar Extension",
  "Govindpuram",
  "Indirapuram",
  "Vaishali",
  "Raj Nagar",
  "Other Ghaziabad",
];

function formatDate(dateStr: string) {
  if (!dateStr) return "Not specified";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(timeStr: string) {
  if (!timeStr) return "";
  const match = /^(\d{1,2}):(\d{2})$/.exec(timeStr);
  if (!match) return timeStr;
  const hour = parseInt(match[1], 10);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${match[2]} ${period}`;
}

export default function AdminLeadsPage() {
  const { token } = useAdminAuth();
  const { showSuccess, showError, showInfo } = useAdminToast();
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Selected lead for detail modal
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  // Inline appointment editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDate, setConfirmDate] = useState("");
  const [confirmTime, setConfirmTime] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    if (!token) return;
    setLoading(true);
    try {
      const rows = await adminGetLeads(token);
      setLeads(rows);
    } catch (err: any) {
      setError(err.message || "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Extract unique services from leads for service filter dropdown
  const uniqueServices = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => {
      if (l.service) set.add(l.service);
    });
    return Array.from(set);
  }, [leads]);

  async function updateStatus(id: string, status: string) {
    if (!token) return;
    const targetLead = leads.find((l) => l.id === id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status } : null));
    }
    try {
      await adminUpdateLeadStatus(id, status, token);
      showSuccess(
        "Lead Status Updated!",
        `${targetLead?.name || "Lead"} status is now "${status.toUpperCase()}".`
      );
    } catch {
      showError("Status Update Failed", "Could not update lead status.");
      load();
    }
  }

  function openAppointmentEditor(lead: LeadItem) {
    setEditingId(lead.id);
    setConfirmDate(lead.confirmedDate || lead.preferredDate || "");
    setConfirmTime(lead.confirmedTime || "");
  }

  async function saveAppointment(id: string) {
    if (!token || !confirmDate) return;
    setSaving(true);
    try {
      const updated = await adminConfirmAppointment(
        id,
        { confirmedDate: confirmDate, confirmedTime: confirmTime },
        token
      );
      setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(updated);
      }
      setEditingId(null);
      showSuccess(
        "Appointment Confirmed!",
        `Appointment scheduled for ${formatDate(confirmDate)}${
          confirmTime ? ` at ${formatTime(confirmTime)}` : ""
        }.`
      );
    } catch (err: any) {
      showError(
        "Failed to Confirm Appointment",
        err.message || "Please check connection and try again."
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await adminDeleteLead(id, token);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
      showInfo("Lead Deleted", "The lead record has been removed successfully.");
    } catch (err: any) {
      showError("Delete Failed", err.message || "Could not delete lead.");
    }
  }

  // Filter & Search calculation
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        const matchesStatus =
          statusFilter === "all" || lead.status === statusFilter;
        const matchesArea =
          areaFilter === "all" ||
          lead.area.toLowerCase() === areaFilter.toLowerCase();
        const matchesSource =
          sourceFilter === "all" || lead.source === sourceFilter;
        const matchesService =
          serviceFilter === "all" ||
          lead.service.toLowerCase() === serviceFilter.toLowerCase();

        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          lead.name.toLowerCase().includes(query) ||
          lead.phone.includes(query) ||
          lead.service.toLowerCase().includes(query) ||
          lead.area.toLowerCase().includes(query);

        return (
          matchesStatus &&
          matchesArea &&
          matchesSource &&
          matchesService &&
          matchesSearch
        );
      })
      .sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
      });
  }, [
    leads,
    statusFilter,
    areaFilter,
    sourceFilter,
    serviceFilter,
    searchQuery,
    sortOrder,
  ]);

  // Reset to page 1 whenever any filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, areaFilter, sourceFilter, serviceFilter, searchQuery, pageSize]);

  // Pagination Calculations
  const totalItems = filteredLeads.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  // Check if any filter is actively applied
  const isFiltered =
    statusFilter !== "all" ||
    areaFilter !== "all" ||
    sourceFilter !== "all" ||
    serviceFilter !== "all" ||
    searchQuery.trim() !== "";

  const clearAllFilters = () => {
    setStatusFilter("all");
    setAreaFilter("all");
    setSourceFilter("all");
    setServiceFilter("all");
    setSearchQuery("");
  };

  // Metrics
  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const confirmedCount = leads.filter((l) => l.status === "confirmed").length;
  const convertedCount = leads.filter((l) => l.status === "converted").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">
            Leads & Bookings Management
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            View patient enquiries, filter by service/area/status, and schedule appointments.
          </p>
        </div>

        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 sm:self-auto"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : "↻ Refresh"}
        </button>
      </div>

      {/* Metrics Counter Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div
          onClick={() => setStatusFilter("all")}
          className={`cursor-pointer rounded-2xl border p-4 shadow-sm transition hover:shadow-md ${
            statusFilter === "all"
              ? "border-brand-navy bg-brand-navy/5"
              : "border-gray-100 bg-white"
          }`}
        >
          <p className="text-xs font-semibold text-gray-400">Total Enquiries</p>
          <p className="mt-1 text-2xl font-bold text-brand-navy">{totalCount}</p>
        </div>

        <div
          onClick={() => setStatusFilter("new")}
          className={`cursor-pointer rounded-2xl border p-4 shadow-sm transition hover:shadow-md ${
            statusFilter === "new"
              ? "border-blue-400 bg-blue-50/80 ring-2 ring-blue-300"
              : "border-blue-100 bg-blue-50/40"
          }`}
        >
          <p className="text-xs font-semibold text-blue-600">New Leads</p>
          <p className="mt-1 text-2xl font-bold text-blue-700">{newCount}</p>
        </div>

        <div
          onClick={() => setStatusFilter("confirmed")}
          className={`cursor-pointer rounded-2xl border p-4 shadow-sm transition hover:shadow-md ${
            statusFilter === "confirmed"
              ? "border-purple-400 bg-purple-50/80 ring-2 ring-purple-300"
              : "border-purple-100 bg-purple-50/40"
          }`}
        >
          <p className="text-xs font-semibold text-purple-600">Confirmed</p>
          <p className="mt-1 text-2xl font-bold text-purple-700">
            {confirmedCount}
          </p>
        </div>

        <div
          onClick={() => setStatusFilter("converted")}
          className={`cursor-pointer rounded-2xl border p-4 shadow-sm transition hover:shadow-md ${
            statusFilter === "converted"
              ? "border-emerald-400 bg-emerald-50/80 ring-2 ring-emerald-300"
              : "border-emerald-100 bg-emerald-50/40"
          }`}
        >
          <p className="text-xs font-semibold text-emerald-600">Converted</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">
            {convertedCount}
          </p>
        </div>
      </div>

      {/* Advanced Filter Toolbar */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
        {/* Row 1: Search input + Sort Order */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient name, phone number, service, or area..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-xs font-medium outline-none transition focus:border-brand-navy focus:bg-white focus:ring-2 focus:ring-brand-navy/10 sm:text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
              }
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-100"
              title="Toggle Sort Order"
            >
              <ArrowUpDown size={13} />
              {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            </button>

            {isFiltered && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
              >
                <RotateCcw size={13} /> Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Specific Dropdown Filters */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {/* Status Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-2.5 py-2 text-xs font-bold text-gray-700 outline-none transition focus:border-brand-navy"
            >
              <option value="all">All Statuses ({leads.length})</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s[0].toUpperCase() + s.slice(1)} (
                  {leads.filter((l) => l.status === s).length})
                </option>
              ))}
            </select>
          </div>

          {/* Service Area Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Location / Area
            </label>
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-2.5 py-2 text-xs font-bold text-gray-700 outline-none transition focus:border-brand-navy"
            >
              <option value="all">All Locations</option>
              {AREAS_LIST.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Service Requested Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Service
            </label>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-2.5 py-2 text-xs font-bold text-gray-700 outline-none transition focus:border-brand-navy"
            >
              <option value="all">All Services</option>
              {uniqueServices.map((srv) => (
                <option key={srv} value={srv}>
                  {srv}
                </option>
              ))}
            </select>
          </div>

          {/* Source Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Enquiry Source
            </label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-2.5 py-2 text-xs font-bold text-gray-700 outline-none transition focus:border-brand-navy"
            >
              <option value="all">All Sources</option>
              <option value="website">Website Booking Form</option>
              <option value="chatbot">AI Chatbot</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-600 border border-red-100">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Leads List Container */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Results Summary Bar */}
        <div className="flex flex-col justify-between gap-2 border-b border-gray-100 bg-gray-50/50 px-5 py-3 sm:flex-row sm:items-center">
          <p className="text-xs font-bold text-gray-600">
            Showing{" "}
            <span className="text-brand-navy font-extrabold">
              {totalItems === 0 ? 0 : startIndex + 1} - {endIndex}
            </span>{" "}
            of <span className="text-brand-navy font-extrabold">{totalItems}</span>{" "}
            leads
            {isFiltered && " (Filtered)"}
          </p>

          {/* Page size selector */}
          <div className="flex items-center gap-2 self-start text-xs font-medium text-gray-500 sm:self-auto">
            <span>Show per page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-bold text-gray-700 outline-none"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-sm text-gray-400">
            <Loader2 size={24} className="animate-spin text-brand-navy" />
            Loading leads...
          </div>
        ) : totalItems === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">
            No leads found matching your criteria.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {currentLeads.map((lead) => {
              const isEditing = editingId === lead.id;
              const hasConfirmed = !!lead.confirmedDate;
              const hasRequested = !!lead.preferredDate;
              const statusStyle =
                STATUS_STYLES[lead.status] || STATUS_STYLES.new;

              return (
                <div
                  key={lead.id}
                  className="group relative p-5 transition hover:bg-gray-50/70"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    {/* Customer overview */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-bold text-gray-900">
                          {lead.name}
                        </span>

                        {lead.source === "chatbot" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
                            <Bot size={11} /> Chatbot
                          </span>
                        )}

                        {/* Status badge & selector */}
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(lead.id, e.target.value)
                          }
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-bold outline-none cursor-pointer ${statusStyle.badge}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              ● {s[0].toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Contact metadata */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                        {/* Phone with call & WhatsApp */}
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${lead.phone}`}
                            className="inline-flex items-center gap-1 font-bold text-brand-navy hover:underline"
                          >
                            <Phone size={12} className="text-brand-green" />
                            {lead.phone}
                          </a>
                          <a
                            href={`https://wa.me/91${lead.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-green-700 hover:bg-green-100"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle size={10} /> WhatsApp
                          </a>
                        </div>

                        {/* Service tag */}
                        <span className="inline-flex items-center gap-1 font-medium text-brand-navy">
                          <Stethoscope size={12} className="text-brand-green" />
                          {lead.service}
                        </span>

                        {/* Area tag */}
                        <span className="inline-flex items-center gap-1 text-gray-500">
                          <MapPin size={12} className="text-brand-green" />
                          {lead.area}
                        </span>

                        {/* Received date */}
                        <span className="text-gray-400">
                          Received: {formatDate(lead.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 self-start md:self-auto">
                      {/* View Details Modal Button */}
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-brand-navy/20 bg-brand-navy/5 px-3 py-1.5 text-xs font-bold text-brand-navy transition hover:bg-brand-navy hover:text-white"
                        title="View Full Booking Details"
                      >
                        <Eye size={13} />
                        View Details
                      </button>

                      {/* Delete Lead Button */}
                      <button
                        onClick={() => remove(lead.id)}
                        className="rounded-xl border border-gray-200 p-2 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        title="Delete Lead"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Appointment info bar */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-gray-50/80 px-3.5 py-2.5 border border-gray-100">
                    {hasConfirmed ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-purple-700">
                        <CalendarCheck size={14} className="text-purple-600" />
                        Confirmed Appointment: {formatDate(lead.confirmedDate)}
                        {lead.confirmedTime &&
                          ` at ${formatTime(lead.confirmedTime)}`}
                      </span>
                    ) : hasRequested ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                        <CalendarClock size={14} className="text-amber-600" />
                        Customer Requested Slot:{" "}
                        <span className="font-bold text-gray-800">
                          {formatDate(lead.preferredDate)}
                        </span>
                        {lead.preferredTime && ` · ${lead.preferredTime}`}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">
                        No specific appointment slot requested
                      </span>
                    )}

                    {!isEditing && (
                      <button
                        onClick={() => openAppointmentEditor(lead)}
                        className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-bold text-brand-navy shadow-sm transition hover:bg-brand-navy hover:text-white"
                      >
                        <Pencil size={11} />
                        {hasConfirmed
                          ? "Edit Appointment"
                          : "Confirm Appointment"}
                      </button>
                    )}
                  </div>

                  {/* Inline Appointment confirmation editor */}
                  {isEditing && (
                    <div className="mt-2 flex flex-wrap items-end gap-3 rounded-2xl border border-brand-navy/20 bg-brand-sky/20 p-4">
                      <div>
                        <label className="text-[11px] font-bold text-brand-navy uppercase tracking-wider">
                          Schedule Date
                        </label>
                        <input
                          type="date"
                          value={confirmDate}
                          onChange={(e) => setConfirmDate(e.target.value)}
                          className="mt-1 block rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium outline-none focus:border-brand-navy"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-brand-navy uppercase tracking-wider">
                          Schedule Time
                        </label>
                        <input
                          type="time"
                          value={confirmTime}
                          onChange={(e) => setConfirmTime(e.target.value)}
                          className="mt-1 block rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium outline-none focus:border-brand-navy"
                        />
                      </div>
                      <button
                        onClick={() => saveAppointment(lead.id)}
                        disabled={saving || !confirmDate}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-navy px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-brand-navyDark disabled:opacity-60"
                      >
                        {saving ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <CalendarCheck size={13} />
                        )}
                        Save & Confirm
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
                      >
                        <X size={13} />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* PAGINATION FOOTER */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 bg-white px-5 py-4 sm:flex-row">
            <p className="text-xs font-medium text-gray-500">
              Page <span className="font-bold text-brand-navy">{currentPage}</span> of{" "}
              <span className="font-bold text-brand-navy">{totalPages}</span>
            </p>

            <div className="flex items-center gap-1.5">
              {/* First Page */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
                title="First Page"
              >
                <ChevronsLeft size={14} />
              </button>

              {/* Prev Page */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
                title="Previous Page"
              >
                <ChevronLeft size={14} />
              </button>

              {/* Numbered Page Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  // Show pages within 2 steps from current page, plus first and last
                  return (
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - currentPage) <= 1
                  );
                })
                .map((pageNumber, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev && pageNumber - prev > 1;

                  return (
                    <div key={pageNumber} className="flex items-center">
                      {showEllipsis && (
                        <span className="px-1 text-xs text-gray-400">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg px-2 text-xs font-bold transition ${
                          currentPage === pageNumber
                            ? "bg-brand-navy text-white shadow-sm"
                            : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    </div>
                  );
                })}

              {/* Next Page */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
                title="Next Page"
              >
                <ChevronRight size={14} />
              </button>

              {/* Last Page */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
                title="Last Page"
              >
                <ChevronsRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FULL DETAILS MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 shadow-2xl animate-fade-up sm:p-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-sky/40 px-2.5 py-0.5 text-[11px] font-bold text-brand-navy">
                  Lead ID: #{selectedLead.id.slice(-6).toUpperCase()}
                </span>
                <h3 className="mt-1 text-xl font-bold text-brand-navy">
                  {selectedLead.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-full bg-gray-100 p-2 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body: Complete Lead & Booking Specs */}
            <div className="mt-5 space-y-4 text-sm">
              {/* Status Selector */}
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-3.5 border border-gray-100">
                <span className="font-semibold text-gray-600">Lead Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) =>
                    updateStatus(selectedLead.id, e.target.value)
                  }
                  className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-brand-navy outline-none shadow-sm cursor-pointer"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s[0].toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Contact Details Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Customer Contact Details
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-gray-500">Phone Number:</span>
                    <p className="font-bold text-gray-900 mt-0.5">
                      {selectedLead.phone}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Service Area:</span>
                    <p className="font-bold text-gray-900 mt-0.5">
                      {selectedLead.area}
                    </p>
                  </div>
                </div>

                {/* Quick Call & WhatsApp Action Buttons */}
                <div className="flex gap-2 pt-1">
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-navy py-2 text-xs font-bold text-white shadow-sm transition hover:bg-brand-navyDark"
                  >
                    <Phone size={14} /> Call Now
                  </a>
                  <a
                    href={`https://wa.me/91${selectedLead.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-green-600 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-green-700"
                  >
                    <MessageCircle size={14} /> WhatsApp Chat
                  </a>
                </div>
              </div>

              {/* Service & Booking Details Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Service & Booking Request
                </p>

                <div>
                  <span className="text-xs text-gray-500">Requested Service:</span>
                  <p className="text-sm font-bold text-brand-navy">
                    {selectedLead.service}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-2.5">
                  <div>
                    <span className="text-xs text-gray-500">Preferred Date:</span>
                    <p className="font-medium text-gray-800">
                      {formatDate(selectedLead.preferredDate)}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Preferred Slot:</span>
                    <p className="font-medium text-gray-800">
                      {selectedLead.preferredTime || "Anytime"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Appointment Status */}
              <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  Confirmed Appointment Status
                </p>

                {selectedLead.confirmedDate ? (
                  <div className="flex items-center gap-2 text-purple-900 font-bold">
                    <CheckCircle2 size={16} className="text-purple-600" />
                    <span>
                      {formatDate(selectedLead.confirmedDate)}
                      {selectedLead.confirmedTime &&
                        ` at ${formatTime(selectedLead.confirmedTime)}`}
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">
                    No confirmed appointment scheduled yet.
                  </p>
                )}
              </div>

              {/* Submission Metadata */}
              <div className="flex items-center justify-between text-xs text-gray-400 px-1 pt-1">
                <span>
                  Source:{" "}
                  <strong className="text-gray-600">
                    {selectedLead.source === "chatbot"
                      ? "AI Chatbot"
                      : "Website Booking Form"}
                  </strong>
                </span>
                <span>
                  Submitted: {formatDate(selectedLead.createdAt)}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-4">
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-xl bg-gray-100 px-5 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
