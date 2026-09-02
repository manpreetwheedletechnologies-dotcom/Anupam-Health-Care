"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  getServices,
  getPackages,
  getTestimonials,
  getTeam,
  getBlogPosts,
  ServiceItem,
  PackageItem,
  TestimonialItem,
  TeamMemberItem,
  BlogPostItem,
} from "@/lib/api";

// Fallback area list. This is the one piece of "content" that isn't a
// database table — it drives a form <select>, not a page — so it's kept
// as a simple constant rather than another admin-managed resource.
export const AREAS = [
  "Raj Nagar (RDC)",
  "Raj Nagar Extension",
  "Govindpuram",
  "Indirapuram",
  "Vaishali",
  "Other Ghaziabad",
];

type SiteData = {
  services: ServiceItem[];
  packages: PackageItem[];
  testimonials: TestimonialItem[];
  team: TeamMemberItem[];
  blog: BlogPostItem[];
  loading: boolean;
};

const SiteDataContext = createContext<SiteData>({
  services: [],
  packages: [],
  testimonials: [],
  team: [],
  blog: [],
  loading: true,
});

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>({
    services: [],
    packages: [],
    testimonials: [],
    team: [],
    blog: [],
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    Promise.all([getServices(), getPackages(), getTestimonials(), getTeam(), getBlogPosts()])
      .then(([services, packages, testimonials, team, blog]) => {
        if (cancelled) return;
        setData({ services, packages, testimonials, team, blog, loading: false });
      })
      .catch(() => {
        // Backend unreachable — fail soft so the page still renders
        // (empty lists) instead of a blank screen.
        if (!cancelled) setData((prev) => ({ ...prev, loading: false }));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
