// Central place every public page uses to read content that's meant to
// be editable from the Admin Dashboard (FAQs, Blog, Careers, Site
// Settings). Each function tries the database first; if DATABASE_URL
// isn't set yet, or the query fails for any reason (DB not seeded,
// connection hiccup, etc.), it falls back to the static content in
// /data so the site never breaks — it just serves the last-known-good
// copy until the database is seeded and reachable.

import { prisma } from "@/lib/prisma";
import { faqs as faqsFallback } from "@/data/contact-content";
import { jobOpenings as jobsFallback, type JobOpening } from "@/data/careers-content";
import { blogPosts as blogFallback, type BlogPost } from "@/data/blog-content";
import { siteSettings as siteSettingsFallback } from "@/data/home-content";

const hasDb = Boolean(process.env.DATABASE_URL);

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type BlogPostView = BlogPost & { coverImageUrl: string | null };

export async function getFaqs(): Promise<FaqItem[]> {
  if (hasDb) {
    try {
      const rows = await prisma.faq.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      });
      if (rows.length) {
        return rows.map((r: { id: string; question: string; answer: string }) => ({
          id: r.id,
          question: r.question,
          answer: r.answer,
        }));
      }
    } catch {
      // fall through to static content below
    }
  }
  return faqsFallback;
}

export async function getJobOpenings(): Promise<JobOpening[]> {
  if (hasDb) {
    try {
      const rows = await prisma.jobPosting.findMany({
        where: { isActive: true },
        orderBy: { postedAt: "desc" },
      });
      if (rows.length) {
        return rows.map(
          (r: {
            id: string;
            title: string;
            department: string;
            location: string;
            type: string;
            summary: string;
            responsibilities: string[];
            requirements: string[];
            isActive: boolean;
            postedAt: Date;
          }): JobOpening => ({
            id: r.id,
            title: r.title,
            department: r.department,
            location: r.location,
            type:
              r.type === "FULL_TIME" ? "Full-time" : r.type === "PART_TIME" ? "Part-time" : "Contract",
            summary: r.summary,
            responsibilities: r.responsibilities,
            requirements: r.requirements,
            isActive: r.isActive,
            postedAt: r.postedAt.toISOString(),
          })
        );
      }
    } catch {
      // fall through
    }
  }
  return jobsFallback;
}

export async function getBlogPosts(): Promise<BlogPostView[]> {
  if (hasDb) {
    try {
      const rows = await prisma.blogPost.findMany({
        where: { isActive: true },
        orderBy: { publishedAt: "desc" },
        include: { coverImage: true },
      });
      if (rows.length) {
        return rows.map(
          (r: {
            id: string;
            slug: string;
            title: string;
            excerpt: string;
            content: string;
            tags: string[];
            isActive: boolean;
            publishedAt: Date;
            coverImage: { url: string } | null;
          }): BlogPostView => ({
            id: r.id,
            slug: r.slug,
            title: r.title,
            excerpt: r.excerpt,
            content: r.content,
            coverEmoji: "✈️",
            coverImageUrl: r.coverImage?.url ?? null,
            author: "Emunahh Global Team",
            publishedAt: r.publishedAt.toISOString(),
            tags: r.tags,
            isActive: r.isActive,
          })
        );
      }
    } catch {
      // fall through
    }
  }
  return blogFallback.map((p) => ({ ...p, coverImageUrl: null }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostView | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug && p.isActive) ?? null;
}

export async function getSiteSettings() {
  if (hasDb) {
    try {
      const row = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
      if (row) return row;
    } catch {
      // fall through
    }
  }
  return siteSettingsFallback;
}
