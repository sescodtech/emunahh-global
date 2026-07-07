import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { StatStrip } from "@/components/stat-strip";
import { StampBadge } from "@/components/stamp-badge";
import { RouteMarquee } from "@/components/route-marquee";
import { ServiceShowcase } from "@/components/service-showcase";
import { ProcessSteps } from "@/components/process-steps";
import { TestimonialCard } from "@/components/testimonial-card";
import { Reveal } from "@/components/reveal";
import {
  homeHero,
  homeStats,
  routeMarquee,
  services,
  processSteps,
  aboutTeaser,
  testimonials,
  siteSettings,
} from "@/data/home-content";

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden bg-ink-navy pb-16 pt-28">
        <div
          className="pointer-events-none absolute inset-0 bg-perforated-x opacity-[0.06]"
          aria-hidden
        />
        <Container className="relative">
          <StampBadge label={homeHero.stampBadgeLabel} />

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-boarding-paper/50">
            {homeHero.eyebrow}
          </p>

          <h1 className="mt-5 max-w-3xl font-display text-5xl italic leading-[1.05] text-boarding-paper sm:text-6xl lg:text-7xl">
            {homeHero.headline}
          </h1>

          <p className="mt-7 max-w-xl font-body text-lg leading-relaxed text-boarding-paper/75">
            {homeHero.subcopy}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href={homeHero.ctaPrimary.href}>{homeHero.ctaPrimary.label}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href={homeHero.ctaSecondary.href} target="_blank" rel="noopener noreferrer">
                {homeHero.ctaSecondary.label}
              </a>
            </Button>
          </div>

          <div className="mt-14 max-w-2xl">
            <StatStrip stats={homeStats} />
          </div>
        </Container>

        <div className="relative mt-14">
          <RouteMarquee routes={routeMarquee} />
        </div>
      </section>

      <section id="services" className="bg-white pt-20">
        <Container>
          <SectionHeading
            eyebrow="What We Do"
            title="Five Services. One Trusted Partner."
            description="Everything you need to travel, relocate, or grow a business — handled end to end, with nothing outsourced to strangers."
          />
        </Container>
        <ServiceShowcase services={services} />
      </section>

      <section className="bg-boarding-paper py-20">
        <Container>
          <SectionHeading eyebrow="How It Works" title="Simple. Fast. Professional." />
          <div className="mt-12">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp-gold">
              About Emunahh Global
            </p>
            <h2 className="mt-3 font-display text-4xl italic leading-tight text-ink-navy sm:text-5xl">
              {aboutTeaser.heading}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate">{aboutTeaser.body}</p>
            <p className="mt-4 font-mono text-xs uppercase tracking-wide text-approved-green">
              {aboutTeaser.registrationLine}
            </p>
            <Link
              href="/about-us"
              className="mt-6 inline-flex items-center gap-2 font-body text-sm font-medium text-ink-navy hover:gap-3 transition-all"
            >
              Read our full story <span aria-hidden>→</span>
            </Link>
          </Reveal>

          <Reveal delay={1} className="space-y-6 lg:border-l lg:border-ink-navy/10 lg:pl-12">
            {aboutTeaser.bullets.map((b) => (
              <div key={b.title}>
                <h3 className="font-body font-medium text-ink-navy">{b.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate">{b.body}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-boarding-paper py-20">
        <Container>
          <SectionHeading eyebrow="Client Success" title="Real Nigerians. Real Results." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="bg-ink-navy py-20">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl italic text-boarding-paper sm:text-4xl">
            Ready to Get Started? We&rsquo;re One Message Away.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-boarding-paper/75">
            Join hundreds of Nigerians who&rsquo;ve trusted {siteSettings.companyName} with their
            travel, financial and business goals.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact-us">Fill Enquiry Form</Link>
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              
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
