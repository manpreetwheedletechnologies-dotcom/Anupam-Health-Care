// List fields (features, equipment, tags...) are stored as a JSON string
// rather than a native array, so the field type stays a plain string
// across whichever database you use. Every module uses these two helpers
// so the API always speaks arrays, never raw JSON strings, to the
// frontend and the admin dashboard.

export function toJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function fromJsonArray(value: unknown): string {
  if (Array.isArray(value)) {
    return JSON.stringify(value.filter((v) => typeof v === "string"));
  }
  if (typeof value === "string") {
    // Allow comma-separated input from simple form fields too.
    return JSON.stringify(
      value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    );
  }
  return "[]";
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
