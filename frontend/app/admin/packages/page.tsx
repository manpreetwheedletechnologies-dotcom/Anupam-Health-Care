"use client";

import ResourceManager, { FieldConfig } from "@/components/admin/ResourceManager";

const fields: FieldConfig[] = [
  { name: "name", label: "Package name", type: "text", required: true },
  { name: "price", label: "Price", type: "text", required: true, placeholder: "₹1,800" },
  { name: "desc", label: "Description", type: "textarea", required: true },
  { name: "features", label: "Features", type: "tags" },
  { name: "equipment", label: "Equipment included", type: "tags" },
  { name: "services", label: "Service tags", type: "tags" },
  { name: "bestFor", label: "Best for", type: "text" },
  { name: "duration", label: "Duration", type: "text", placeholder: "24 hours" },
  { name: "savings", label: "Savings badge", type: "text", placeholder: "Save ₹600" },
  { name: "rating", label: "Rating (out of 5)", type: "number" },
  { name: "popular", label: "Mark as \"Most popular\"", type: "checkbox" },
  { name: "order", label: "Display order", type: "number" },
  { name: "published", label: "Published (visible on the site)", type: "checkbox" },
];

export default function AdminPackagesPage() {
  return (
    <ResourceManager
      resource="packages"
      title="Care Packages"
      description="Shown in the pricing/packages section on the homepage."
      fields={fields}
      titleField="name"
      subtitleField="price"
    />
  );
}
