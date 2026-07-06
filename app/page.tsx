import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { StatStrip } from "@/components/stat-strip";
import { StampBadge } from "@/components/stamp-badge";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import {
  homeHero,
  homeStats,
  routeMarquee,
  destinations,
  services,
  processSteps,
  aboutTeaser,
  testimonials,
  siteSettings,
} from "@/data/home-content";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ink-navy pb-16 pt-20">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">
            {homeHero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl italic leading-tight text-boarding-paper sm:text-6xl">
            {homeHero.headline}
          </h1>
          <p className="mt-6 max-w-2xl font-body text-boarding-paper/80">
            {homeHero.subcopy}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild variant="primary">
              <Link href={homeHero.ctaPrimary.href}>{homeHero.ctaPrimary.label}</Link>
            </Button>
            <Button asChild variant="whatsapp">
              <a href={homeHero.ctaSecondary.href} target="_blank" rel="noopener noreferrer">
                {homeHero.ctaSecondary.label}
              </a>
            </Button>
            <StampBadge label={homeHero.stampBadgeLabel} />
          </div>

          <div className="mt-10">
            <StatStrip stats={homeStats} />
          </div>
        </Container>

        {/* Route marquee */}
        <div className="mt-10 overflow-hidden border-y border-boarding-paper/10 py-3">
          <p className="animate-none whitespace-nowrap font-mono text-xs text-boarding-paper/60">
            {routeMarquee.map((r) => `✈ ${r}`).join("   ")}
          </p>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="bg-boarding-paper py-20">
        <Container>
          <SectionHeading
            eyebrow="Where We Fly"
            title="Popular Destinations"
            description="From anywhere in Nigeria to the world — competitive fares, seamless bookings, and full travel support for every Nigerian."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {destinations.map((d) => (
              <div
                key={d.name}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-navy/5"
              >
                <p className="text-2xl">{d.flag}</p>
                <p className="mt-2 font-body font-medium text-ink-navy">{d.name}</p>
                {d.routeCode && (
                  <p className="mt-1 font-mono text-xs text-slate">{d.routeCode}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="ghost">
              <Link href="/service">View All Destinations</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <section className="bg-white py-20">
        <Container>
          <SectionHeading
            eyebrow="What We Offer"
            title="Five Services. One Trusted Partner."
            description="Flights, visas, passports, financial advisory, business registration — we handle it all so you don't have to stress."
          />
          <div className="mt-10 space-y-5">
            {services.map((s) => (
              <ServiceCard
                key={s.index}
                index={s.index}
                title={s.title}
                shortDescription={s.description}
                featureTags={[]}
                href="/contact-us"
              />
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="ghost">
              <Link href="/service">View All Services</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <section className="bg-boarding-paper py-20">
        <Container>
          <SectionHeading
            eyebrow="Simple Process"
            title="From Anywhere in Nigeria in 4 Easy Steps"
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.step} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="font-display text-3xl italic text-stamp-gold">
                  {step.step}
                </span>
                <h3 className="mt-3 font-body font-medium text-ink-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-slate">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ABOUT TEASER */}
      <section className="bg-white py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="About Us" title={aboutTeaser.heading} />
            <p className="mt-4 text-slate">{aboutTeaser.body}</p>
            <p className="mt-3 font-mono text-xs text-slate">
              {aboutTeaser.registrationLine}
            </p>
            <div className="mt-6 flex gap-4">
              <Button asChild variant="primary">
                <Link href="/about-us">Our Full Story</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/contact-us">Talk to Us</Link>
              </Button>
            </div>
          </div>
          <ul className="space-y-4">
            {aboutTeaser.bullets.map((b) => (
              <li key={b.title} className="rounded-2xl bg-boarding-paper p-5">
                <p className="font-body font-medium text-ink-navy">{b.title}</p>
                <p className="mt-1 text-sm text-slate">{b.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-boarding-paper py-20">
        <Container>
          <SectionHeading
            eyebrow="Client Reviews"
            title="Real Nigerians. Real Journeys."
            description="Hundreds of Nigerians have trusted us with their most important travel and business goals."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                clientName={t.clientName}
                roleOrCity={t.roleOrCity}
                quote={t.quote}
                rating={t.rating}
                isVerified={t.isVerified}
              />
            ))}
          </div>
          <p className="mt-8 text-center font-mono text-sm text-slate">
            5.0 / 5.0 — Average rating across 500+ clients
          </p>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="bg-ink-navy py-20">
        <Container className="text-center">
          <h2 className="font-display text-3xl italic text-boarding-paper sm:text-4xl">
            Your Next Flight Starts Here — Nationwide.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-boarding-paper/80">
            Stop waiting. Contact Emunahh Global Consult today and let our travel
            experts handle your tickets, visas, and passports — fast, professionally,
            and affordably. We serve clients across Nigeria.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="primary">
              <Link href="/contact-us">Book a Free Consultation</Link>
            </Button>
            <Button asChild variant="whatsapp">
              <a
                href={`https://wa.me/${siteSettings.whatsappNumber}?text=Hello%20Emunahh%20Global%2C%20I%20want%20to%20book%20a%20flight.`}
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
