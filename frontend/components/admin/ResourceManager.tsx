"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Eye, EyeOff, Upload, ImageOff } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { adminListAll, adminCreate, adminUpdate, adminRemove, adminUploadImage, resolveImageUrl } from "@/lib/api";
import { ICON_NAMES } from "@/lib/icons";

export type FieldType = "text" | "textarea" | "number" | "checkbox" | "select" | "tags" | "icon" | "image";

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

  // If this resource has an "image" field, use it to show a thumbnail on each card.
  const imageField = fields.find((f) => f.type === "image")?.name;

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

      <div className="mt-5">
        {loading ? (
          <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white py-14 text-sm text-gray-400">
            <Loader2 size={16} className="animate-spin" /> Loading...
          </div>
        ) : items.length === 0 ? (
          <p className="rounded-xl border border-gray-100 bg-white py-14 text-center text-sm text-gray-400">
            Nothing here yet — click "Add new" to create the first one.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
              >
                {imageField && (
                  <div className="flex h-36 w-full items-center justify-center overflow-hidden bg-gray-50">
                    {item[imageField] ? (
                      <img
                        src={resolveImageUrl(item[imageField])}
                        alt={item[titleField] || "Image"}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <ImageOff size={22} className="text-gray-300" />
                    )}
                  </div>
                )}

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {item[titleField]}
                    </p>
                    {subtitleField && (
                      <p className="mt-0.5 line-clamp-2 text-xs text-gray-400">
                        {item[subtitleField]}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-end gap-1.5 border-t border-gray-50 pt-3">
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
                </div>
              </div>
            ))}
          </div>
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
                  token={token}
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
  token,
}: {
  field: FieldConfig;
  value: any;
  onChange: (v: any) => void;
  token: string | null;
}) {
  const baseClass =
    "mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy";

  if (field.type === "image") {
    return <ImageFieldInput field={field} value={value} onChange={onChange} token={token} />;
  }

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

function ImageFieldInput({
  field,
  value,
  onChange,
  token,
}: {
  field: FieldConfig;
  value: any;
  onChange: (v: any) => void;
  token: string | null;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const displayValue = typeof value === "string" ? value : "";

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploading(true);
    setError(null);
    try {
      const { url } = await adminUploadImage(file, token);
      onChange(url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="text-xs font-medium text-gray-600">{field.label}</label>

      <div className="mt-1.5 flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {displayValue ? (
            // Preview only — not a Next <Image>, since this can point at
            // localhost:4000/uploads or an external URL either way.
            <img
              src={resolveImageUrl(displayValue)}
              alt="Preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <ImageOff size={18} className="text-gray-300" />
          )}
        </div>

        <div className="flex-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60"
          >
            {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            {uploading ? "Uploading..." : displayValue ? "Replace image" : "Upload image"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}

      {/* Fallback / manual override — paste a URL directly if you'd rather not upload */}
      <input
        type="text"
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder ?? "Or paste an image URL"}
        className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 outline-none focus:border-brand-navy"
      />
      {field.helperText && <p className="mt-1 text-[11px] text-gray-400">{field.helperText}</p>}
    </div>
  );
}
