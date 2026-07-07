import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/reveal";
import { blogPosts } from "@/data/blog-content";

export const metadata = {
  title: "Blog | Emunahh Global Consult",
  description:
    "Travel, visa, and business tips from Emunahh Global Consult — visa checklists, financial advisory guidance, and CAC registration explainers.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const posts = blogPosts.filter((p) => p.isActive).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

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
          <SectionHeading eyebrow="Latest Articles" title="From the Blog" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-navy/5 transition-shadow hover:shadow-md"
                >
                  <span className="text-3xl">{post.coverEmoji}</span>
                  <h3 className="mt-3 font-sans font-bold tracking-tight text-lg text-ink-navy">{post.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between font-mono text-xs text-slate">
                    <span>{formatDate(post.publishedAt)}</span>
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
        </Container>
      </section>
    </>
  );
}
