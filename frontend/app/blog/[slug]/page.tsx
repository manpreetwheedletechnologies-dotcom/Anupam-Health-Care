import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Phone } from "lucide-react";
import { getBlogPostBySlug } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug).catch(() => null);
  if (!post) return {};
  return {
    title: `${post.title} | Anupam Health Care Services`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug).catch(() => null);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-brand-sky/40 px-5 py-14 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="flex items-center justify-center gap-1.5 text-xs text-brand-green font-semibold">
            <Calendar size={12} /> {post.date}
          </span>
          <h1 className="mt-2 text-3xl font-bold text-brand-navy sm:text-4xl">
            {post.title}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">{post.excerpt}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12 md:px-8">
        {post.content ? (
          <div className="prose prose-sm max-w-none whitespace-pre-wrap text-gray-700">
            {post.content}
          </div>
        ) : (
          <p className="text-sm text-gray-400">Full article coming soon.</p>
        )}

        <div className="mt-10 rounded-2xl bg-brand-navy/5 p-6 text-center">
          <p className="text-sm text-gray-700">Have a question about care at home?</p>
          <p className="mt-1 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Phone size={14} className="text-brand-green" />
            Call us on{" "}
            <a href="tel:7011598306" className="font-semibold text-brand-navy">
              7011598306
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
