import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Image
            src="/placeholder.svg?height=40&width=160"
            alt="Yuzu Omakase"
            width={160}
            height={40}
            className="h-10 w-auto"
          />
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#" className="hover:text-amber-300">
              HOME
            </a>
            <a href="#" className="hover:text-amber-300">
              COURSES
            </a>
            <a href="#" className="hover:text-amber-300">
              BLOG
            </a>
            <a href="#" className="hover:text-amber-300">
              GALLERIES
            </a>
            <a href="#" className="hover:text-amber-300">
              ABOUT US
            </a>
            <a href="#" className="hover:text-amber-300">
              CONTACT US
            </a>
            <Button className="bg-amber-700 hover:bg-amber-600 text-white">BOOK NOW</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-serif text-center max-w-3xl leading-tight">
            Revolutionizing Omakase with a Modern Culinary Twist
          </h1>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Culinary creation"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-serif">No. 1</h2>
              <p className="text-2xl font-serif">in Thailand's 50 Top Restaurants & Hotels Brand 2022</p>
              <p className="text-amber-300">
                Yuzu Omakase ranked the 1st in "The Best of Fine-dining/Chef Table Omakase Brand" Category in 2022
                voting from Hungry Hub.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-black/90">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif">Our Team</h2>
            <p className="text-gray-300">
              Yuzu Omakase is an experimental space and creative playground for YG30 GROUP Thailand's full conglomerate,
              which is formed by a passionate group of food connoisseurs with a singular vision to revolutionize the
              fine dining scene in Bangkok.
            </p>
            <div className="flex gap-4 text-amber-300">
              <span>01</span>
              <span className="border-t border-amber-300 flex-grow mt-3"></span>
              <span>05</span>
            </div>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Chef presenting a dish"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12">OUR COURSES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((course, i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg">
                <div className="aspect-[4/3] relative">
                  <Image src="/placeholder.svg?height=300&width=400" alt={course.name} fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-lg font-medium">{course.name}</h3>
                  <p className="text-amber-300">{course.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Image
              src="/placeholder.svg?height=40&width=160"
              alt="Yuzu Omakase"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
            <div className="flex gap-8 text-sm">
              <a href="#" className="hover:text-amber-300">
                HOME
              </a>
              <a href="#" className="hover:text-amber-300">
                COURSES
              </a>
              <a href="#" className="hover:text-amber-300">
                BLOG
              </a>
              <a href="#" className="hover:text-amber-300">
                GALLERIES
              </a>
              <a href="#" className="hover:text-amber-300">
                ABOUT US
              </a>
              <a href="#" className="hover:text-amber-300">
                CONTACT US
              </a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-amber-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-amber-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-amber-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="text-center text-sm text-gray-400 mt-8">Copyright © 2024 YUZU GROUP. All Right Reserved.</div>
        </div>
      </footer>
    </div>
  )
}

const courses = [
  { name: "THE SYMPHONY (20000)", price: "20,000 ฿฿" },
  { name: "THE EXPERIENCE (15000)", price: "15,000 ฿฿" },
  { name: "OMAKASE COURSE", price: "9,500 ฿฿" },
  { name: "OMAKASE COURSE", price: "7,500 ฿฿" },
  { name: "OMAKASE COURSE", price: "5,500 ฿฿" },
  { name: "VALENTINE'S DAY 16/02/2024", price: "20,000 ฿฿" },
  { name: "OMAKASE COURSE (Lunch)", price: "3,500 ฿฿" },
]

