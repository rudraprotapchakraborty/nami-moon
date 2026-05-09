"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

function getBlogPost(slug: string) {
  const blogPosts = [
    {
      slug: "year-of-excellence",
      title: "A year of excellence, a year of restraint.",
      excerpt:
        "Reflecting on our remarkable first year — the kitchen we built, the disciplines we kept, and the quiet moments shared with our guests.",
      content: `
        <p>As we mark our first anniversary, gratitude comes easily and the work, less so. What began as a quiet conviction — that Pan-Asian cuisine deserved a more considered home in Dhaka — has grown into a daily ritual we are still learning to honor.</p>

        <h2>Our humble beginnings</h2>
        <p>When we first opened our doors, we were driven by a singular passion for Asian cuisine and a vision to create something honest. Our team set out to craft a dining experience that would not only delight, but tell a story with every dish — without raising its voice.</p>

        <h2>Overcoming challenges</h2>
        <p>The path was not without its hurdles. From sourcing the finest ingredients to perfecting our techniques, every day presented new lessons. But it was these very challenges that pushed us to refine our craft.</p>

        <h2>Memorable moments</h2>
        <p>Throughout the year, we have had the pleasure of serving thousands of guests, each evening unique. From intimate date nights to grand celebrations, Nami Moon has been the backdrop for many quiet, considered hours.</p>

        <h2>Looking ahead</h2>
        <p>As we look to the future, we are filled with excitement for what is to come. We remain committed to our journey of culinary excellence, always seeking to surprise and delight our guests with new flavors, new textures, new ideas.</p>

        <p>To all our patrons, staff, and supporters — thank you for being part of our story.</p>
      `,
      image: "/about.jpg",
      date: "January 20, 2024",
      author: "The Nami Moon Team",
      authorImage: "/logo.png",
      read: "8 min",
      category: "Anniversary",
    },
  ];
  return blogPosts.find((post) => post.slug === slug);
}

function getRelatedArticles(currentSlug: string) {
  const allArticles = [
    {
      slug: "seasonal-ingredients-spring",
      title: "Seasonal Ingredients — Spring",
      excerpt: "Vibrant flavors of spring across Asian kitchens.",
      image: "/heroimg1.jpg",
      category: "Chef's Special",
    },
    {
      slug: "sushi-etiquette",
      title: "The Quiet Art of Sushi Etiquette",
      excerpt: "How to enjoy sushi with grace.",
      image: "/heroimg2.jpg",
      category: "Culinary News",
    },
    {
      slug: "sake-pairing-guide",
      title: "A Beginner's Guide to Sake Pairing",
      excerpt: "Choosing the right pour for the right plate.",
      image: "/heroimg3.jpg",
      category: "Culinary News",
    },
  ];
  return allArticles.filter((article) => article.slug !== currentSlug);
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const relatedArticles = getRelatedArticles(params.slug);

  return (
    <div className="bg-ink min-h-screen text-ivory">
      {/* Article header */}
      <article className="pt-36 md:pt-44 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.32em] uppercase text-ivory-muted hover:text-gold transition-colors mb-12"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Journal
          </Link>

          <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-ivory-muted mb-8">
            <span className="text-gold">{post.category}</span>
            <span className="h-3 w-px bg-hairline-strong" />
            <span>{post.date}</span>
            <span className="h-3 w-px bg-hairline-strong" />
            <span>{post.read}</span>
          </div>

          <h1 className="display-lg text-ivory text-balance">{post.title}</h1>
          <p className="mt-8 font-display text-xl md:text-2xl italic text-ivory-dim leading-snug text-balance">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 mt-12 pt-8 border-t border-hairline">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-hairline-strong">
              <Image src={post.authorImage} alt={post.author} fill className="object-contain p-2 bg-ink-2" />
            </div>
            <div>
              <div className="eyebrow-ivory">By</div>
              <div className="text-ivory text-sm">{post.author}</div>
            </div>
          </div>
        </div>

        {/* Lead image */}
        <div className="mt-16">
          <div className="relative aspect-[16/9] max-w-6xl mx-auto bg-ink-3 overflow-hidden">
            <Image src={post.image} alt={post.title} fill priority className="object-cover" />
          </div>
        </div>
      </article>

      {/* Body */}
      <section className="pb-24">
        <div className="mx-auto max-w-2xl px-6">
          <div
            className="prose-editorial"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-hairline py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-center gap-4 mb-10">
            <span className="eyebrow">Continue Reading</span>
            <span className="rule-gold" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {relatedArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
                <div className="relative aspect-[4/5] mb-5 overflow-hidden bg-ink-3">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="eyebrow text-gold mb-3">{article.category}</div>
                <h3 className="font-display text-2xl text-ivory group-hover:text-gold transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="mt-3 text-ivory-muted text-sm">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-hairline py-24 noise">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <span className="eyebrow">Reserve</span>
          <h3 className="display-md mt-6 text-ivory text-balance">
            Experience Nami Moon for yourself.
          </h3>
          <p className="mt-6 text-ivory-muted text-base leading-relaxed max-w-md mx-auto">
            Tables are released two weeks in advance. We'd love to host you.
          </p>
          <Link
            href="/booking"
            className="mt-10 inline-flex items-center gap-4 bg-gold text-ink px-10 py-5 text-[11px] tracking-[0.32em] uppercase font-medium hover:bg-ivory transition-colors"
          >
            Reserve a Table
            <Arrow />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}
