// Thin CLI wrapper — the actual seed logic lives in lib/seed-runner.ts so it
// can be shared between `npm run db:seed` (this file) and the one-time
// `/api/admin/seed` HTTP endpoint used for seeding straight from a live
// deployment without a local terminal.
//
// Run with:  npm run db:seed
// (requires DATABASE_URL / DIRECT_URL to already be set in .env)

import { prisma } from "@/lib/prisma";
import { runSeed } from "@/lib/seed-runner";

runSeed()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
