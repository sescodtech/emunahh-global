import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { StatStrip } from "@/components/stat-strip";
import { TicketCard } from "@/components/ui/ticket-card";
import {
  serviceHero,
  serviceStats,
  serviceChips,
  servicesDetailed,
  serviceProcessSteps,
  whyEmunahh,
  trustBadges,
} from "@/data/service-content";

export default function ServicePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ink-navy pb-16 pt-20">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">
            {serviceHero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl italic leading-tight text-boarding-paper sm:text-6xl">
            {serviceHero.headline}
          </h1>
          <p className="mt-6 max-w-2xl font-body text-boarding-paper/80">
            {serviceHero.subcopy}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="primary">
              <Link href={serviceHero.ctaPrimary.href}>{serviceHero.ctaPrimary.label}</Link>
            </Button>
            <Button asChild variant="secondary">
              <a href={serviceHero.ctaSecondary.href}>{serviceHero.ctaSecondary.label}</a>
            </Button>
          </div>
          <div className="mt-10">
            <StatStrip stats={serviceStats} />
          </div>
          <ul className="mt-6 flex flex-wrap gap-3">
            {serviceChips.map((c) => (
              <li key={c} className="rounded-full bg-boarding-paper/10 px-4 py-2 font-mono text-xs text-boarding-paper">
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* SERVICES DETAILED */}
      <section id="s-services" className="bg-white py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Services"
            title="Everything You Need, Under One Roof"
          />
          <div className="mt-4">
            <Button asChild variant="ghost">
              <Link href="/contact-us">Talk to a Consultant →</Link>
            </Button>
          </div>
          <div className="mt-10 space-y-6">
            {servicesDetailed.map((s) => (
              <TicketCard key={s.index} stub={String(s.index).padStart(2, "0")}>
                <p className="font-mono text-xs uppercase tracking-wide text-stamp-gold">
                  {s.tagline}
                </p>
                <h3 className="mt-1 font-display text-2xl italic text-ink-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.description}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-approved-green/10 px-3 py-1 font-mono text-xs text-approved-green">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Button asChild variant="primary" size="sm">
                    <Link href="/contact-us">{s.cta}</Link>
                  </Button>
                </div>
              </TicketCard>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-boarding-paper py-20">
        <Container>
          <SectionHeading eyebrow="How It Works" title="Simple. Fast. Professional." />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceProcessSteps.map((step) => (
              <li key={step.step} className="rounded-2xl bg-white p-6 shadow-sm">
                <span aria-hidden className="text-2xl">{step.icon}</span>
                <p className="mt-2 font-mono text-xs text-stamp-gold">{step.step}</p>
                <h3 className="mt-1 font-body font-medium text-ink-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-slate">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* WHY EMUNAHH */}
      <section className="bg-white py-20">
        <Container>
          <SectionHeading eyebrow={whyEmunahh.eyebrow} title={whyEmunahh.heading} description={whyEmunahh.body} />
          <div className="mt-4">
            <Button asChild variant="ghost">
              <Link href="/contact-us">Get Started Today →</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyEmunahh.values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-boarding-paper p-6">
                <span aria-hidden className="text-2xl">{v.icon}</span>
                <p className="mt-2 font-body font-medium text-ink-navy">{v.title}</p>
                <p className="mt-1 text-sm text-slate">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-ink-navy py-8">
        <Container className="flex flex-wrap items-center justify-center gap-6">
          {trustBadges.map((b) => (
            <span key={b} className="font-mono text-xs text-boarding-paper/80">{b}</span>
          ))}
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="bg-ink-navy pt-4 pb-20">
        <Container className="text-center">
          <h2 className="font-display text-3xl italic text-boarding-paper sm:text-4xl">
            Ready to Get Started? We're One Message Away.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-boarding-paper/80">
            Join hundreds of Nigerians who've trusted Emunahh Global Consult with their
            travel, financial and business goals. Let's make your next move happen.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="primary">
              <Link href="/contact-us">Fill Enquiry Form</Link>
            </Button>
            <Button asChild variant="whatsapp">
              <a href="https://wa.me/2348179171456" target="_blank" rel="noopener noreferrer">
                WhatsApp Us Now
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
