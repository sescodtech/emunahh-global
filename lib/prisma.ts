import { PrismaClient } from "@prisma/client";

// Standard Next.js Prisma singleton pattern — prevents exhausting your
// Postgres connection limit from hot-reload creating a new client on
// every file save in dev. In production (Vercel serverless) each
// invocation gets its own instance anyway, which is expected.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
