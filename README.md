# NECKT — Next.js & TypeScript

NECKT is a live entertainment, concert curation, and event production brand originating from Patna, Bihar and operating across India.

This project is built with **Next.js (App Router)** and **TypeScript (`.tsx`)**.

---

## ⚡ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (`.tsx` / `.ts`)
- **Runtime & UI**: React 19, Lucide React
- **Styling**: Cinematic Design System (Pure CSS with CSS variables, glassmorphism, responsive grid)
- **Linter**: Oxlint (High-speed Rust linter with React rules)

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages and metadata
│   ├── about/page.tsx    # /about
│   ├── contact/page.tsx  # /contact
│   ├── events/page.tsx   # /events
│   ├── moments/page.tsx  # /moments
│   ├── services/page.tsx # /services
│   ├── layout.tsx        # Root layout, ambient lighting, header, footer
│   ├── not-found.tsx     # Custom 404 page
│   ├── page.tsx          # Homepage
│   ├── robots.ts         # Dynamic robots.txt
│   └── sitemap.ts        # Dynamic sitemap.xml
├── assets/               # Event banners, archive photos, and posters
├── components/           # Reusable TSX UI components
│   ├── AboutNeckt.tsx
│   ├── AudienceSection.tsx
│   ├── BackgroundLighting.tsx
│   ├── BrandLogo.tsx
│   ├── ContactSection.tsx
│   ├── EventGallery.tsx
│   ├── FeaturedExperiences.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── HomeEventFeature.tsx
│   ├── HomeSummary.tsx
│   ├── Navbar.tsx
│   ├── NotFoundPage.tsx
│   ├── PageIntro.tsx
│   └── UpcomingEvents.tsx
├── data/                 # Typed data modules
│   ├── eventsData.ts
│   ├── experiencesData.ts
│   └── galleryData.ts
├── lib/                  # Utilities (Schema.org JSON-LD generation)
│   └── seo.ts
├── types/                # TypeScript type definitions and interfaces
│   ├── assets.d.ts
│   └── index.ts
└── index.css             # Unified cinematic design system
```

---

## 🚀 Getting Started

### Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

---

## 🌐 SEO & Deployment

- Dynamic metadata and Open Graph / Twitter cards are configured per page in `src/app/**/page.tsx`.
- Schema.org structured data (Organization, WebSite, WebPage, BreadcrumbList, Service) is generated via `src/lib/seo.ts`.
- Set `NEXT_PUBLIC_SITE_URL` to override the default canonical origin (`https://neckt.in`) in custom deployment environments.
