"use client";

import { useEffect, useState } from "react";
import { Loader2, Phone, Trash2, CalendarCheck, CalendarClock, Pencil, X, Bot } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  adminGetLeads,
  adminUpdateLeadStatus,
  adminConfirmAppointment,
  adminDeleteLead,
  LeadItem,
} from "@/lib/api";

const STATUS_OPTIONS = ["new", "contacted", "confirmed", "converted", "closed"];

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-50 text-blue-600",
  contacted: "bg-amber-50 text-amber-600",
  confirmed: "bg-purple-50 text-purple-600",
  converted: "bg-green-50 text-green-600",
  closed: "bg-gray-100 text-gray-500",
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function formatTime(timeStr: string) {
  if (!timeStr) return "";
  // "HH:MM" (24h, from <input type="time">) -> "h:MM AM/PM"
  const match = /^(\d{1,2}):(\d{2})$/.exec(timeStr);
  if (!match) return timeStr; // already a slot label like "Morning (9 AM - 12 PM)"
  const hour = parseInt(match[1], 10);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${match[2]} ${period}`;
}

export default function AdminLeadsPage() {
  const { token } = useAdminAuth();
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
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

  async function updateStatus(id: string, status: string) {
    if (!token) return;
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      await adminUpdateLeadStatus(id, status, token);
    } catch {
      load(); // revert to server state on failure
    }
  }

  function openAppointmentEditor(lead: LeadItem) {
    setEditingId(lead.id);
    // Pre-fill with existing confirmed values, or fall back to what the customer requested.
    setConfirmDate(lead.confirmedDate || lead.preferredDate || "");
    setConfirmTime(lead.confirmedTime || "");
  }

  async function saveAppointment(id: string) {
    if (!token || !confirmDate) return;
    setSaving(true);
    try {
      const updated = await adminConfirmAppointment(id, { confirmedDate: confirmDate, confirmedTime: confirmTime }, token);
      setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
      setEditingId(null);
    } catch (err: any) {
      setError(err.message || "Failed to confirm appointment");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!token) return;
    if (!confirm("Delete this lead?")) return;
    try {
      await adminDeleteLead(id, token);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete");
    }
  }

  const visible = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-brand-navy">Leads</h1>
          <p className="text-xs text-gray-400">
            Everyone who submitted the booking form or contact form — confirm an appointment date/time here.
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 outline-none focus:border-brand-navy"
        >
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s[0].toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div>
      )}

      <div className="mt-5 overflow-hidden rounded-xl border border-gray-100 bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-sm text-gray-400">
            <Loader2 size={16} className="animate-spin" /> Loading...
          </div>
        ) : visible.length === 0 ? (
          <p className="py-14 text-center text-sm text-gray-400">No leads here yet.</p>
        ) : (
          <ul className="divide-y divide-gray-50">
            {visible.map((lead) => {
              const isEditing = editingId === lead.id;
              const hasConfirmed = !!lead.confirmedDate;
              const hasRequested = !!lead.preferredDate;

              return (
                <li key={lead.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800">{lead.name}</p>
                        {lead.source === "chatbot" && (
                          <span
                            title="Came from the website chatbot"
                            className="flex items-center gap-1 rounded-full bg-brand-sky/40 px-2 py-0.5 text-[10px] font-semibold text-brand-navy"
                          >
                            <Bot size={10} /> Chatbot
                          </span>
                        )}
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value)}
                          className={`rounded-full border-0 px-2.5 py-0.5 text-xs font-semibold outline-none ${
                            STATUS_STYLES[lead.status] ?? "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s[0].toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-brand-navy hover:underline">
                          <Phone size={11} /> {lead.phone}
                        </a>
                        <span>{lead.service}</span>
                        <span>{lead.area}</span>
                        <span className="text-gray-400">
                          Received {formatDate(lead.createdAt)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => remove(lead.id)}
                      className="rounded-md p-1.5 text-gray-300 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Appointment info + confirm control */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-gray-50 px-3 py-2.5">
                    {hasConfirmed ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-brand-green">
                        <CalendarCheck size={13} />
                        Confirmed: {formatDate(lead.confirmedDate)}
                        {lead.confirmedTime && ` at ${formatTime(lead.confirmedTime)}`}
                      </span>
                    ) : hasRequested ? (
                      <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <CalendarClock size={13} />
                        Requested: {formatDate(lead.preferredDate)}
                        {lead.preferredTime && ` · ${lead.preferredTime}`}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">No appointment requested</span>
                    )}

                    {!isEditing && (
                      <button
                        onClick={() => openAppointmentEditor(lead)}
                        className="ml-auto flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-brand-navy hover:bg-brand-navy/5"
                      >
                        <Pencil size={11} />
                        {hasConfirmed ? "Edit appointment" : "Confirm appointment"}
                      </button>
                    )}
                  </div>

                  {isEditing && (
                    <div className="mt-2 flex flex-wrap items-end gap-2 rounded-lg border border-brand-navy/10 bg-brand-sky/10 p-3">
                      <div>
                        <label className="text-[11px] font-medium text-gray-500">Date</label>
                        <input
                          type="date"
                          value={confirmDate}
                          onChange={(e) => setConfirmDate(e.target.value)}
                          className="mt-0.5 block rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs outline-none focus:border-brand-navy"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-gray-500">Time</label>
                        <input
                          type="time"
                          value={confirmTime}
                          onChange={(e) => setConfirmTime(e.target.value)}
                          className="mt-0.5 block rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs outline-none focus:border-brand-navy"
                        />
                      </div>
                      <button
                        onClick={() => saveAppointment(lead.id)}
                        disabled={saving || !confirmDate}
                        className="flex items-center gap-1 rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                      >
                        {saving ? <Loader2 size={12} className="animate-spin" /> : <CalendarCheck size={12} />}
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-500"
                      >
                        <X size={12} />
                        Cancel
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
