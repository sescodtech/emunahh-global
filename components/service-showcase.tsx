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
    <Container className="pb-20 pt-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const src = service.cloudinaryPublicId
          ? cloudinaryUrl(service.cloudinaryPublicId, service.image, { width: 800 })
          : service.image;
        return (
          <Reveal key={service.index}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink-navy/8 transition-shadow hover:shadow-lg">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <FallbackImage
                  src={src}
                  fallbackSrc={service.image}
                  alt={service.title}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-ink-navy/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-boarding-paper">
                  {String(service.index).padStart(2, "0")} / 05
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-sans text-lg font-extrabold leading-snug tracking-tight text-ink-navy">
                  {service.title}
                </h3>
                <p className="mt-2 line-clamp-3 font-sans text-sm leading-relaxed text-slate">
                  {service.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {service.benefits.slice(0, 2).map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 font-sans text-xs text-ink-navy/75">
                      <span aria-hidden className="mt-0.5 text-approved-green">
                        ✓
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact-us"
                  className="mt-5 inline-flex items-center gap-2 font-sans text-sm font-semibold text-approved-green transition-all hover:gap-3"
                >
                  {service.cta} <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        );
      })}
      </div>
    </Container>
  );
}
