"use client";

import { useEffect, useState } from "react";
import { Loader2, Phone, Trash2 } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { adminGetLeads, adminUpdateLeadStatus, adminDeleteLead, LeadItem } from "@/lib/api";

const STATUS_OPTIONS = ["new", "contacted", "converted", "closed"];

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-50 text-blue-600",
  contacted: "bg-amber-50 text-amber-600",
  converted: "bg-green-50 text-green-600",
  closed: "bg-gray-100 text-gray-500",
};

export default function AdminLeadsPage() {
  const { token } = useAdminAuth();
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

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
            Everyone who submitted the booking form or contact form.
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

      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-100 bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-sm text-gray-400">
            <Loader2 size={16} className="animate-spin" /> Loading...
          </div>
        ) : visible.length === 0 ? (
          <p className="py-14 text-center text-sm text-gray-400">No leads here yet.</p>
        ) : (
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Area</th>
                <th className="px-5 py-3 font-medium">Received</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {visible.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/60">
                  <td className="px-5 py-3 font-medium text-gray-800">{lead.name}</td>
                  <td className="px-5 py-3">
                    <a
                      href={`tel:${lead.phone}`}
                      className="flex items-center gap-1.5 text-brand-navy hover:underline"
                    >
                      <Phone size={12} /> {lead.phone}
                    </a>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{lead.service}</td>
                  <td className="px-5 py-3 text-gray-600">{lead.area}</td>
                  <td className="px-5 py-3 text-xs text-gray-400">
                    {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold outline-none ${
                        STATUS_STYLES[lead.status] ?? "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s[0].toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => remove(lead.id)}
                      className="rounded-md p-1.5 text-gray-300 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
