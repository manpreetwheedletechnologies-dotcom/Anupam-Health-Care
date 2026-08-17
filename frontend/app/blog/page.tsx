import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blogs & Resources | Anupam Health Care Services",
  description:
    "Guides and resources on home nursing, elder care, and recovering safely at home from Anupam Health Care Services.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts().catch(() => []);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-brand-sky/40 px-5 py-14 text-center md:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
          Blogs & resources
        </p>
        <h1 className="mt-2 text-3xl font-bold text-brand-navy sm:text-4xl">
          Guides for caring at home
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
          Practical advice from our care team on nursing, elder care, and
          recovery at home.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 md:px-8">
        {posts.length === 0 ? (
          <p className="text-center text-sm text-gray-400">New posts coming soon.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {posts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-gray-100 p-6 shadow-card transition hover:-translate-y-1 hover:shadow-cardHover"
              >
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar size={12} /> {post.date}
                </span>
                <p className="mt-2 text-base font-semibold text-gray-900">
                  {post.title}
                </p>
                <p className="mt-2 text-sm text-gray-500">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-navy">
                  Read more <ArrowRight size={14} />
                </span>
              </a>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
