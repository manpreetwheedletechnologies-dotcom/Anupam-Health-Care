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
  { name: "desc", label: "Description", type: "textarea", required: true },
  { name: "icon", label: "Icon", type: "icon" },
  { name: "color", label: "Accent color", type: "select", options: ["navy", "green"] },
  { name: "bg", label: "Background tint", type: "select", options: ["sky", "greenLight"] },
  { name: "image", label: "Image path or URL", type: "text", placeholder: "/images/services/example.jpg" },
  { name: "features", label: "Features", type: "tags" },
  { name: "order", label: "Display order", type: "number" },
  { name: "published", label: "Published (visible on the site)", type: "checkbox" },
];

export default function AdminServicesPage() {
  return (
    <ResourceManager
      resource="services"
      title="Services"
      description="Shown in the homepage grid, header dropdown, and /services pages."
      fields={fields}
      titleField="title"
      subtitleField="desc"
    />
  );
}
