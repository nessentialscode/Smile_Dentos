# Smile Dentos — Family Dental Clinic Web Platform

A high-performance, modern web application and clinic management portal for **Smile Dentos Family Dental Clinic** (operating in Valanchery and Edayoor, Kerala).

Built with React 19, TypeScript, Vite 8, Framer Motion, and Supabase.

---

## 🌟 Key Features

- **Clinic Showcase & Services**: Interactive service accordion, 39 Google reviews slider, before-and-after transformation details, and interactive branch showcases with photo galleries.
- **Specialist Team Directory**: Real-time doctor profiles, experience credentials, and live availability indicators (Present/Absent).
- **Online Appointment Booking**:
  - Live validation: Working days (Mon–Sat), Sunday clinic closure, branch status, and doctor presence.
  - Supabase integration with instantaneous scheduling.
- **Admin Operations Portal (`/admin` or `#admin`)**:
  - Secure email/password authentication via Supabase Auth with role-based authorization (`role: 'admin'`).
  - Real-time appointment management (filter by status, branch, doctor, or date).
  - Doctor presence toggle (Present / Absent).
  - Branch operational status toggle (Open / Closed).
  - Direct WhatsApp messaging with prefilled patient confirmation and reminder templates.
- **Performance & UX**:
  - Lenis smooth inertia scrolling.
  - 100% responsive for mobile, tablet, and ultra-wide screens.
  - Zero-warning codebase with strict TypeScript and Oxlint.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework & Core** | React 19, React DOM 19, TypeScript |
| **Bundler & Tooling** | Vite 8, Oxlint |
| **Styling & Animation** | Vanilla CSS Design Tokens, Framer Motion |
| **Database & Auth** | Supabase JS Client (`@supabase/supabase-js`) |
| **Icons & Effects** | Lucide React, Canvas Confetti |
| **Smooth Scroll** | Lenis Scroll Engine |

---

## 📂 Project Structure

```
├── docs/                     # Technical documentation & Supabase setup guides
│   ├── CLIENT_HANDOVER.md
│   └── SUPABASE_HANDOVER.md
├── public/
│   ├── images/               # Clinic, doctor, and service assets
│   ├── favicon.svg           # Brand favicons & PWA icons
│   ├── robots.txt            # Search engine directives
│   └── sitemap.xml           # XML sitemap
├── src/
│   ├── components/           # UI Sections & Modal components
│   │   ├── AdminLoginPage.tsx
│   │   ├── AdminPortal.tsx
│   │   ├── AppointmentModal.tsx
│   │   ├── BranchesSection.tsx
│   │   ├── FooterSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── RotatingBadge.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── SpecialistsSection.tsx
│   │   ├── TransformSection.tsx
│   │   └── WhatsAppIcon.tsx
│   ├── lib/
│   │   └── supabase.ts       # Supabase client singleton & configuration
│   ├── services/
│   │   ├── authService.ts    # Admin authentication & session management
│   │   └── supabaseService.ts# Database queries & mutation methods
│   ├── utils/
│   │   └── smoothScroll.ts   # Lenis smooth scroll engine
│   ├── App.tsx               # Root application router & state coordinator
│   ├── index.css             # Design tokens, variables & typography
│   └── main.tsx              # Application entry point
├── .env.example              # Template environment variables
├── package.json
├── tsconfig.json
├── vercel.json               # Security headers & SPA rewrites
└── vite.config.ts            # Vite configuration & Rollup chunking
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 2. Installation
```bash
git clone <repository-url>
cd "Smile Dentos"
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local` and add your Supabase credentials:

```bash
cp .env.example .env.local
```

Populate the variables:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-or-publishable-key
```

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔒 Admin Portal Access

1. Navigate to `http://localhost:5173/admin` or `#admin`.
2. Sign in using the authorized administrator account (`smiledentos@gmail.com`).
3. For credentials setup and database schema, refer to [`docs/SUPABASE_HANDOVER.md`](docs/SUPABASE_HANDOVER.md).

---

## 📦 Production Build & Quality Verification

```bash
# Lint check
npm run lint

# TypeScript verification & production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License
Private and proprietary. All rights reserved by **Smile Dentos Family Dental Clinic**.
