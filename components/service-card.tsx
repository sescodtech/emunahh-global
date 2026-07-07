import Image from "next/image";
import { TicketCard } from "@/components/ui/ticket-card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  index: number;
  title: string;
  shortDescription: string;
  imageUrl?: string;
  featureTags: string[];
  href: string;
}

export function ServiceCard({
  index,
  title,
  shortDescription,
  imageUrl,
  featureTags,
  href,
}: ServiceCardProps) {
  return (
    <TicketCard stub={String(index).padStart(2, "0")}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {imageUrl && (
            <div className="relative mb-3 h-32 w-full overflow-hidden rounded-xl sm:hidden">
              <Image src={imageUrl} alt="" fill className="object-cover" />
            </div>
          )}
          <h3 className="font-sans font-bold tracking-tight text-xl text-ink-navy">{title}</h3>
          <p className="mt-1 text-sm text-slate">{shortDescription}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {featureTags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-approved-green/10 px-3 py-1 font-mono text-xs text-approved-green"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <Button asChild variant="ghost" size="sm">
          <a href={href}>Learn more →</a>
        </Button>
      </div>
    </TicketCard>
  );
}
