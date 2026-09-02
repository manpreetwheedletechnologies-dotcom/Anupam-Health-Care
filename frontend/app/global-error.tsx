"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 text-center font-sans">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
          <AlertTriangle size={32} />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Application Error
        </h2>
        <p className="mt-2 max-w-md text-sm text-gray-600">
          A critical application error occurred.
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-slate-800"
        >
          <RefreshCw size={14} />
          Reload Application
        </button>
      </body>
    </html>
  );
}
