import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { CounterStat } from "@/components/counter-stat";

interface HeroProps {
  eyebrow: string;
  headline: string;
  subcopy: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  backgroundImage: string;
  trustIndicators: { label: string; value: string }[];
}

export function Hero({
  eyebrow,
  headline,
  subcopy,
  ctaPrimary,
  ctaSecondary,
  backgroundImage,
  trustIndicators,
}: HeroProps) {
  return (
    <section className="relative flex min-h-[100vh] flex-col justify-end overflow-hidden bg-ink-navy">
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark overlay — gradient so the top stays readable for the
          transparent navbar and the bottom stays readable for text. */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-navy/70 via-ink-navy/55 to-ink-navy/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-navy via-transparent to-transparent" />

      <Container className="relative pb-20 pt-40 sm:pb-28">
        <div data-reveal className="max-w-3xl animate-fade-up">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-stamp-gold">
            {eyebrow}
          </p>

          <h1 className="mt-6 font-sans text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-boarding-paper sm:text-6xl lg:text-[5rem]">
            {headline}
          </h1>

          <p className="mt-7 max-w-xl font-sans text-lg leading-relaxed text-boarding-paper/80">
            {subcopy}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href={ctaPrimary.href}>{ctaPrimary.label}</Link>
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              <a href={ctaSecondary.href} target="_blank" rel="noopener noreferrer">
                {ctaSecondary.label}
              </a>
            </Button>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-boarding-paper/15 pt-10 sm:grid-cols-4">
          {trustIndicators.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-boarding-paper/55">
                {item.label}
              </dt>
              <dd className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-boarding-paper sm:text-4xl">
                <CounterStat value={item.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
