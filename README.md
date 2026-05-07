# Nami Moon

Restaurant website for **Nami Moon**, a Pan-Asian fine dining restaurant in Dhaka, Bangladesh. Built with Next.js and designed to showcase the menu, handle table reservations, and engage customers through galleries and a blog.

## Features

- Table reservation system with date/time picker
- Dynamic menu with category filtering and search
- Contact form and newsletter subscription with email delivery
- Image gallery with lightbox modal
- Blog with categorized posts and individual article pages
- Animated UI with Framer Motion
- Google reCAPTCHA on forms
- Fully responsive across mobile, tablet, and desktop

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI, Lucide React, React Icons
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Email:** EmailJS (booking/newsletter), Nodemailer via Zoho SMTP (contact form)
- **Deployment:** Vercel

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, menu preview, team, awards |
| `/menu` | Full menu with category filters and search |
| `/booking` | Table reservation form |
| `/contact` | Contact form with location and hours |
| `/galleries` | Photo gallery with modal viewer |
| `/blog` | Blog listing and individual posts |
| `/about` | Restaurant info |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <repo-url>
cd nami-moon
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# EmailJS — booking and newsletter forms
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=

NEXT_PUBLIC_EMAILJS_SERVICE_ID_2=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_2=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY_2=

# Zoho SMTP — contact form
ZOHO_EMAIL=
ZOHO_PASSWORD=
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── (pages)/
│   ├── menu/
│   ├── booking/
│   ├── contact/
│   ├── galleries/
│   ├── blog/
│   └── about/
├── api/          # API routes (contact form email handler)
├── components/   # Shared UI components
├── data/         # Menu items, blog posts (JSON)
└── globals.css   # Tailwind config and global styles
```

## Deployment

The project is configured for Vercel. Push to your connected branch to trigger a deploy. Make sure all environment variables are set in the Vercel project settings.
