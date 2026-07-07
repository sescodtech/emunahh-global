import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/reveal";
import { FallbackImage } from "@/components/fallback-image";
import { cloudinaryUrl } from "@/lib/cloudinary";

interface ServiceRow {
  index: number;
  title: string;
  description: string;
  benefits: string[];
  cta: string;
  image: string;
  cloudinaryPublicId?: string;
}

export function ServiceShowcase({ services }: { services: ServiceRow[] }) {
  return (
    <div className="divide-y divide-ink-navy/8">
      {services.map((service, i) => {
        const reversed = i % 2 === 1;
        const src = service.cloudinaryPublicId
          ? cloudinaryUrl(service.cloudinaryPublicId, service.image, { width: 1200 })
          : service.image;
        return (
          <Container key={service.index} className="py-16 sm:py-24">
            <Reveal
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                reversed ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <FallbackImage
                  src={src}
                  fallbackSrc={service.image}
                  alt={service.title}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-stamp-gold">
                  {String(service.index).padStart(2, "0")} / 05
                </p>
                <h3 className="mt-4 font-sans text-3xl font-extrabold leading-tight tracking-tight text-ink-navy sm:text-4xl lg:text-[2.75rem]">
                  {service.title}
                </h3>
                <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-slate">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 font-sans text-sm text-ink-navy/80">
                      <span aria-hidden className="mt-1 text-approved-green">
                        ✓
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact-us"
                  className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-semibold text-approved-green transition-all hover:gap-3"
                >
                  {service.cta} <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          </Container>
        );
      })}
    </div>
  );
}
