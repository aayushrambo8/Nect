# NECKT — Main Branch Page & Endpoint Directory

This document details all routes, endpoints, components, and interactive features available on the `main` branch of NECKT (`https://neckt.in`).

---

## 🌐 Public Route Matrix

| Route Endpoint | Next.js App Router File | Title / Canonical Scope | Primary Purpose |
| :--- | :--- | :--- | :--- |
| **`/`** | `src/app/page.tsx` | `NECKT \| Live Experiences That Move People` | Main landing experience, hero video banner, flagship event spotlight, and brand ethos. |
| **`/events`** | `src/app/events/page.tsx` | `Upcoming Events \| NECKT Live Entertainment` | Interactive schedule of upcoming concerts, arena parties, ticket statuses, and venue guides. |
| **`/services`** | `src/app/services/page.tsx` | `Services \| NECKT Experiences and Event Production` | Showcase of NECKT's 4 core verticals: Parties, Concerts, Corporate Gatherings, and Artist Bookings. |
| **`/about`** | `src/app/about/page.tsx` | `About NECKT \| Live Entertainment Across India` | Company origin story (Patna to Pan-India), curatorial mission, and audience footfall statistics. |
| **`/moments`** | `src/app/moments/page.tsx` | `Moments \| NECKT Visual Archive` | High-definition photo and video archive capturing live stagecraft, lighting rigs, and crowd energy. |
| **`/contact`** | `src/app/contact/page.tsx` | `Contact NECKT \| Plan a Live Experience` | Inquiries for live bookings, sponsorships, artist booking coordination, and direct email/phone channels. |

---

## 🛠️ System & SEO Endpoints

| Endpoint | File Location | Format / Type | Purpose & Details |
| :--- | :--- | :--- | :--- |
| **`/robots.txt`** | `src/app/robots.ts` | Plaintext / Dynamic | Directs search engine web crawlers, allows universal indexing, and links to the canonical XML sitemap. |
| **`/sitemap.xml`** | `src/app/sitemap.ts` | XML / Dynamic Sitemap | Enumerates all core static canonical URLs, last modified timestamps, and search priority weights (`1.0` for home, `0.8` for inner pages). |
| **`404 Handler`** | `src/app/not-found.tsx` | Custom UI Component | High-fashion cinematic error screen with a return-to-home CTA when an invalid route is visited. |

---

## 📄 Detailed Breakdown by Page

### 1. Homepage (`/`)
- **Route File**: `src/app/page.tsx`
- **Key Components**:
  - `Hero.tsx`: Full-bleed cinematic hero background with overlay vignette, luxury typography, ambient audio toggle, and scroll indicator.
  - `HomeEventFeature.tsx`: Highlights the nearest upcoming flagship edition (e.g., *AFTER DARK // EDITION 01*) with date, venue, category, and direct ticket links.
  - `HomeSummary.tsx`: Three-point value proposition covering curation, production standards, and cultural resonance.
- **Data Dependency**: `src/data/eventsData.ts`
- **Structured Data**: Organization & WebSite JSON-LD (`src/lib/seo.ts`).

---

### 2. Events & Ticketing (`/events`)
- **Route File**: `src/app/events/page.tsx`
- **Key Components**:
  - `PageIntro.tsx`: Standardized ambient page hero with synchronized typography and background video.
  - `UpcomingEvents.tsx`: Dynamic event card grid.
- **Features & Interactions**:
  - Event tags (`ARENA CONCERT`, `ROOFTOP`, `NIGHTLIFE`).
  - Price & status chips (`TICKETS LIVE`, `INVITE ONLY`, `SOLD OUT`).
  - Expandable disclosures (`+` / `−`) for Event Schedule, Entry Criteria, Terms & Conditions, and Venue FAQs.
  - External ticket purchase links.
- **Data Dependency**: `UPCOMING_EVENTS` in `src/data/eventsData.ts`.

---

### 3. Services & Production Verticals (`/services`)
- **Route File**: `src/app/services/page.tsx`
- **Key Components**:
  - `PageIntro.tsx`
  - `FeaturedExperiences.tsx`
- **Features & Verticals**:
  - **Vertical 01 — PARTIES**: End-to-end nightlife and social events with premium staging and lighting.
  - **Vertical 02 — CONCERTS & LIVE SHOWS**: Large-format arena concerts, artist management, and FOH acoustic engineering.
  - **Vertical 03 — CORPORATE EVENTS**: Design-led corporate galas, brand activations, and summit production.
  - **Vertical 04 — ARTIST BOOKINGS**: Talent curation and tour routing across India.
- **Data Dependency**: `FEATURED_EXPERIENCES` in `src/data/experiencesData.ts`.

---

### 4. About NECKT (`/about`)
- **Route File**: `src/app/about/page.tsx`
- **Key Components**:
  - `PageIntro.tsx`
  - `AboutNeckt.tsx`: Origin narrative from Patna, Bihar to nationwide concert production.
  - `AudienceSection.tsx`: Footfall statistics (50,000+ attendees), attendee demographics, and experiential metrics.

---

### 5. Moments Archive (`/moments`)
- **Route File**: `src/app/moments/page.tsx`
- **Key Components**:
  - `PageIntro.tsx`
  - `EventGallery.tsx`: Masonry image gallery showcasing stage production, laser sync, crowd reactions, and behind-the-scenes captures.
- **Features**:
  - Responsive grid supporting tall, wide, and square image ratios.
  - Scrim overlays displaying event title, location, and capture details on hover.
- **Data Dependency**: `GALLERY_MOMENTS` in `src/data/galleryData.ts`.

---

### 6. Contact & Bookings (`/contact`)
- **Route File**: `src/app/contact/page.tsx`
- **Key Components**:
  - `PageIntro.tsx`
  - `ContactSection.tsx`
- **Features & Contact Endpoints**:
  - Direct inquiry email: [`hello@neckt.in`](mailto:hello@neckt.in)
  - Operating Base: Patna, Bihar & Pan-India
  - Social Channels: Instagram ([`@neckt.in`](https://instagram.com/neckt.in))
  - Guidance for event bookings, corporate partnerships, and press inquiries.

---

## 🎨 Shared Global Components Across All Pages

- **`Navbar.tsx`**: Fixed top frosted glass navigation bar with brand logo, active page indicator, desktop CTA (`Explore Events`), and full-screen mobile slide-out drawer.
- **`Footer.tsx`**: Multi-column footer containing quick links, contact channels, city listings, copyright, and developer credits.
- **`BackgroundLighting.tsx`**: Floating radial gradient orbs (`#6B147D` purple and warm ambient streaks) providing atmospheric depth across all routes.
