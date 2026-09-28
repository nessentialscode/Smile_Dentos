# Smile Dentos Family Dental Care — Technical Handover

## 1. Application Overview
Smile Dentos Family Dental Care is a modern, high-performance web application designed for a premier dental healthcare clinic serving Valanchery and Edayoor, Kerala. The platform provides:
- A responsive, animated public website showcasing clinic branches, specialist doctors, comprehensive dental services, patient testimonials (39 verified Google reviews), and clinic emergency information.
- An interactive appointment booking modal with dynamic branch status enforcement, doctor presence checks, clinic operating hour validation (Monday–Saturday clinic schedule enforcement), and defensive input validation.
- A secure, authenticated Staff & Administrator Operations Portal (`/admin`) allowing authorized clinic personnel to monitor patient bookings, manage doctor availability/presence, toggle clinic branch status, and initiate direct patient calls or WhatsApp consultations.

---

## 2. Technology Stack
- **Frontend Framework:** React 19 + TypeScript
- **Build Tool & Bundler:** Vite 8.3
- **Styling:** Modular CSS & Inline CSS Design Tokens with strict zero-Tailwind overhead
- **Animation & Micro-interactions:** Framer Motion 13 + Canvas Confetti
- **Icons:** Lucide React
- **Smooth Scrolling:** Lenis
- **Backend Datastore & Auth:** Supabase (PostgreSQL 15+, Supabase Auth, Row-Level Security)
- **Production Hosting & Edge Delivery:** Vercel (Edge Network + SPA rewrite)

---

## 3. Production Architecture
```
                        [ Patient Browser ]
                                 │
                     HTTPS / TLS Edge Delivery
                                 ▼
                     [ Vercel CDN (Static SPA) ]
                                 │
              ┌──────────────────┴──────────────────┐
              ▼                                     ▼
     Public Clinic Website                 Staff Portal (/admin)
  (Branch/Doctor/Service Views)            (Protected Operations)
              │                                     │
              ▼                                     ▼
     Appointment Booking                  Supabase Auth + Session
   (Anon Insert to Supabase)           (Role: admin Verification)
              │                                     │
              └──────────────────┬──────────────────┘
                                 │
                         Supabase REST API
                      (Publishable Anon Key)
                                 │
                                 ▼
                     [ PostgreSQL + RLS ]
        - public.appointments (Protected datastore)
        - public.branches     (Active status)
        - public.doctors      (Presence toggle)
        - public.services     (Service directory)
```

---

## 4. Supabase Configuration
The application connects to a managed Supabase project.
- **REST URL:** Configured via `NEXT_PUBLIC_SUPABASE_URL` or `VITE_SUPABASE_URL`.
- **Public Anon Key:** Configured via `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `VITE_SUPABASE_ANON_KEY`.
- **Client Implementation:** Singleton client located at `src/lib/supabase.ts`. Missing credentials fail safely without exposing dummy or hardcoded keys.
- **Security Boundary:** The client utilizes ONLY the public anon/publishable key. The service-role key is NEVER used or exposed in frontend code.

---

## 5. Vercel Configuration
The deployment configuration is defined in `vercel.json`:
- **SPA Rewrites:** All requests `/(.*)` redirect to `/index.html` to support client-side routing (`/admin`).
- **Security Headers:**
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 6. Admin Portal
- **Route:** Accessible via `/admin` or `#admin`.
- **Access Control:** Requires active Supabase user session matching designated email (`smiledentos@gmail.com`) AND role `user.app_metadata.role === 'admin'`.
- **Features:**
  - Real-time queue view of incoming patient appointments.
  - Quick action status transitions: `pending` &rarr; `confirmed` &rarr; `completed` / `cancelled`.
  - Doctor presence toggle (marks doctors present/absent for the day).
  - Branch availability toggle (marks clinics open/closed).
  - Search and filter by patient name, status, branch, doctor, and date.
  - Direct call (`tel:`) and WhatsApp launch with prefilled consultation context.

---

