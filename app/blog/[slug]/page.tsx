import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Emunahh Global Consult`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPostBySlug(slug), getBlogPosts()]);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");
  const related = allPosts.filter((p) => p.isActive && p.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "Emunahh Global Consult" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="bg-ink-navy pb-14 pt-20">
        <Container className="max-w-3xl">
          <Link href="/blog" className="font-mono text-xs text-stamp-gold hover:underline">
            ← Back to Blog
          </Link>
          <span className="mt-6 block text-4xl">{post.coverEmoji}</span>
          <h1 className="mt-3 font-sans font-extrabold tracking-tight text-3xl leading-tight text-boarding-paper sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 font-mono text-xs text-boarding-paper/60">
            {post.author} · {formatDate(post.publishedAt)} · {readingTime(post.content)} min read
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-boarding-paper/10 px-3 py-1 font-mono text-xs text-boarding-paper/80"
              >
                {t}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="max-w-3xl">
          <article className="space-y-5 text-[0.95rem] leading-relaxed text-slate">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>

          <div className="mt-12 rounded-2xl bg-boarding-paper p-8 text-center">
            <p className="font-sans font-bold tracking-tight text-xl text-ink-navy">
              Ready to get started?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate">
              Fill our enquiry form and our team will get back to you within 24 hours.
            </p>
            <Button asChild variant="primary" className="mt-5">
              <Link href="/contact-us">Fill Enquiry Form</Link>
            </Button>
          </div>

          {related.length > 0 && (
            <div className="mt-14">
              <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">
                Keep Reading
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="rounded-2xl bg-boarding-paper p-5 shadow-sm ring-1 ring-ink-navy/5 transition-shadow hover:shadow-md"
                  >
                    <span className="text-2xl">{r.coverEmoji}</span>
                    <p className="mt-2 font-sans font-bold tracking-tight text-sm text-ink-navy">
                      {r.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
