"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Eye, EyeOff } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { adminListAll, adminCreate, adminUpdate, adminRemove } from "@/lib/api";
import { ICON_NAMES } from "@/lib/icons";

export type FieldType = "text" | "textarea" | "number" | "checkbox" | "select" | "tags" | "icon";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  placeholder?: string;
  helperText?: string;
};

type Props = {
  resource: string; // API path segment, e.g. "services"
  title: string;
  description: string;
  fields: FieldConfig[];
  titleField: string; // which field to show as the row's main heading
  subtitleField?: string; // secondary field shown under the heading
};

function defaultValueFor(field: FieldConfig) {
  if (field.type === "checkbox") return field.name === "published" ? true : false;
  if (field.type === "number") return 0;
  if (field.type === "tags") return [];
  return "";
}

export default function ResourceManager({
  resource,
  title,
  description,
  fields,
  titleField,
  subtitleField,
}: Props) {
  const { token } = useAdminAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  async function load() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const rows = await adminListAll(resource, token);
      setItems(rows);
    } catch (err: any) {
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, resource]);

  function openCreateForm() {
    const initial: Record<string, any> = {};
    fields.forEach((f) => (initial[f.name] = defaultValueFor(f)));
    setFormValues(initial);
    setEditingId(null);
    setFormOpen(true);
  }

  function openEditForm(item: any) {
    const initial: Record<string, any> = {};
    fields.forEach((f) => {
      initial[f.name] = item[f.name] ?? defaultValueFor(f);
    });
    setFormValues(initial);
    setEditingId(item.id);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
  }

  async function handleSave() {
    if (!token) return;
    setSaving(true);
    setError(null);
    try {
      const payload = { ...formValues };
      // tags fields: split comma-separated text into arrays if the field is still a raw string
      fields
        .filter((f) => f.type === "tags")
        .forEach((f) => {
          if (typeof payload[f.name] === "string") {
            payload[f.name] = payload[f.name]
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean);
          }
        });

      if (editingId) {
        await adminUpdate(resource, editingId, token, payload);
      } else {
        await adminCreate(resource, token, payload);
      }
      closeForm();
      await load();
    } catch (err: any) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!token) return;
    if (!confirm("Delete this item? This can't be undone.")) return;
    try {
      await adminRemove(resource, id, token);
      await load();
    } catch (err: any) {
      setError(err.message || "Failed to delete");
    }
  }

  async function togglePublished(item: any) {
    if (!token) return;
    try {
      await adminUpdate(resource, item.id, token, { published: !item.published });
      await load();
    } catch (err: any) {
      setError(err.message || "Failed to update");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-brand-navy">{title}</h1>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
        <button
          onClick={openCreateForm}
          className="flex items-center gap-1.5 rounded-lg bg-brand-navy px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
        >
          <Plus size={14} /> Add new
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div>
      )}

      <div className="mt-5 overflow-hidden rounded-xl border border-gray-100 bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-sm text-gray-400">
            <Loader2 size={16} className="animate-spin" /> Loading...
          </div>
        ) : items.length === 0 ? (
          <p className="py-14 text-center text-sm text-gray-400">
            Nothing here yet — click "Add new" to create the first one.
          </p>
        ) : (
          <ul className="divide-y divide-gray-50">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-gray-50/60"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {item[titleField]}
                  </p>
                  {subtitleField && (
                    <p className="truncate text-xs text-gray-400">{item[subtitleField]}</p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  {"published" in item && (
                    <button
                      onClick={() => togglePublished(item)}
                      title={item.published ? "Published — click to hide" : "Hidden — click to publish"}
                      className={`rounded-md p-1.5 ${
                        item.published
                          ? "text-brand-green hover:bg-brand-green/10"
                          : "text-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {item.published ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                  )}
                  <button
                    onClick={() => openEditForm(item)}
                    className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-brand-navy"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-brand-navy">
                {editingId ? `Edit ${title.replace(/s$/, "")}` : `Add ${title.replace(/s$/, "")}`}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3.5">
              {fields.map((field) => (
                <FieldInput
                  key={field.name}
                  field={field}
                  value={formValues[field.name]}
                  onChange={(v) => setFormValues((prev) => ({ ...prev, [field.name]: v }))}
                />
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={closeForm}
                className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-lg bg-brand-navy px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
              >
                {saving && <Loader2 size={13} className="animate-spin" />}
                {editingId ? "Save changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: any;
  onChange: (v: any) => void;
}) {
  const baseClass =
    "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy";

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        {field.label}
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        <label className="text-xs font-medium text-gray-600">{field.label}</label>
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          placeholder={field.placeholder}
          rows={field.name === "content" ? 8 : 3}
          className={baseClass}
        />
        {field.helperText && <p className="mt-1 text-[11px] text-gray-400">{field.helperText}</p>}
      </div>
    );
  }

  if (field.type === "select" || field.type === "icon") {
    const options = field.type === "icon" ? ICON_NAMES : field.options ?? [];
    return (
      <div>
        <label className="text-xs font-medium text-gray-600">{field.label}</label>
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        >
          <option value="" disabled>
            Select...
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "tags") {
    const display = Array.isArray(value) ? value.join(", ") : value ?? "";
    return (
      <div>
        <label className="text-xs font-medium text-gray-600">{field.label}</label>
        <input
          type="text"
          value={display}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder ?? "Comma-separated, e.g. Fast, Reliable, 24/7"}
          className={baseClass}
        />
        <p className="mt-1 text-[11px] text-gray-400">Separate items with commas</p>
      </div>
    );
  }

  return (
    <div>
      <label className="text-xs font-medium text-gray-600">{field.label}</label>
      <input
        type={field.type === "number" ? "number" : "text"}
        value={value ?? ""}
        onChange={(e) =>
          onChange(field.type === "number" ? Number(e.target.value) : e.target.value)
        }
        required={field.required}
        placeholder={field.placeholder}
        className={baseClass}
      />
      {field.helperText && <p className="mt-1 text-[11px] text-gray-400">{field.helperText}</p>}
    </div>
  );
}
