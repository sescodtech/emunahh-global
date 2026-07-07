import { Container, SectionHeading } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { getJobOpenings, getSiteSettings } from "@/lib/content";
import { careersHero } from "@/data/careers-content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Careers | Emunahh Global Consult",
  description:
    "Join Emunahh Global Consult — open roles in travel consulting, client services, and business advisory in Lagos, Nigeria.",
};

const benefits = [
  { icon: "💼", title: "Real Client Impact", body: "Every role directly helps a Nigerian reach a travel, visa, or business goal." },
  { icon: "📈", title: "Room to Grow", body: "We're a growing firm — early team members take on more responsibility fast." },
  { icon: "🤝", title: "Supportive Team", body: "Small, close-knit team where your questions get answered and your work gets seen." },
];

export default async function CareersPage() {
  const [jobs, settings] = await Promise.all([getJobOpenings(), getSiteSettings()]);
  const openRoles = jobs.filter((j) => j.isActive);
  const email = settings.email;

  const jobPostingsJsonLd = openRoles.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.postedAt,
    employmentType: job.type.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: settings.companyName,
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
    },
  }));

  return (
    <>
      {jobPostingsJsonLd.map((jsonLd, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}

      <section className="bg-ink-navy pb-16 pt-20">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">
            {careersHero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl font-sans font-extrabold tracking-tight text-4xl leading-tight text-boarding-paper sm:text-5xl">
            {careersHero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-boarding-paper/80">{careersHero.subcopy}</p>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-5 sm:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl bg-boarding-paper p-6">
                <span className="text-2xl">{b.icon}</span>
                <p className="mt-3 font-sans font-bold tracking-tight text-ink-navy">{b.title}</p>
                <p className="mt-1.5 text-sm text-slate">{b.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-boarding-paper py-20">
        <Container>
          <SectionHeading
            eyebrow="Open Roles"
            title={`${openRoles.length} Position${openRoles.length === 1 ? "" : "s"} Currently Open`}
            description="Don't see a fit today? Send us your CV anyway — we keep a list for when the right role opens up."
          />

          <div className="mt-10 space-y-5">
            {openRoles.map((job, i) => (
              <Reveal key={job.id} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-navy/5 transition-shadow hover:shadow-md">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-sans font-bold tracking-tight text-xl text-ink-navy">{job.title}</h3>
                      <p className="mt-1 font-mono text-xs text-slate">
                        {job.department} · {job.location} · {job.type}
                      </p>
                    </div>
                    <Button asChild variant="primary" size="sm">
                      <a
                        href={`mailto:${email}?subject=${encodeURIComponent(
                          `Application: ${job.title}`
                        )}`}
                      >
                        Apply Now
                      </a>
                    </Button>
                  </div>
                  <p className="mt-3 text-sm text-slate">{job.summary}</p>

                  <details className="mt-4 group">
                    <summary className="cursor-pointer font-mono text-xs uppercase tracking-wide text-brand-green">
                      View full role description
                    </summary>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="font-body text-sm font-medium text-ink-navy">Responsibilities</p>
                        <ul className="mt-2 space-y-1.5 text-sm text-slate">
                          {job.responsibilities.map((r) => (
                            <li key={r} className="flex gap-2">
                              <span className="text-brand-green">✦</span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-body text-sm font-medium text-ink-navy">Requirements</p>
                        <ul className="mt-2 space-y-1.5 text-sm text-slate">
                          {job.requirements.map((r) => (
                            <li key={r} className="flex gap-2">
                              <span className="text-brand-green">✦</span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>
              </Reveal>
            ))}

            {openRoles.length === 0 && (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-ink-navy/5">
                <p className="font-sans font-bold tracking-tight text-xl text-ink-navy">No open roles right now</p>
                <p className="mt-2 text-sm text-slate">
                  Check back soon, or send your CV to{" "}
                  <a href={`mailto:${email}`} className="text-brand-green underline">
                    {email}
                  </a>
                  .
                </p>
              </div>
            )}
          </div>

          <div className="mt-10 rounded-2xl bg-ink-navy p-8 text-center">
            <p className="font-sans font-bold tracking-tight text-xl text-boarding-paper">
              Don't see the right role?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-boarding-paper/70">
              Send us your CV and a short note about what you're looking for — we'll reach out
              when something fits.
            </p>
            <Button asChild variant="primary" className="mt-5">
              <a href={`mailto:${email}?subject=${encodeURIComponent("General Application")}`}>
                Send Your CV
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