## 7. Appointment System
- **Previous Architecture:** Local browser storage (`localStorage` key `smile_dentos_admin_appointments`).
- **Production Architecture:** Authoritative Supabase database (`public.appointments`).
- **Data Flow:**
  1. Patient selects branch, doctor, date, time, and inputs name & phone.
  2. Input undergoes validation (name &le; 60 chars, 10–13 digit phone, Sunday clinic closed check, doctor presence verification, branch active verification).
  3. `createAppointment()` resolves branch and service names to UUIDs and writes directly to Supabase `public.appointments` table with `status: 'pending'`.
  4. Duplicate submission is prevented via submission locking (`isSubmitting` state).
  5. The Admin Portal retrieves appointments directly from Supabase (`getAdminAppointments()`) and persists status updates (`updateAppointmentStatus()`).
  6. All obsolete appointment `localStorage` persistence has been completely removed.

---

## 8. Authentication
- Managed entirely via Supabase Auth (`supabase.auth.signInWithPassword`).
- Enforces role-based access control (RBAC). Both the email address and `app_metadata.role === 'admin'` must match.
- Admin sessions expire automatically and can be terminated via the Sign Out button.
- No plain passwords or session tokens are stored in source code.

---

## 9. Security Measures
1. **Zero Hardcoded Secrets:** All Supabase URLs and keys are injected exclusively at build time through environment variables.
2. **Database-Level RLS:** Anonymous users cannot read, update, or delete appointment records.
3. **Double Submission Guard:** Appointment booking buttons lock while requests are pending.
4. **Error Log Suppression:** Production builds suppress raw PostgreSQL/PostgREST error messages to prevent data structure leakage.
5. **Git Hygiene:** `.env`, `.env.*`, and `*.local` are strictly ignored by `.gitignore`.

---

## 10. Environment Variables
The application requires the following environment variables:

| Variable Name | Purpose | Target Environments |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project API URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public Anon/Publishable API Key | Production, Preview, Development |

*(Note: In Vite, both `NEXT_PUBLIC_*` and `VITE_*` prefixes are supported via `envPrefix` in `vite.config.ts`.)*

---

## 11. Deployment Procedure
1. Push code changes to the primary repository branch (`main`).
2. Log into the **Vercel Dashboard**.
3. Under **Settings &rarr; Environment Variables**, verify that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are configured.
4. When variables are added or changed, trigger a **Redeploy** (Deployments &rarr; select deployment &rarr; Redeploy) because Vite injects variables at build time.

---

## 12. Database/RLS Requirements
For full database instructions, schema diagrams, and SQL migration scripts, refer to:
[SUPABASE_HANDOVER.md](file:///c:/Users/jasim/Web%20Project/Enterprises/Dental/Smile%20Dentos/docs/SUPABASE_HANDOVER.md)

Summary of policies:
- `public.appointments`: INSERT allowed for anon/authenticated; SELECT/UPDATE restricted to authenticated users with `app_metadata.role = 'admin'`.
- `public.branches`, `public.doctors`, `public.services`: SELECT allowed for all; UPDATE restricted to admin.

---

## 13. Domain Configuration
- Ensure the production domain (e.g. `smiledentos.com`) is assigned in **Vercel Project &rarr; Settings &rarr; Domains**.
- Configure DNS A / CNAME records according to Vercel's recommendations:
  - `A` record pointing `@` to `76.76.21.21`
  - `CNAME` record pointing `www` to `cname.vercel-dns.com`
- Verify SSL/TLS certificate auto-generation completes successfully on Vercel.

---

## 14. Backup & Maintenance Recommendations
1. **Supabase Backups:** Supabase automatically creates daily backups on Pro tiers. For standard plans, perform periodic manual database dumps via Supabase Dashboard &rarr; Database &rarr; Backups.
2. **Quarterly Dependency Review:** Periodically run `npm audit` to verify frontend libraries remain free from known security vulnerabilities.
3. **Audit Log Monitoring:** Periodically review Supabase Auth logs for abnormal login attempts.

---

## 15. Client-Owned Actions Summary
The following actions require client administrative privileges and must be performed by the client's internal team:

1. **Supabase Dashboard:**
   - Execute the SQL migration script from `docs/SUPABASE_HANDOVER.md` in the SQL Editor.
   - Verify `smiledentos@gmail.com` user exists in Authentication &rarr; Users.
   - Assign `{"role": "admin"}` to the user's `raw_app_meta_data`.
2. **Vercel Dashboard:**
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Environment Variables.
   - Trigger a project Redeployment.
   - Ensure the custom domain DNS is pointed and active.
3. **Clinic Operations:**
   - Ensure clinic staff know how to access `/admin` and log in with the administrator account.
