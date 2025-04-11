import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

// This is a mock function to simulate fetching blog post data
// In a real application, you would fetch this data from an API or database
function getBlogPost(slug: string) {
  console.log(`Fetching blog post for slug: ${slug}`) // Add logging
  const blogPosts = [
    {
      slug: "year-of-excellence",
      title: "A Year of Excellence: Yuzu Omakase's Journey",
      excerpt:
        "Reflecting on our remarkable first year, the challenges we've overcome, and the unforgettable moments we've created for our valued guests.",
      content: `
        <p>As we celebrate the first anniversary of Yuzu Omakase, we can't help but feel a profound sense of gratitude and accomplishment. What began as a dream to revolutionize the omakase experience in our city has blossomed into a culinary destination that has exceeded our wildest expectations.</p>
        
        <h2>Our Humble Beginnings</h2>
        <p>When we first opened our doors, we were driven by a passion for Japanese cuisine and a vision to create something truly unique. Our team, led by Master Chef Hiroshi Tanaka, set out to craft an omakase experience that would not only tantalize taste buds but also tell a story with every dish.</p>
        
        <h2>Overcoming Challenges</h2>
        <p>The path to excellence was not without its hurdles. From sourcing the finest ingredients to perfecting our techniques, every day presented new challenges. But it was these very challenges that pushed us to innovate and elevate our craft.</p>
        
        <h2>Memorable Moments</h2>
        <p>Throughout the year, we've had the pleasure of serving thousands of guests, each experience unique and special. From intimate date nights to grand celebrations, Yuzu Omakase has been the backdrop for countless memorable moments.</p>
        
        <h2>Looking Ahead</h2>
        <p>As we look to the future, we're filled with excitement for what's to come. We're committed to continuing our journey of culinary excellence, always striving to surprise and delight our guests with new flavors and experiences.</p>
        
        <p>To all our patrons, staff, and supporters – thank you for being part of our story. Here's to many more years of exceptional dining at Yuzu Omakase!</p>
      `,
      image: "/placeholder.svg?height=600&width=1200",
      date: "January 20, 2024",
      author: "Yuzu Omakase Team",
      authorImage: "/placeholder.svg?height=100&width=100",
    },
    // Add more blog posts here...
  ]

  const post = blogPosts.find((post) => post.slug === slug)
  console.log(`Post found: ${post ? "Yes" : "No"}`) // Add logging
  return post
}

// Mock function to get related articles
function getRelatedArticles(currentSlug: string) {
  const allArticles = [
    {
      slug: "seasonal-ingredients-spring",
      title: "Seasonal Ingredients: Spring Edition",
      excerpt: "Explore the vibrant flavors of spring in Japanese cuisine.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      slug: "sushi-etiquette",
      title: "The Do's and Don'ts of Sushi Etiquette",
      excerpt: "Learn the proper way to enjoy sushi and impress your dining companions.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      slug: "sake-pairing-guide",
      title: "A Beginner's Guide to Sake Pairing",
      excerpt: "Discover how to pair sake with different types of Japanese dishes.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return allArticles.filter((article) => article.slug !== currentSlug)
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    console.log(`Post not found for slug: ${params.slug}`) // Add logging
    notFound()
  }

  const relatedArticles = getRelatedArticles(params.slug)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/blog" className="inline-flex items-center text-custom-red-400 hover:text-custom-red-300 mb-8">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
        <h1 className="text-4xl md:text-5xl font-medium mb-6">{post.title}</h1>
        <div className="flex items-center mb-8">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
          </div>
          <div>
            <p className="font-medium">{post.author}</p>
            <p className="text-sm text-gray-400">{post.date}</p>
          </div>
        </div>
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>
        <div className="prose prose-invert max-w-none mb-16">
          <p className="text-xl mb-8 text-gray-300">{post.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Related Articles Section */}
        <div className="border-t border-gray-800 pt-16">
          <h2 className="text-3xl font-medium mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
                <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:text-custom-red-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-medium mb-4">Experience Omakase at Yuzu</h3>
          <p className="text-gray-300 mb-6">
            Ready to embark on your own culinary journey? Book your omakase experience today.
          </p>
          <Button className="bg-custom-red-600 hover:bg-custom-red-700 text-white">Book Now</Button>
        </div>
      </div>
    </div>
  )
}

