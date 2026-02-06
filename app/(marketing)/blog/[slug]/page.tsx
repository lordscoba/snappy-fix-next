import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    slug: "building-high-performance-websites",
    title: "Building High‑Performance Websites in 2026",
    date: "Feb 6, 2026",
    category: "Web Development",
    cover: "/images/blog/perf.jpg",
    author: "Snappy‑Fix Team",
    content: [
      "Performance is no longer optional. Users expect pages to load instantly, with smooth motion and crisp visuals.",
      "Focus on image optimization, critical CSS, and accessible typography to keep users engaged.",
      "Measure, iterate, and keep your stack lean so every feature adds real value.",
    ],
  },
  {
    slug: "ui-ux-that-converts",
    title: "UI/UX That Converts: Design Principles That Work",
    date: "Feb 1, 2026",
    category: "Design",
    cover: "/images/blog/uiux.jpg",
    author: "Nwocha Joseph",
    content: [
      "Great design is invisible — it guides users naturally to the next step.",
      "Use contrast and spacing to lead the eye, and keep motion purposeful.",
      "Pair strong headlines with clear CTAs for the best conversion lift.",
    ],
  },
  {
    slug: "scaling-digital-products",
    title: "Scaling Digital Products Without Breaking Quality",
    date: "Jan 24, 2026",
    category: "Product",
    cover: "/images/blog/scale.jpg",
    author: "Osuji Uche",
    content: [
      "Scaling is a design problem as much as it is engineering.",
      "Build reusable systems early, then document everything for team alignment.",
      "Consistency beats complexity when teams move fast.",
    ],
  },
];

export default function BlogDetails({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Blog post not found.</p>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <Link href="/blog" className="text-sm text-[#fb397d] hover:underline">
          ← Back to Blog
        </Link>

        <header className="space-y-4">
          <span className="inline-flex items-center rounded-full bg-[#f4edff] px-3 py-1 text-xs text-[#5b32b4]">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#2b1d3a]">
            {post.title}
          </h1>
          <p className="text-sm text-[#6f5a88]">
            {post.date} • By {post.author}
          </p>
        </header>

        <figure className="relative h-72 w-full overflow-hidden rounded-3xl">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
          />
        </figure>

        <article className="space-y-6 text-[#4d3b63] leading-relaxed">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>
      </section>
    </main>
  );
}
