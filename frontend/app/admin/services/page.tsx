"use client";

import ResourceManager, { FieldConfig } from "@/components/admin/ResourceManager";

const fields: FieldConfig[] = [
  // Basic Information
  { name: "title", label: "Title", type: "text", required: true },
  {
    name: "slug",
    label: "URL slug",
    type: "text",
    helperText: "Leave blank to auto-generate from the title",
  },
  { 
    name: "desc", 
    label: "Short description", 
    type: "textarea", 
    required: true, 
    helperText: "Shown on cards and the top of the service page" 
  },
  { 
    name: "longDesc", 
    label: "Full description", 
    type: "textarea", 
    helperText: "Optional — a fuller paragraph shown further down the service page" 
  },

  // Display & Styling
  { name: "icon", label: "Icon", type: "icon" },
  { 
    name: "color", 
    label: "Accent color", 
    type: "select", 
    options: ["navy", "green"] 
  },
  { 
    name: "bg", 
    label: "Background tint", 
    type: "select", 
    options: ["sky", "greenLight"] 
  },
  { 
    name: "image", 
    label: "Image", 
    type: "image", 
    placeholder: "/images/services/example.jpg" 
  },

  // Content Sections
  { 
    name: "features", 
    label: "What's included", 
    type: "tags", 
    placeholder: "24/7 availability, Trained staff" 
  },
  { 
    name: "benefits", 
    label: "Why choose this (benefits)", 
    type: "tags", 
    placeholder: "Faster recovery, Peace of mind" 
  },
  { 
    name: "process", 
    label: "How it works (steps, in order)", 
    type: "tags", 
    placeholder: "Call us, We assign staff, Care begins" 
  },

  // Administrative Controls
  { 
    name: "order", 
    label: "Display order", 
    type: "number" 
  },
  { 
    name: "published", 
    label: "Published (visible on the site)", 
    type: "checkbox" 
  },
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