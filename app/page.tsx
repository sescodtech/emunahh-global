import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/hero";
import { ServiceShowcase } from "@/components/service-showcase";
import { TestimonialCard } from "@/components/testimonial-card";
import { Reveal } from "@/components/reveal";
import {
  homeHero,
  trustIndicators,
  services,
  aboutTeaser,
  testimonials,
  siteSettings,
} from "@/data/home-content";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={homeHero.eyebrow}
        headline={homeHero.headline}
        subcopy={homeHero.subcopy}
        ctaPrimary={homeHero.ctaPrimary}
        ctaSecondary={homeHero.ctaSecondary}
        backgroundImage={homeHero.backgroundImage}
        trustIndicators={trustIndicators}
      />

      <section id="services" className="bg-white pt-24">
        <Container>
          <SectionHeading
            eyebrow="What We Do"
            title="Five Services. One Trusted Partner."
            description="Everything you need to travel, relocate, or grow a business — handled end to end, with nothing outsourced to strangers."
          />
        </Container>
        <ServiceShowcase services={services} />
      </section>

      <section className="bg-white py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-stamp-gold">
              About Emunahh Global
            </p>
            <h2 className="mt-4 font-sans text-4xl font-extrabold leading-tight tracking-tight text-ink-navy sm:text-5xl">
              {aboutTeaser.heading}
            </h2>
            <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-slate">
              {aboutTeaser.body}
            </p>
            <p className="mt-5 font-mono text-xs uppercase tracking-wide text-approved-green">
              {aboutTeaser.registrationLine}
            </p>
            <Link
              href="/about-us"
              className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-semibold text-ink-navy transition-all hover:gap-3"
            >
              Read our full story <span aria-hidden>→</span>
            </Link>
          </Reveal>

          <Reveal delay={1} className="space-y-8 lg:border-l lg:border-ink-navy/10 lg:pl-14">
            {aboutTeaser.bullets.map((b) => (
              <div key={b.title}>
                <h3 className="font-sans text-lg font-bold text-ink-navy">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{b.body}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-boarding-paper py-24">
        <Container>
          <SectionHeading eyebrow="Client Success" title="Real Nigerians. Real Results." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4}>
                <TestimonialCard
                  clientName={t.clientName}
                  roleOrCity={t.roleOrCity}
                  quote={t.quote}
                  rating={t.rating}
                  isVerified={t.isVerified}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink-navy py-24">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl font-sans text-4xl font-extrabold leading-tight tracking-tight text-boarding-paper sm:text-5xl">
            Ready to Get Started? We&rsquo;re One Message Away.
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-boarding-paper/75">
            Join hundreds of Nigerians who&rsquo;ve trusted {siteSettings.companyName} with their
            travel, financial and business goals.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact-us">Fill Enquiry Form</Link>
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              <a
                href={`https://wa.me/${siteSettings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us Now
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
