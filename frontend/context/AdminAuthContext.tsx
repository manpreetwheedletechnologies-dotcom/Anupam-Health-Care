"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { adminLogin as apiAdminLogin } from "@/lib/api";

const TOKEN_KEY = "anupam_admin_token";
const EMAIL_KEY = "anupam_admin_email";

type AdminAuthValue = {
  token: string | null;
  email: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_KEY));
    setEmail(localStorage.getItem(EMAIL_KEY));
    setLoading(false);
  }, []);

  async function login(loginEmail: string, password: string) {
    const res = await apiAdminLogin(loginEmail, password);
    localStorage.setItem(TOKEN_KEY, res.accessToken);
    localStorage.setItem(EMAIL_KEY, res.email);
    setToken(res.accessToken);
    setEmail(res.email);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    setToken(null);
    setEmail(null);
  }

  return (
    <AdminAuthContext.Provider value={{ token, email, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}
