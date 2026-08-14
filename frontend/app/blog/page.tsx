import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blogs & Resources | Anupam Health Care Services",
  description:
    "Guides and resources on home nursing, elder care, and recovering safely at home from Anupam Health Care Services.",
};

const POSTS = [
  {
    title: "5 signs your elderly parent may need a home attendant",
    date: "August 2026",
    excerpt:
      "Common signs to watch for — and how a GDA attendant can help your family manage day-to-day care safely.",
  },
  {
    title: "Post-surgery recovery at home: a simple checklist",
    date: "July 2026",
    excerpt:
      "What to prepare before a patient comes home after surgery, from equipment to wound care routines.",
  },
  {
    title: "Choosing between a nurse and a GDA attendant",
    date: "July 2026",
    excerpt:
      "Understanding the difference in training and scope so you book the right kind of support.",
  },
  {
    title: "Home blood sample collection: what to expect",
    date: "June 2026",
    excerpt:
      "How the process works, how to prepare, and how soon you'll get results.",
  },
];

export default function BlogPage() {
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
        <div className="grid gap-5 sm:grid-cols-2">
          {POSTS.map((post) => (
            <a
              key={post.title}
              href="#"
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
      </section>

      <Footer />
    </main>
  );
}
