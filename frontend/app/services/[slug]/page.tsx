import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getServiceBySlug } from "@/lib/api";
import { getIcon } from "@/lib/icons";
import { CheckCircle, Phone } from "lucide-react";
import BookServiceButton from "@/components/BookServiceButton";

// Service content is managed live from the admin dashboard, so render
// this on every request rather than caching a stale set of slugs.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug).catch(() => null);
  if (!service) return {};
  return {
    title: `${service.title} | Anupam Health Care Services`,
    description: service.desc,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getServiceBySlug(params.slug).catch(() => null);
  if (!service) notFound();

  const { title, desc, icon, color, features, image } = service;
  const Icon = getIcon(icon);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative h-56 w-full overflow-hidden sm:h-72 md:h-80">
        <Image src={image} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/20 to-transparent" />
      </section>

      <section className="bg-brand-sky/40 px-5 py-14 md:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div
            className={`-mt-20 mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white shadow-md ${
              color === "navy" ? "bg-brand-navy" : "bg-brand-green"
            }`}
          >
            <Icon size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-brand-navy sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-gray-600">{desc}</p>
          <div className="mt-6 flex gap-3">
            <BookServiceButton className="rounded-lg bg-brand-navy px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg">
              Book this service
            </BookServiceButton>
            <a
              href="tel:7011598306"
              className="flex items-center gap-2 rounded-lg border border-brand-navy px-6 py-3 text-sm font-semibold text-brand-navy"
            >
              <Phone size={16} /> Call now
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12 md:px-8">
        <h2 className="text-xl font-bold text-brand-navy">What's included</h2>
        <ul className="mt-4 space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
              <CheckCircle size={16} className="text-brand-green shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl bg-brand-navy/5 p-6 text-center">
          <p className="text-sm text-gray-700">
            Not sure this is the right fit for your family's needs?
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Call us on{" "}
            <a href="tel:7011598306" className="font-semibold text-brand-navy">
              7011598306
            </a>{" "}
            and our team will help you choose the right service.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
