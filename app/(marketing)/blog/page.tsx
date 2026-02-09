import { posts } from "@/data/BlogData";
import BlogHero from "../../../components/blog/BlogHero";
import BlogList from "../../../components/blog/BlogList";

export default function BlogPage() {
  const heroItems = posts.slice(0, 3).map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    cover: post.cover,
    category: post.category,
  }));

  const listItems = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    category: post.category,
    cover: post.cover,
    author: post.author,
    readingTime: post.readingTime,
  }));

  return (
    <main className="bg-white">
      <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Blog & Insights
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tips, guides, and stories from the Snappy‑Fix team.
          </p>
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <div className="px-6">
          <BlogHero items={heroItems} />
        </div>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="text-2xl font-bold text-[#5b32b4]">Blog Posts </div>
        <BlogList posts={listItems} perPage={5} />
      </section>
    </main>
  );
}
