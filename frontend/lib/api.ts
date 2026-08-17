// Single place that knows how to talk to the backend. Every component —
// public site or admin dashboard — goes through here instead of calling
// fetch() directly, so the base URL and error handling live in one spot.

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type ServiceItem = {
  id: string;
  title: string;
  slug: string;
  desc: string;
  icon: string;
  color: "navy" | "green";
  bg: "sky" | "greenLight";
  image: string;
  features: string[];
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
  createdAt: string;
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
