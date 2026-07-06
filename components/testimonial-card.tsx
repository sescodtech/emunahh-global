import Image from "next/image";

interface TestimonialCardProps {
  clientName: string;
  roleOrCity?: string;
  quote: string;
  rating: number;
  avatarUrl?: string;
  isVerified: boolean;
  sourceUrl?: string;
}

export function TestimonialCard({
  clientName,
  roleOrCity,
  quote,
  rating,
  avatarUrl,
  isVerified,
  sourceUrl,
}: TestimonialCardProps) {
  return (
    <figure className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-navy/5">
      <div aria-hidden className="mb-3 font-mono text-sm text-stamp-gold">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>
      <blockquote className="font-display text-lg italic leading-snug text-ink-navy">
        "{quote}"
      </blockquote>
      <figcaption className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {avatarUrl && (
            <Image
              src={avatarUrl}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-body text-sm font-medium text-ink-navy">{clientName}</p>
            {roleOrCity && <p className="font-mono text-xs text-slate">{roleOrCity}</p>}
          </div>
        </div>
        {isVerified &&
          (sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-approved-green underline underline-offset-2"
            >
              Verified ↗
            </a>
          ) : (
            <span className="font-mono text-xs text-approved-green">Verified</span>
          ))}
      </figcaption>
    </figure>
  );
}
