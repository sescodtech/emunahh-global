# Emunahh Global Consult V2.0

I've verified this project **actually builds successfully** with `npm install` +
`npx next build` — no errors, all 5 pages compile.

## What this is (and isn't) right now

**Included:** all public pages (Home, Service, About, Contact, Privacy Policy),
a working **Admin Dashboard** at `/admin` (Dashboard overview, Services,
Testimonials, FAQs, Enquiries, Site Settings), all reusable components, design
tokens, and the Prisma schema at `prisma/schema.prisma`.

**Not yet wired up:** the database (Prisma schema exists but isn't connected
to a real Postgres instance yet), NextAuth login (so `/admin` is currently
open to anyone who knows the URL — do not deploy publicly until this is
locked down), and Cloudinary uploads. The admin pages and the Contact form
currently edit in-memory demo data instead of a real database — that's the
next phase.

**Verified:** I actually ran `npm install` + `npm run build` on this exact
project before handing it to you. All 12 routes compile with zero errors.

---

## 1. Run it on your computer

You need **Node.js 18.18 or newer** installed (check with `node -v`).

```bash
# unzip / open the folder you downloaded, then:
cd emunahh-v2-components
npm install
npm run dev
```

Open **http://localhost:3000** in your browser. Ctrl+C in the terminal stops it.

If `npm install` fails with a symlink/permission error, delete `node_modules`
and `package-lock.json` and try again — this usually only happens on unusual
filesystems (like the one I tested in), not on a normal Mac/Windows/Linux setup.

## 2. Push to GitHub

```bash
cd emunahh-v2-components
git init
git add .
git commit -m "Emunahh V2.0 - initial pages and components"
```

Then on github.com: create a new empty repository (don't initialize it with a
README), copy the two commands GitHub shows you under "…or push an existing
repository from the command line", and run them — they'll look like:

```bash
git remote add origin https://github.com/YOUR_USERNAME/emunahh-v2.git
git branch -M main
git push -u origin main
```

## 3. Deploy to Vercel

1. Go to vercel.com and sign in (GitHub login is easiest)
2. Click **Add New → Project**
3. Select the `emunahh-v2` repo you just pushed
4. Vercel auto-detects Next.js — leave the default settings
5. Click **Deploy**

That's it — you'll get a live `.vercel.app` URL in about a minute. You can
later attach your real domain (emunahh.com) under Project → Settings → Domains.

## 4. One thing to know about fonts

`General Sans` (the body font) isn't a free Google Font, so right now it falls
back to your system's default sans-serif. Before final launch, either:
- swap it for a similar free Google Font (e.g. "Plus Jakarta Sans"), or
- buy/self-host the real General Sans font files

This doesn't block deployment — the site works fine either way, it's a
polish item.

## Folder guide
```
app/              → the actual pages (routes)
components/       → reusable UI pieces (Button, Navbar, cards, etc.)
data/              → real site copy, structured as placeholder data
                     (this gets replaced by database calls once the
                     Admin Dashboard is built)
lib/               → small helper functions
tailwind.config.ts → design system colors/fonts
```
