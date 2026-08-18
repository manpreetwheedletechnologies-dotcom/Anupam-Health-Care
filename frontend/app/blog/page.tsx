import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Calendar, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { getBlogPosts, resolveImageUrl } from "@/lib/api";
import Testimonials from "@/components/Testimonials";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blogs & Resources | Anupam Health Care Services",
  description:
    "Guides and resources on home nursing, elder care, and recovering safely at home from Anupam Health Care Services.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts().catch(() => []);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const remainingPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-sky/30 via-white to-brand-sky/10 px-5 py-16 text-center md:px-8 md:py-20">
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-brand-green/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-brand-sky/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-green">
            <Sparkles size={14} />
            Blogs & Resources
          </span>
          <h1 className="mt-4 text-4xl font-bold text-brand-navy sm:text-5xl md:text-6xl">
            Guides for caring <br />
            <span className="bg-gradient-to-r from-brand-green to-brand-sky bg-clip-text text-transparent">
              at home
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
            Practical advice from our care team on nursing, elder care, and
            recovery at home.
          </p>
          {posts.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
              <BookOpen size={18} className="text-brand-green" />
              <span>{posts.length} {posts.length === 1 ? "article" : "articles"}</span>
            </div>
          )}
        </div>
      </section>

      {/* Featured post — with banner image */}
      {featuredPost && (
        <section className="mx-auto max-w-5xl px-5 py-8 md:px-8">
          <a
            href={`/blog/${featuredPost.slug}`}
            className="group grid overflow-hidden rounded-3xl bg-brand-navy shadow-xl md:grid-cols-2"
          >
            <div className="relative h-56 md:h-full">
              <Image
                src={resolveImageUrl(featuredPost.image)}
                alt={featuredPost.title}
                fill
                unoptimized
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent md:hidden" />
            </div>
            <div className="relative p-8 text-white md:p-10">
              <span className="inline-block rounded-full bg-brand-green/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
                Featured Article
              </span>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                {featuredPost.title}
              </h2>
              <p className="mt-3 text-sm text-gray-300 md:text-base">
                {featuredPost.excerpt}
              </p>
              <span className="mt-4 flex items-center gap-1.5 text-sm text-gray-300">
                <Calendar size={16} /> {featuredPost.date}
              </span>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-navy transition-all group-hover:gap-3">
                Read article <ArrowRight size={16} />
              </span>
            </div>
          </a>
        </section>
      )}

      {/* All posts — with banner image on each card */}
      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        {posts.length > 1 && (
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-brand-navy">More resources</h2>
            <span className="text-sm text-gray-400">{remainingPosts.length} articles</span>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 py-20 text-center">
            <BookOpen size={48} className="text-gray-300" />
            <p className="mt-4 text-lg font-medium text-gray-500">New posts coming soon.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={resolveImageUrl(post.image)}
                    alt={post.title}
                    fill
                    unoptimized
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar size={14} /> {post.date}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold leading-tight text-gray-900 transition-colors group-hover:text-brand-navy">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-navy transition-all group-hover:gap-2">
                    Read more <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      <Testimonials />
      <Footer />
    </main>
  );
}
