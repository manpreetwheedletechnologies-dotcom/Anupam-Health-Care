"use client";

import ResourceManager, { FieldConfig } from "@/components/admin/ResourceManager";

const fields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "role", label: "Role", type: "text", required: true, placeholder: "Registered Nurse" },
  { name: "desc", label: "Short bio", type: "textarea", required: true },
  { name: "image", label: "Photo", type: "image", helperText: "Upload a photo, or leave blank for an auto-generated avatar" },
  { name: "order", label: "Display order", type: "number" },
  { name: "published", label: "Published (visible on the site)", type: "checkbox" },
];

export default function AdminTeamPage() {
  return (
    <ResourceManager
      resource="team"
      title="Team"
      description="Shown on the /our-team page."
      fields={fields}
      titleField="name"
      subtitleField="role"
    />
  );
}
