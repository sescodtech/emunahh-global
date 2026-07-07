import { NextRequest, NextResponse } from "next/server";
import { runSeed } from "@/lib/seed-runner";

// One-time seed endpoint for going live without a local terminal.
//
// Usage:
//   1. Set a SEED_SECRET env var in Vercel (any long random string).
//   2. After your first successful deploy, visit:
//        https://your-domain.com/api/admin/seed?secret=YOUR_SEED_SECRET
//      in the browser once. It seeds services, FAQs, careers, blog,
//      testimonials, core values, site settings and your admin login.
//   3. The seed script is safe to re-run (upserts, no duplicates), but
//      once you're happy with the data, remove SEED_SECRET from Vercel's
//      env vars (or just leave it — without the correct secret this
//      route always returns 401).
//
// This never runs automatically — it only fires when this exact route
// is hit with the correct secret, so it can't accidentally wipe or
// re-seed anything on a normal page visit or deploy.

export async function GET(request: NextRequest) {
  return handleSeed(request);
}

export async function POST(request: NextRequest) {
  return handleSeed(request);
}

async function handleSeed(request: NextRequest) {
  const expected = process.env.SEED_SECRET;

  if (!expected) {
    return NextResponse.json(
      { error: "SEED_SECRET is not set on this deployment. Add it in Vercel → Settings → Environment Variables, redeploy, then try again." },
      { status: 500 }
    );
  }

  const provided = request.nextUrl.searchParams.get("secret");

  if (!provided || provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await runSeed();
    return NextResponse.json({
      ok: true,
      message: "Database seeded successfully. Visit /admin/login with your SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD.",
    });
  } catch (error) {
    console.error("Seed via API failed:", error);
    return NextResponse.json(
      { error: "Seeding failed. Check the Vercel function logs for details.", detail: String(error) },
      { status: 500 }
    );
  }
}
