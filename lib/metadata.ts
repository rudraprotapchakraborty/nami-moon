import type { Metadata } from "next"

type MetadataProps = {
  title?: string
  description?: string
  path?: string
}

export function generateMetadata({ title, description, path = "" }: MetadataProps): Metadata {
  const siteName = "Nami Moon"
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const defaultDescription = "Experience the finest Pan-Asian cuisine in the heart of Dhaka at Nami Moon."
  const fullDescription = description || defaultDescription
  const url = `https://namimoon.com${path}`

  return {
    title: fullTitle,
    description: fullDescription,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://namimoon.com/og-image.jpg", // Replace with your actual OG image
          width: 1200,
          height: 630,
          alt: "Nami Moon Restaurant",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: ["https://namimoon.com/og-image.jpg"], // Replace with your actual OG image
    },
  }
}

