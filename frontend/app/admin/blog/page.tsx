"use client";

import ResourceManager, { FieldConfig } from "@/components/admin/ResourceManager";

const fields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text", required: true },
  {
    name: "slug",
    label: "URL slug",
    type: "text",
    helperText: "Leave blank to auto-generate from the title",
  },
  { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
  { name: "content", label: "Full article content", type: "textarea" },
  { name: "date", label: "Date label", type: "text", placeholder: "August 2026" },
  { name: "published", label: "Published (visible on the site)", type: "checkbox" },
];

export default function AdminBlogPage() {
  return (
    <ResourceManager
      resource="blog"
      title="Blog Posts"
      description="Shown on the /blog page and each post's own page."
      fields={fields}
      titleField="title"
      subtitleField="excerpt"
    />
  );
}
