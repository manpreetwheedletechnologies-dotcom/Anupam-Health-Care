import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getServices } from "@/lib/api";
import ServiceCard from "@/components/ServiceCard";

// Always hit the backend fresh — services are managed live from the
// admin dashboard, so this page can't be statically cached at build time.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Services | Anupam Health Care Services",
  description:
    "Nursing care, elder care, equipment on rent, blood collection, physiotherapy, doctor consultation and ambulance service at home in Ghaziabad.",
};

export default async function ServicesPage() {
  const services = await getServices().catch(() => []);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-brand-sky/40 px-5 py-14 text-center md:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
          What we offer
        </p>
        <h1 className="mt-2 text-3xl font-bold text-brand-navy sm:text-4xl">
          Our Services
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
          Professional healthcare delivered with compassion, right at your
          doorstep in Ghaziabad.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        {services.length === 0 ? (
          <p className="text-center text-sm text-gray-400">
            Services will appear here shortly. Please check back soon or call
            us on <a href="tel:7011598306" className="font-semibold text-brand-navy">7011598306</a>.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
