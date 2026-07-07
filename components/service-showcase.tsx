import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/reveal";
import { ServiceIllustration } from "@/components/service-illustration";

const illustrationByIndex: Record<number, "flight" | "visa" | "passport" | "finance" | "business"> = {
  1: "flight",
  2: "visa",
  3: "passport",
  4: "finance",
  5: "business",
};

interface ServiceRow {
  index: number;
  title: string;
  description: string;
  cta: string;
}

export function ServiceShowcase({ services }: { services: ServiceRow[] }) {
  return (
    <div className="divide-y divide-ink-navy/10">
      {services.map((service, i) => {
        const reversed = i % 2 === 1;
        return (
          <Container key={service.index} className="py-14 sm:py-20">
            <Reveal
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                reversed ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <ServiceIllustration variant={illustrationByIndex[service.index]} />

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp-gold">
                  {String(service.index).padStart(2, "0")} / 05
                </p>
                <h3 className="mt-3 font-display text-3xl italic leading-tight text-ink-navy sm:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-slate">
                  {service.description}
                </p>
                <Link
                  href="/contact-us"
                  className="mt-6 inline-flex items-center gap-2 font-body text-sm font-medium text-approved-green hover:gap-3 transition-all"
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
