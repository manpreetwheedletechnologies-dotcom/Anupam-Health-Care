"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

export type Toast = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
};

type ToastContextType = {
  showToast: (type: ToastType, title: string, message?: string) => void;
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function AdminToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, title: string, message?: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: Toast = { id, type, title, message };

      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const showSuccess = useCallback(
    (title: string, message?: string) => showToast("success", title, message),
    [showToast]
  );
  const showError = useCallback(
    (title: string, message?: string) => showToast("error", title, message),
    [showToast]
  );
  const showWarning = useCallback(
    (title: string, message?: string) => showToast("warning", title, message),
    [showToast]
  );
  const showInfo = useCallback(
    (title: string, message?: string) => showToast("info", title, message),
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeToast,
      }}
    >
      {children}

      {/* Floating Toast Notification Container */}
      <div className="fixed top-5 right-5 z-[9999] flex max-w-sm w-full flex-col gap-2.5 pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => {
          let bgClass = "bg-white border-gray-200 text-gray-800";
          let icon = <Info size={20} className="text-blue-500 shrink-0" />;

          if (toast.type === "success") {
            bgClass = "bg-emerald-50 border-emerald-300 text-emerald-950";
            icon = <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />;
          } else if (toast.type === "error") {
            bgClass = "bg-red-50 border-red-300 text-red-950";
            icon = <AlertCircle size={20} className="text-red-600 shrink-0" />;
          } else if (toast.type === "warning") {
            bgClass = "bg-amber-50 border-amber-300 text-amber-950";
            icon = <AlertTriangle size={20} className="text-amber-600 shrink-0" />;
          } else if (toast.type === "info") {
            bgClass = "bg-blue-50 border-blue-300 text-blue-950";
            icon = <Info size={20} className="text-blue-600 shrink-0" />;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-md transition-all duration-300 animate-fade-down ${bgClass}`}
            >
              {icon}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold leading-tight">{toast.title}</p>
                {toast.message && (
                  <p className="mt-1 text-xs opacity-85 leading-relaxed">
                    {toast.message}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="rounded-lg p-1 opacity-60 transition hover:opacity-100 hover:bg-black/5"
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useAdminToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useAdminToast must be used within an AdminToastProvider");
  }
  return ctx;
}
