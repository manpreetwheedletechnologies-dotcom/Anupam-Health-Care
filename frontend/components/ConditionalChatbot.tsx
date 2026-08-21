"use client";

import { usePathname } from "next/navigation";
import Chatbot from "./Chatbot";

// The chatbot is for site visitors, not the admin dashboard — this stays
// a tiny client component so layout.tsx (a server component) doesn't
// need "use client" just to check the current route.
export default function ConditionalChatbot() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Chatbot />;
}
