import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { CounterStat } from "@/components/counter-stat";
import { FallbackImage } from "@/components/fallback-image";
import { PlaneFlyover } from "@/components/plane-flyover";
import { CloudLayer } from "@/components/cloud-layer";
import { cloudinaryUrl } from "@/lib/cloudinary";

interface HeroProps {
  eyebrow: string;
  headline: string;
  subcopy: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  backgroundImage: string;
  cloudinaryPublicId?: string;
  planeImageUrl?: string;
  trustIndicators: { label: string; value: string }[];
}

export function Hero({
  eyebrow,
  headline,
  subcopy,
  ctaPrimary,
  ctaSecondary,
  backgroundImage,
  cloudinaryPublicId,
  planeImageUrl,
  trustIndicators,
}: HeroProps) {
  const src = cloudinaryPublicId
    ? cloudinaryUrl(cloudinaryPublicId, backgroundImage, { width: 2400 })
    : backgroundImage;

  return (
    <section className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden bg-ink-navy lg:min-h-[75vh]">
      <FallbackImage
        src={src}
        fallbackSrc={backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark overlay — gradient so the top stays readable for the
          transparent navbar and text stays legible over the photo. */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-navy/75 via-ink-navy/55 to-ink-navy/85" />
      <CloudLayer />
      <PlaneFlyover {...(planeImageUrl ? { src: planeImageUrl } : {})} />

      <Container className="relative py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div data-reveal className="max-w-2xl animate-fade-up">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-stamp-gold">
              {eyebrow}
            </p>

            <h1 className="mt-5 font-sans text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-boarding-paper sm:text-5xl lg:text-6xl">
              {headline}
            </h1>

            <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-boarding-paper/80">
              {subcopy}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
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

          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-boarding-paper/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {trustIndicators.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-boarding-paper/55">
                  {item.label}
                </dt>
                <dd className="mt-2 font-sans text-2xl font-extrabold tracking-tight text-boarding-paper sm:text-3xl">
                  <CounterStat value={item.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
