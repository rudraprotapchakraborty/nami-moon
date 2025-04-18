import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  const categories = ["All", "Culinary News", "Behind the Scenes", "Chef's Special", "Events", "Reviews"]

  const blogPosts = [
    {
      id: 1,
      slug: "art-of-omakase",
      title: "The Art of Omakase: A Journey Through Japanese Culinary Tradition",
      excerpt:
        "Discover the meticulous preparation and cultural significance behind every course in traditional omakase dining.",
      category: "Culinary News",
      date: "February 15, 2024",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      slug: "meet-our-master-chef",
      title: "Meet Our Master Chef: The Creative Mind Behind Yuzu",
      excerpt: "An exclusive interview with our head chef, exploring his inspiration and vision for Yuzu Omakase.",
      category: "Behind the Scenes",
      date: "February 10, 2024",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      slug: "seasonal-specialties-spring-2024",
      title: "Seasonal Specialties: Spring Collection 2024",
      excerpt: "Introducing our new spring menu featuring the finest seasonal ingredients from Japan.",
      category: "Chef's Special",
      date: "February 5, 2024",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      slug: "valentines-day-special",
      title: "Valentine's Day Special Omakase Experience",
      excerpt: "Join us for an extraordinary Valentine's Day celebration with our exclusive couple's menu.",
      category: "Events",
      date: "February 1, 2024",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 5,
      slug: "sake-selection-guide",
      title: "The Perfect Pairing: Sake Selection Guide",
      excerpt: "Our sommelier's guide to choosing the perfect sake to complement your omakase experience.",
      category: "Culinary News",
      date: "January 28, 2024",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 6,
      slug: "customer-stories",
      title: "Customer Stories: Memorable Moments at Yuzu",
      excerpt: "Real stories from our guests about their unforgettable dining experiences at Yuzu Omakase.",
      category: "Reviews",
      date: "January 25, 2024",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-medium mb-12 text-center">BLOG</h1>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-900 rounded-lg overflow-hidden">
            <div className="relative h-[300px] md:h-full overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Featured blog post"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-8 space-y-4">
              <span className="inline-block px-3 py-1 bg-custom-red-600 text-white text-sm rounded-full">Featured</span>
              <Link href="/blog/year-of-excellence" className="block">
                <h2 className="text-2xl md:text-3xl font-medium hover:text-custom-red-400 transition-colors">
                  A Year of Excellence: Yuzu Omakase's Journey
                </h2>
              </Link>
              <p className="text-gray-300">
                Reflecting on our remarkable first year, the challenges we've overcome, and the unforgettable moments
                we've created for our valued guests.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">January 20, 2024</span>
                <Link
                  href="/blog/year-of-excellence"
                  className="text-custom-red-400 hover:text-custom-red-300 text-sm underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-gray-700 text-sm hover:bg-custom-red-600 hover:border-custom-red-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="group">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="space-y-3">
                <span className="text-sm text-custom-red-400">{post.category}</span>
                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="text-xl font-medium group-hover:text-custom-red-400 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-custom-red-400 hover:text-custom-red-300 text-sm underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="px-6 py-2 rounded-md border border-custom-red-600 text-custom-red-400 hover:bg-custom-red-600 hover:text-white transition-colors">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  )
}
