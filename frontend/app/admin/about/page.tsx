"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Save, Upload, ImageOff } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { adminGetAbout, adminUpdateAbout, adminUploadImage, resolveImageUrl, AboutContentItem } from "@/lib/api";

const FIELDS: { name: keyof AboutContentItem; label: string; type: "text" | "textarea"; helperText?: string }[] = [
  { name: "heroTitle", label: "Hero title", type: "text" },
  { name: "heroSubtitle", label: "Hero subtitle", type: "textarea" },
  { name: "storyParagraph1", label: "Our story — paragraph 1", type: "textarea" },
  { name: "storyParagraph2", label: "Our story — paragraph 2", type: "textarea" },
  { name: "founderName", label: "Founder name", type: "text" },
  { name: "founderRole", label: "Founder role", type: "text" },
  { name: "founderQuote", label: "Founder quote", type: "textarea", helperText: "Shown as a quote card next to the story photo" },
  { name: "missionText", label: "Mission statement", type: "textarea" },
  { name: "visionText", label: "Vision statement", type: "textarea" },
];

export default function AdminAboutPage() {
  const { token } = useAdminAuth();
  const [values, setValues] = useState<AboutContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!token) return;
    adminGetAbout(token)
      .then(setValues)
      .catch((err) => setError(err.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleSave() {
    if (!token || !values) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const updated = await adminUpdateAbout(token, values);
      setValues(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !token || !values) return;
    setUploading(true);
    setError(null);
    try {
      const { url } = await adminUploadImage(file, token);
      setValues({ ...values, storyImage: url });
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  if (loading || !values) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-sm text-gray-400">
        <Loader2 size={16} className="animate-spin" /> Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-brand-navy">About Page</h1>
          <p className="text-xs text-gray-400">
            Edit the content shown on the /about page — there's one version of this page, so
            changes save directly.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-lg bg-brand-navy px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
        >
          {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>

      {saved && (
        <div className="mt-4 rounded-lg bg-brand-green/10 px-3 py-2 text-xs font-medium text-brand-green">
          Saved — the /about page is updated.
        </div>
      )}
      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div>
      )}

      <div className="mt-5 max-w-2xl rounded-xl border border-gray-100 bg-white p-6">
        {/* Story image */}
        <div className="mb-5">
          <label className="text-xs font-medium text-gray-600">Story photo</label>
          <div className="mt-1.5 flex items-center gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              {values.storyImage ? (
                <img
                  src={resolveImageUrl(values.storyImage)}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageOff size={18} className="text-gray-300" />
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60"
              >
                {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                {uploading ? "Uploading..." : "Replace photo"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {FIELDS.map((field) => (
            <div key={field.name}>
              <label className="text-xs font-medium text-gray-600">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  value={values[field.name] ?? ""}
                  onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy"
                />
              ) : (
                <input
                  type="text"
                  value={values[field.name] ?? ""}
                  onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy"
                />
              )}
              {field.helperText && (
                <p className="mt-1 text-[11px] text-gray-400">{field.helperText}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
