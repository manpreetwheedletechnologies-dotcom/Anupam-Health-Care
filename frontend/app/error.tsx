"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console
    console.error("App Error Boundary Caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 shadow-inner">
        <AlertTriangle size={32} />
      </div>

      <h2 className="mt-5 text-xl font-bold text-gray-900 sm:text-2xl">
        Something went wrong
      </h2>
      <p className="mt-2 max-w-md text-xs text-gray-500 sm:text-sm">
        An unexpected error occurred. You can try refreshing the page or navigating back to the homepage.
      </p>

      {error?.message && (
        <div className="mt-4 max-w-lg rounded-xl bg-gray-50 p-3 text-xs text-gray-600 font-mono border border-gray-200 overflow-x-auto">
          {error.message}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-brand-navyDark"
        >
          <RefreshCw size={14} />
          Try Again
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50"
        >
          <Home size={14} />
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
