# Accredian Enterprise — Next.js Clone

A high-fidelity partial clone of [enterprise.accredian.com](https://enterprise.accredian.com/) built with **Next.js 14 (App Router)**, **Tailwind CSS**, and Next.js API Routes.

---

## 🚀 Live Demo

> **Vercel Deployment:** *(deploy via `vercel` CLI — see below)*

---

## 📦 Setup Instructions

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# 1. Clone or navigate to the project
cd accredian-enterprise

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npx vercel
```

---

## 🧱 Project Structure

```
accredian-enterprise/
├── app/
│   ├── layout.js              # Root layout — Inter font, SEO metadata
│   ├── page.js                # Home page — assembles all sections
│   ├── globals.css            # Design tokens, animations, global styles
│   └── api/
│       └── enquire/
│           └── route.js       # POST /api/enquire — lead capture endpoint
├── components/
│   ├── Navbar.jsx             # Sticky navbar with mobile hamburger
│   ├── Hero.jsx               # Hero with animated headline + image
│   ├── Stats.jsx              # Animated count-up metrics
│   ├── Partners.jsx           # Partner logo grid
│   ├── AccredianEdge.jsx      # 3-step process with connector
│   ├── DomainExpertise.jsx    # 7 domain cards
│   ├── CourseSegmentation.jsx # 4 training format cards
│   ├── WhoShouldJoin.jsx      # Blue glassmorphism cards
│   ├── CATFramework.jsx       # Overlapping circles + detail cards
│   ├── HowWeDeliver.jsx       # Alternating timeline steps
│   ├── FAQs.jsx               # Sidebar categories + accordion
│   ├── Testimonials.jsx       # Auto-rotating carousel
│   ├── CTABanner.jsx          # Blue gradient CTA section
│   ├── Footer.jsx             # Dark footer with links + socials
│   └── EnquireModal.jsx       # Lead capture form modal ⭐
├── data/
│   └── leads.json             # Auto-created on first form submit
└── public/
    └── hero.png               # AI-generated hero image
```

---

## 🎯 Approach Taken

### Research Phase
I visited the reference website and documented every section, color scheme, typography, layout, and interactive element before writing any code.

### Architecture Decisions
- **Next.js App Router** — Used server components where possible, `'use client'` only where needed (interactive components).
- **No external UI libraries** — All components built from scratch to demonstrate understanding and avoid template copying.
- **Intersection Observer API** — Used for scroll-triggered animations (no heavy animation libraries needed).
- **Global state** — Modal open/close state lifted to `page.js` and passed as props, keeping components clean.

### Design System
All design tokens (colors, spacing, typography) defined in `globals.css` as CSS custom properties, ensuring consistency and easy theming.

---

## 🤖 AI Usage Explanation

This project was built using **Antigravity (Google DeepMind)** as the primary AI development tool.

### Where AI Helped
| Area | AI Contribution |
|------|----------------|
| **Component scaffolding** | Generated boilerplate for all 14 components |
| **Design decisions** | Suggested glassmorphism, gradient backgrounds, scroll animations |
| **API route** | Structured the validation logic and file persistence pattern |
| **CSS animations** | Generated `@keyframes` for fadeUp, float, count-up effects |
| **SEO metadata** | Helped write meta descriptions and Open Graph tags |

### What I Manually Reviewed & Improved
- Verified all content matches the reference site (section order, text accuracy)
- Adjusted color palette to precisely match Accredian's blue (#1565C0)
- Fine-tuned responsive breakpoints for each component
- Ensured all interactive elements have unique, descriptive IDs for accessibility
- Reviewed API validation logic and error messages
- Added `'use client'` directives where needed for App Router compatibility
- **Architected complex UI logic**: Manually restructured the CSS Grid and Flexbox layouts (like the 'How We Deliver' timeline) when AI-generated code produced visual squashing and overlapping, ensuring pixel-perfect responsive alignment across all devices.

---

## ✨ Features Implemented

### Core
- [x] Full landing page (12+ sections)
- [x] Responsive navbar with smooth scroll navigation
- [x] Mobile hamburger menu with animated toggle
- [x] Hero section with animated reveal
- [x] Count-up statistics with IntersectionObserver
- [x] Partner logos grid
- [x] 3-step Accredian Edge process
- [x] 7 domain expertise cards with tags
- [x] 4-format course segmentation
- [x] Blue glassmorphism "Who Should Join" section
- [x] CAT Framework with visual Venn circles
- [x] Alternating timeline delivery steps
- [x] FAQ accordion with category sidebar
- [x] Auto-rotating testimonials carousel
- [x] CTA banner with trust statistics
- [x] Dark footer with social links

### Bonus ⭐
- [x] Enquire Now modal with lead capture form
- [x] `POST /api/enquire` — validates and stores to `data/leads.json`
- [x] `GET /api/enquire` — view all leads (for admin verification)
- [x] Success/error states in modal form
- [x] **Gemini AI Chatbot** — Floating learning advisor powered by `@google/generative-ai`
- [x] `POST /api/chat` — Secure server-side endpoint handling Gemini model context

---

## 🔧 Improvements With More Time

1. **Database integration** — Replace `leads.json` with Supabase or MongoDB for scalable lead storage
2. **Email notifications** — Send confirmation email to lead + notification to sales team via Resend/SendGrid
3. **Admin dashboard** — `/admin/leads` page to view and manage submitted enquiries
4. **Animations** — Add Framer Motion for more polished micro-interactions
5. **Dark mode** — Implement system-preference-aware dark mode
6. **CMS integration** — Connect testimonials, domain cards, and FAQs to a headless CMS (Sanity/Contentful) for easy content updates
7. **Analytics** — Add Google Analytics / Mixpanel event tracking on CTA clicks
8. **A/B testing** — Test different hero headlines for conversion rate optimization
9. **Multi-language support** — i18n for regional enterprise clients
10. **Performance audit** — Run Lighthouse audit and optimize images with `next/image` srcsets

---

## 📊 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 (App Router) | Framework |
| React 18 | UI library |
| Tailwind CSS | Utility styling |
| Google Fonts (Inter) | Typography |
| Next.js API Routes | Backend — lead capture |
| Node.js `fs` module | Local lead storage |
| Intersection Observer API | Scroll animations |
| Vercel | Deployment |

---

*Built as part of Accredian Enterprise assignment.*
