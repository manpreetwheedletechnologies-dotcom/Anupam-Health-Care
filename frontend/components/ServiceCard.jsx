import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { resolveImageUrl } from "@/lib/api";

export default function ServiceCard({ title, desc, icon, color, bg, slug, features, image }) {
  // `icon` comes from the database as a plain string name (e.g. "UserRound")
  // so new services added from the admin dashboard render correctly without
  // any code change here.
  const Icon = typeof icon === "string" ? getIcon(icon) : icon;

  return (
    <a
      href={`/services/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-brand-navy/10"
    >
      {/* Card image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={resolveImageUrl(image)}
          alt={title}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm ${
              color === "navy" ? "bg-brand-navy" : "bg-brand-green"
            }`}
          >
            <Icon size={16} className="text-white" />
          </div>
          <p className="text-sm font-bold text-gray-900">{title}</p>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-gray-600">{desc}</p>

        {features && features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {features.map((f) => (
              <span key={f} className="text-[9px] font-medium text-gray-700 bg-white/60 px-2 py-0.5 rounded-full">
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center gap-1 text-xs font-semibold text-gray-800 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          Learn more
          <ChevronRight size={14} />
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150" />
    </a>
  );
}
