"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext";
import { AdminToastProvider } from "@/context/AdminToastContext";
import AdminShell from "@/components/admin/AdminShell";
import { ReactNode } from "react";

function Guard({ children }: { children: ReactNode }) {
  const { token, loading } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (loading) return;
    if (!token && !isLoginPage) router.replace("/admin/login");
    if (token && isLoginPage) router.replace("/admin");
  }, [loading, token, isLoginPage, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-400">
        Loading...
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;
  if (!token) return null; // redirect effect above will kick in

  return <AdminShell>{children}</AdminShell>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminToastProvider>
        <Guard>{children}</Guard>
      </AdminToastProvider>
    </AdminAuthProvider>
  );
}
