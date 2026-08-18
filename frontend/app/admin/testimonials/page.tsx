"use client";

import ResourceManager, { FieldConfig } from "@/components/admin/ResourceManager";

const fields: FieldConfig[] = [
  { name: "name", label: "Customer name", type: "text", required: true },
  { name: "location", label: "Location", type: "text", required: true, placeholder: "Raj Nagar" },
  { name: "quote", label: "Testimonial text", type: "textarea", required: true },
  { name: "rating", label: "Rating (1-5)", type: "number" },
  { name: "date", label: "Date label", type: "text", placeholder: "2 months ago" },
  { name: "service", label: "Service used", type: "text", placeholder: "Nursing Care" },
  {
    name: "image",
    label: "Avatar",
    type: "image",
    helperText: "Upload a photo, or leave blank to auto-generate an avatar from the name",
  },
  { name: "order", label: "Display order", type: "number" },
  { name: "published", label: "Published (visible on the site)", type: "checkbox" },
];

export default function AdminTestimonialsPage() {
  return (
    <ResourceManager
      resource="testimonials"
      title="Testimonials"
      description="Shown in the rotating testimonials carousel on the homepage."
      fields={fields}
      titleField="name"
      subtitleField="location"
    />
  );
}
