"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LockKeyhole,
  ShieldAlert,
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  KeyRound,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState("admin@anupamhealthcare.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email.trim().toLowerCase(), password);
      router.replace("/admin");
    } catch (err: any) {
      setError(
        err.message ||
          "Invalid email or password. Please make sure the backend is running and credentials are correct."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-brand-navyDark to-[#022b51] px-5 py-12">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/20 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-80 w-80 rounded-full bg-brand-sky/10 blur-3xl" />

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-md transition hover:bg-white/15 hover:text-white"
      >
        <ArrowLeft size={14} />
        Back to Website
      </Link>

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navyDark shadow-lg shadow-brand-navy/30">
            <LockKeyhole size={26} className="text-brand-green" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-brand-navy">
            Admin Portal
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            Anupam Health Care Services — Management Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {/* Email input */}
          <div>
            <label className="text-xs font-semibold text-gray-700">
              Admin Email
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={16} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-10 pr-4 text-sm font-medium text-gray-800 outline-none transition focus:border-brand-navy focus:bg-white focus:ring-2 focus:ring-brand-navy/10"
                placeholder="admin@anupamhealthcare.com"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-700">
                Password
              </label>
            </div>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <KeyRound size={16} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-10 pr-10 text-sm font-medium text-gray-800 outline-none transition focus:border-brand-navy focus:bg-white focus:ring-2 focus:ring-brand-navy/10"
                placeholder="Enter admin password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3.5 text-xs text-red-600 border border-red-100">
              <ShieldAlert size={16} className="mt-0.5 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-navy to-brand-navyDark py-3 text-sm font-bold text-white shadow-lg shadow-brand-navy/25 transition-all hover:opacity-95 active:scale-[0.99] disabled:opacity-60"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing in...
              </span>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>

        {/* Security badge */}
        <div className="mt-6 border-t border-gray-100 pt-4 text-center">
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
            <CheckCircle2 size={13} className="text-brand-green" />
            Authorized staff access only • SSL encrypted
          </p>
        </div>
      </div>
    </div>
  );
}
