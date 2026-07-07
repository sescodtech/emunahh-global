import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/reveal";
import { getBlogPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog | Emunahh Global Consult",
  description:
    "Travel, visa, and business tips from Emunahh Global Consult — visa checklists, financial advisory guidance, and CAC registration explainers.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPage() {
  const allPosts = await getBlogPosts();
  const posts = allPosts
    .filter((p) => p.isActive)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const [featured, ...rest] = posts;

  return (
    <>
      <section className="bg-ink-navy pb-16 pt-20">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">
            Emunahh Global Blog
          </p>
          <h1 className="mt-4 max-w-2xl font-sans font-extrabold tracking-tight text-4xl leading-tight text-boarding-paper sm:text-5xl">
            Travel & Business Insights
          </h1>
          <p className="mt-6 max-w-xl text-boarding-paper/80">
            Practical guidance on visas, travel loans, and business registration — written from
            what we see with real clients every week.
          </p>
        </Container>
      </section>

      <section className="bg-boarding-paper py-20">
        <Container>
          {featured && (
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid gap-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-navy/5 transition-shadow hover:shadow-md md:grid-cols-2"
              >
                <div className="flex items-center justify-center bg-ink-navy p-10 md:p-14">
                  <span className="text-6xl">{featured.coverEmoji}</span>
                </div>
                <div className="flex flex-col justify-center p-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-stamp-gold">
                    Latest Article
                  </span>
                  <h2 className="mt-2 font-sans font-bold tracking-tight text-2xl text-ink-navy group-hover:text-brand-green">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate">{featured.excerpt}</p>
                  <div className="mt-5 flex items-center gap-3 font-mono text-xs text-slate">
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span aria-hidden>·</span>
                    <span>{readingTime(featured.content)} min read</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="mt-14">
            <SectionHeading eyebrow="More Articles" title="From the Blog" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal key={post.id} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-navy/5 transition-shadow hover:shadow-md"
                  >
                    <span className="text-3xl">{post.coverEmoji}</span>
                    <h3 className="mt-3 font-sans font-bold tracking-tight text-lg text-ink-navy">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-slate">{post.excerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-boarding-paper px-2.5 py-0.5 font-mono text-[0.65rem] text-slate"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between font-mono text-xs text-slate">
                      <span>
                        {formatDate(post.publishedAt)} · {readingTime(post.content)} min read
                      </span>
                      <span className="text-brand-green">Read more →</span>
                    </div>
                  </Link>
                </Reveal>
              ))}

              {posts.length === 0 && (
                <p className="col-span-full text-center text-sm text-slate">
                  No articles published yet — check back soon.
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
