// Single place that knows how to talk to the backend. Every component —
// public site or admin dashboard — goes through here instead of calling
// fetch() directly, so the base URL and error handling live in one spot.

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Images can be: a local /public asset ("/images/..."), a full external
// URL (ui-avatars.com avatars), or a path returned by the admin upload
// endpoint ("/uploads/xyz.jpg") which is relative to the BACKEND, not the
// frontend. This resolves any of those into something safe to put in an
// <img>/<Image> src.
export function resolveImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/uploads/")) return `${API_BASE}${path}`;
  return path;
}

export type ServiceItem = {
  id: string;
  title: string;
  slug: string;
  desc: string;
  longDesc: string;
  icon: string;
  color: "navy" | "green";
  bg: "sky" | "greenLight";
  image: string;
  features: string[];
  benefits: string[];
  process: string[];
  order: number;
  published: boolean;
};

export type PackageItem = {
  id: string;
  name: string;
  price: string;
  desc: string;
  features: string[];
  equipment: string[];
  services: string[];
  bestFor: string;
  duration: string;
  savings: string;
  rating: number;
  popular: boolean;
  order: number;
  published: boolean;
};

export type TestimonialItem = {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  date: string;
  service: string;
  image: string;
  order: number;
  published: boolean;
};

export type TeamMemberItem = {
  id: string;
  name: string;
  role: string;
  desc: string;
  image: string;
  order: number;
  published: boolean;
};

export type BlogPostItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  published: boolean;
};

export type LeadItem = {
  id: string;
  name: string;
  phone: string;
  service: string;
  area: string;
  status: string;
  source: string;
  preferredDate: string;
  preferredTime: string;
  confirmedDate: string;
  confirmedTime: string;
  createdAt: string;
};

export type AboutContentItem = {
  id: string;
  heroTitle: string;
  heroSubtitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyImage: string;
  founderName: string;
  founderRole: string;
  founderQuote: string;
  missionText: string;
  visionText: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request to ${path} failed (${res.status})`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ---------- Public reads (used by the marketing site) ----------

export const getServices = () => request<ServiceItem[]>("/services");
export const getServiceBySlug = (slug: string) =>
  request<ServiceItem>(`/services/slug/${encodeURIComponent(slug)}`);
export const getPackages = () => request<PackageItem[]>("/packages");
export const getTestimonials = () => request<TestimonialItem[]>("/testimonials");
export const getTeam = () => request<TeamMemberItem[]>("/team");
export const getBlogPosts = () => request<BlogPostItem[]>("/blog");
export const getBlogPostBySlug = (slug: string) =>
  request<BlogPostItem>(`/blog/slug/${encodeURIComponent(slug)}`);

export const submitLead = (payload: {
  name: string;
  phone: string;
  service: string;
  area: string;
  preferredDate?: string;
  preferredTime?: string;
}) => request<LeadItem>("/leads", { method: "POST", body: JSON.stringify(payload) });

// ---------- Admin auth ----------

export const adminLogin = (email: string, password: string) =>
  request<{ accessToken: string; email: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

// ---------- Admin: generic CRUD used by the dashboard's resource manager ----------
// `resource` is the API path segment: "services" | "packages" | "testimonials" | "team" | "blog"

export const adminListAll = (resource: string, token: string) =>
  request<any[]>(`/${resource}/admin/all`, { headers: authHeaders(token) });

export const adminCreate = (resource: string, token: string, data: Record<string, unknown>) =>
  request<any>(`/${resource}`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });

export const adminUpdate = (
  resource: string,
  id: string,
  token: string,
  data: Record<string, unknown>
) =>
  request<any>(`/${resource}/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });

export const adminRemove = (resource: string, id: string, token: string) =>
  request<{ success: boolean }>(`/${resource}/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

// ---------- Admin: leads + dashboard stats ----------

export const adminGetLeads = (token: string) =>
  request<LeadItem[]>("/leads", { headers: authHeaders(token) });

export const adminUpdateLeadStatus = (id: string, status: string, token: string) =>
  request<LeadItem>(`/leads/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ status }),
  });

// Sets/updates the confirmed appointment date & time for a lead — used
// by the "Confirm appointment" control in the admin leads page.
export const adminConfirmAppointment = (
  id: string,
  data: { confirmedDate: string; confirmedTime: string },
  token: string
) =>
  request<LeadItem>(`/leads/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ ...data, status: "confirmed" }),
  });

export const adminDeleteLead = (id: string, token: string) =>
  request<{ success: boolean }>(`/leads/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

export type DashboardStats = {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
  leadsToday: number;
  upcomingAppointments: number;
  counts: {
    services: number;
    packages: number;
    testimonials: number;
    team: number;
    blog: number;
  };
};

export const adminGetStats = (token: string) =>
  request<DashboardStats>("/leads/stats", { headers: authHeaders(token) });

// ---------- Chatbot ----------

export type ChatReply = {
  reply: string;
  quickReplies?: string[];
  form?: "booking";
  items?: { title: string; desc: string; price?: string; features?: string[] }[];
  itemsType?: "services" | "packages";
};

export const sendChatMessage = (sessionId: string, message: string) =>
  request<ChatReply>("/chat/message", {
    method: "POST",
    body: JSON.stringify({ sessionId, message }),
  });

export const sendChatBooking = (payload: {
  sessionId: string;
  name: string;
  phone: string;
  service: string;
  area: string;
  preferredDate?: string;
  preferredTime?: string;
}) =>
  request<ChatReply>("/chat/book", {
    method: "POST",
    body: JSON.stringify(payload),
  });

// ---------- Admin: image upload ----------
// Used by the "image" field type in ResourceManager (and the About page
// editor) to upload a file and get back a URL to store on the record.

export async function adminUploadImage(file: File, token: string): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/uploads`, {
    method: "POST",
    headers: authHeaders(token), // no Content-Type — the browser sets the multipart boundary
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Upload failed (${res.status})`);
  }
  return res.json();
}

// ---------- About page content (singleton) ----------

export const getAboutContent = () => request<AboutContentItem>("/about");

export const adminGetAbout = (token: string) =>
  request<AboutContentItem>("/about", { headers: authHeaders(token) });

export const adminUpdateAbout = (token: string, data: Partial<AboutContentItem>) =>
  request<AboutContentItem>("/about", {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
