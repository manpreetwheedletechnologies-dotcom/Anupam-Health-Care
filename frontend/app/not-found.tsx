import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-extrabold tracking-widest text-brand-green uppercase">
        404 Error
      </p>
      <h1 className="mt-3 text-3xl font-bold text-brand-navy sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-md text-xs text-gray-500 sm:text-sm">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-brand-navyDark"
        >
          <Home size={14} />
          Go to Home
        </Link>
      </div>
    </div>
  );
}
