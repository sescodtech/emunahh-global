import Link from "next/link";
import {
  Plane,
  Globe,
  BookOpen,
  Wallet,
  Building,
  ClipboardList,
  Users,
  Settings,
  BadgeCheck,
  Handshake,
  Sparkles,
  Rocket,
  Lightbulb,
  ShieldCheck,
  Zap,
  Flag,
  Star,
  type LucideIcon,
} from "lucide-react";
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

const icons: Record<string, LucideIcon> = {
  plane: Plane,
  globe: Globe,
  "book-open": BookOpen,
  wallet: Wallet,
  building: Building,
  "clipboard-list": ClipboardList,
  users: Users,
  settings: Settings,
  "badge-check": BadgeCheck,
  handshake: Handshake,
  sparkles: Sparkles,
  rocket: Rocket,
  lightbulb: Lightbulb,
  "shield-check": ShieldCheck,
  zap: Zap,
  flag: Flag,
  star: Star,
};

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={1.75} aria-hidden />;
}

export default function ServicePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ink-navy pb-16 pt-20">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">
            {serviceHero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-sans font-extrabold tracking-tight text-4xl leading-tight text-boarding-paper sm:text-6xl">
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
              <li
                key={c.label}
                className="flex items-center gap-2 rounded-full border border-boarding-paper/15 bg-boarding-paper/5 px-4 py-2 font-mono text-xs text-boarding-paper"
              >
                <Icon name={c.icon} className="h-3.5 w-3.5 text-stamp-gold" />
                {c.label}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* SERVICES DETAILED */}
      <section id="s-services" className="bg-white py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Our Services"
              title="Everything You Need, Under One Roof"
            />
            <Button asChild variant="ghost" className="shrink-0">
              <Link href="/contact-us">Talk to a Consultant →</Link>
            </Button>
          </div>
          <div className="mt-10 space-y-6">
            {servicesDetailed.map((s) => (
              <TicketCard key={s.index} stub={String(s.index).padStart(2, "0")}>
                <p className="font-mono text-xs uppercase tracking-wide text-stamp-gold">
                  {s.tagline}
                </p>
                <h3 className="mt-1 font-sans font-bold tracking-tight text-2xl text-ink-navy">{s.title}</h3>
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
          <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connecting line — only meaningful because this is a real
                ordered process, not decoration for its own sake. */}
            <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-ink-navy/10 lg:block" />
            {serviceProcessSteps.map((step) => (
              <li key={step.step} className="relative flex flex-col items-start">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-stamp-gold bg-ink-navy shadow-sm">
                  <Icon name={step.icon} className="h-6 w-6 text-stamp-gold" />
                </div>
                <p className="mt-4 font-mono text-xs uppercase tracking-wide text-stamp-gold">
                  Step {String(step.step).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-sans font-bold tracking-tight text-lg text-ink-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* WHY EMUNAHH */}
      <section className="bg-white py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow={whyEmunahh.eyebrow} title={whyEmunahh.heading} description={whyEmunahh.body} />
            <Button asChild variant="ghost" className="shrink-0">
              <Link href="/contact-us">Get Started Today →</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyEmunahh.values.map((v) => (
              <div
                key={v.title}
                className="group rounded-2xl bg-boarding-paper/60 p-6 ring-1 ring-ink-navy/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:ring-stamp-gold/25"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-navy/5 transition-colors group-hover:bg-stamp-gold/15">
                  <Icon name={v.icon} className="h-5 w-5 text-ink-navy" />
                </div>
                <p className="mt-4 font-sans font-bold tracking-tight text-ink-navy">{v.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-ink-navy py-8">
        <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {trustBadges.map((b) => (
            <span key={b.label} className="flex items-center gap-2 font-mono text-xs text-boarding-paper/80">
              <Icon name={b.icon} className="h-3.5 w-3.5 text-stamp-gold" />
              {b.label}
            </span>
          ))}
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="bg-ink-navy pt-4 pb-20">
        <Container className="text-center">
          <h2 className="font-sans font-extrabold tracking-tight text-3xl text-boarding-paper sm:text-4xl">
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
