import Image from "next/image";
import Link from "next/link";

const categories = ["All", "Culinary News", "Behind the Scenes", "Chef's Special", "Events", "Reviews"];

const featured = {
  slug: "year-of-excellence",
  category: "Anniversary",
  date: "January 20, 2024",
  title: "A year of excellence, a year of restraint.",
  excerpt:
    "Reflecting on our remarkable first year — the kitchen we built, the disciplines we kept, and the quiet moments shared with our guests.",
  image: "/about.jpg",
  read: "8 min",
};

const blogPosts = [
  {
    id: 1,
    slug: "art-of-omakase",
    title: "The Art of Omakase",
    excerpt:
      "Discover the meticulous preparation and cultural significance behind every course in traditional omakase dining.",
    category: "Culinary News",
    date: "Feb 15, 2024",
    image: "/heroimg1.jpg",
    read: "6 min",
  },
  {
    id: 2,
    slug: "meet-our-master-chef",
    title: "Meet our master chef",
    excerpt:
      "An exclusive interview with our head chef, exploring his inspiration and vision for Nami Moon.",
    category: "Behind the Scenes",
    date: "Feb 10, 2024",
    image: "/heroimg2.jpg",
    read: "5 min",
  },
  {
    id: 3,
    slug: "seasonal-specialties-spring-2024",
    title: "Seasonal specialties — Spring 2024",
    excerpt:
      "Introducing our new spring menu featuring the finest seasonal ingredients from across Asia.",
    category: "Chef's Special",
    date: "Feb 5, 2024",
    image: "/heroimg3.jpg",
    read: "4 min",
  },
  {
    id: 4,
    slug: "valentines-day-special",
    title: "A Valentine's tasting",
    excerpt:
      "Join us for an extraordinary celebration with our exclusive couple's omakase menu.",
    category: "Events",
    date: "Feb 1, 2024",
    image: "/heroimg4.jpg",
    read: "3 min",
  },
  {
    id: 5,
    slug: "sake-selection-guide",
    title: "The sake guide",
    excerpt:
      "Our sommelier's notes on choosing the perfect pour to complement your meal.",
    category: "Culinary News",
    date: "Jan 28, 2024",
    image: "/heroimg5.jpg",
    read: "7 min",
  },
  {
    id: 6,
    slug: "customer-stories",
    title: "Memorable moments",
    excerpt: "Stories from our guests — quiet evenings, milestone dinners, surprises kept.",
    category: "Reviews",
    date: "Jan 25, 2024",
    image: "/heroimg6.jpg",
    read: "5 min",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-ink min-h-screen text-ivory">
      {/* Header */}
      <section className="relative pt-36 md:pt-44 pb-20 noise border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <span className="eyebrow">N° 09 · Journal</span>
                <span className="block h-px w-16 bg-gold/50" />
              </div>
              <h1 className="display-xl text-ivory text-balance">
                Notes from the{" "}
                <span className="italic font-light text-gold">kitchen</span>{" "}
                and the floor.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 self-end">
              <p className="text-ivory-muted text-base leading-relaxed">
                Editorial dispatches on technique, ingredient, and the people who
                shape the daily ritual at Nami Moon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 md:py-24 border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-center gap-4 mb-10">
            <span className="eyebrow">Featured</span>
            <span className="rule-gold" />
          </div>

          <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden bg-ink-3">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-ivory-muted mb-6">
                <span className="text-gold">{featured.category}</span>
                <span className="h-3 w-px bg-hairline-strong" />
                <span>{featured.date}</span>
                <span className="h-3 w-px bg-hairline-strong" />
                <span>{featured.read}</span>
              </div>
              <h2 className="display-lg text-ivory text-balance group-hover:text-gold transition-colors">
                {featured.title}
              </h2>
              <p className="mt-8 text-ivory-muted text-base leading-relaxed max-w-lg">
                {featured.excerpt}
              </p>
              <span className="mt-10 inline-flex items-center gap-3 text-gold text-[11px] tracking-[0.32em] uppercase border-b border-gold/40 group-hover:border-gold pb-1 w-fit transition-colors">
                Read the Story <Arrow />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {categories.map((c, i) => (
              <button
                key={c}
                className={`text-[11px] tracking-[0.28em] uppercase font-medium transition-colors ${
                  i === 0 ? "text-gold" : "text-ivory-muted hover:text-ivory"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {blogPosts.map((post, i) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-ink-3">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] tracking-[0.3em] uppercase">
                    <span className="bg-ink/80 backdrop-blur-sm text-gold px-3 py-1.5 border border-gold/30">
                      {post.category}
                    </span>
                    <span className="text-ivory">N° {String(i + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-ivory-muted mb-3 flex items-center gap-3">
                  <span>{post.date}</span>
                  <span className="h-3 w-px bg-hairline-strong" />
                  <span>{post.read}</span>
                </div>
                <h3 className="font-display text-2xl text-ivory text-balance group-hover:text-gold transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="mt-3 text-ivory-muted text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-ivory-faint group-hover:text-gold transition-colors">
                  Read <Arrow />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button className="inline-flex items-center gap-4 border border-hairline-strong text-ivory px-8 py-4 text-[11px] tracking-[0.32em] uppercase hover:border-gold hover:text-gold transition-colors">
              Load More <Arrow />
            </button>
          </div>
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
