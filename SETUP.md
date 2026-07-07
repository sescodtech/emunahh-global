# Emunahh Global — Going Live: Setup Guide

This covers the 4 rebuilt pages, the new admin login, and getting your
database live and seeded. These are **new/changed files only** — drop
them into your existing project at the same paths (a few admin pages
moved into a `(dashboard)` folder — see step 0).

## 0. Where each file goes

Everything mirrors your project structure exactly:
- `app/admin/(dashboard)/layout.tsx` replaces your old `app/admin/layout.tsx`
  — **move** your existing `app/admin/{blog,careers,enquiries,faqs,services,settings,testimonials}/`
  folders and `app/admin/page.tsx` into a new `app/admin/(dashboard)/` folder
  too (same names, just nested one level deeper). This keeps the login
  page from being auth-protected while everything else stays guarded.
- Everything else drops in at the path shown.

## 1. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project (free tier is fine to start)
2. Once created: **Project Settings → Database → Connection string**
3. Copy the **Transaction pooler** string (port `6543`) → this is your `DATABASE_URL`
4. Copy the **Session pooler** or direct connection (port `5432`) → this is your `DIRECT_URL`
5. Replace `[YOUR-PASSWORD]` in both with your actual database password

## 2. Set your environment variables

Copy `.env.example` to `.env` and fill in:
- `DATABASE_URL` / `DIRECT_URL` — from step 1
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000` locally, your real domain in production
- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — your first admin login (change the password from the app later if you want)

## 3. Install, migrate, seed

```bash
npm install
npx prisma migrate dev --name init
npm run db:seed
```

`migrate dev` creates every table from `prisma/schema.prisma` in your
new Supabase database. `db:seed` fills it with your real content —
services, FAQs, careers, blog post, testimonials, core values, and
your admin login. The seed is safe to re-run; it won't duplicate rows.

## 4. Try it locally

```bash
npm run dev
```

Visit `/admin/login` and sign in with `SEED_ADMIN_EMAIL` /
`SEED_ADMIN_PASSWORD`. Anyone without a valid login is now redirected
away from every `/admin` page — that closes the security gap your
README flagged.

Visit `/faq`, `/blog`, `/careers`, `/privacy-policy` — these now read
live from the database (with automatic fallback to the static content
if the DB is ever unreachable, so the site never goes blank).

Submit the contact form on `/contact-us` — it now creates a real
`Enquiry` row in your database with a proper sequential reference
number, instead of faking one in the browser.

## 5. Deploy to Vercel

1. Push this updated code to GitHub
2. In Vercel → your project → **Settings → Environment Variables**, add
   the same variables from your `.env` (yes, including
   `SEED_ADMIN_EMAIL`/`PASSWORD` if you plan to re-seed from CI, otherwise you can omit them there)
3. Deploy
4. Run the migration + seed **once** against production, either via
   `npx prisma migrate deploy` from your machine (pointed at the
   production `DATABASE_URL`) or via a one-off Vercel deployment hook

## What's now live vs. still on the roadmap

**Now wired to the database:** FAQs, Blog, Careers, Enquiries (contact
form submissions), Site Settings (used by Privacy Policy), and admin
authentication.

**Still reading static content (by design, for this pass):** Home,
Service, About, Contact page copy — these were already at your target
quality per the README, so they weren't touched. The admin dashboard
pages for Services/Testimonials/Site Settings still edit in-memory
demo data rather than writing to Postgres — wiring those admin forms
to Prisma (so edits persist) is the natural next phase once you've
confirmed the seeded data looks right.

## Security notes

- `/admin` is now closed to anyone without a valid login (NextAuth
  credentials + middleware guard + a server-side check in the layout
  as a second line of defense).
- Passwords are hashed with bcrypt (12 rounds) — never stored in plain text.
- The enquiry API validates every field server-side, includes a
  honeypot field against basic bots, and rate-limits to 5 submissions
  per IP per 10 minutes.
- `NEXTAUTH_SECRET` must be a real random value in production — never
  reuse the example placeholder.
