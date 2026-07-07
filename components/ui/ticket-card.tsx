import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TicketCardProps {
  /** Left stub content — icon, index, or short label (e.g. "02") */
  stub: ReactNode;
  /** Main content on the right of the perforation */
  children: ReactNode;
  className?: string;
}

/**
 * The signature content device for V2: a boarding-pass-style card with
 * a perforated tear line. Used only where the content is genuinely
 * document-like (services, enquiry confirmation, stat strip) — not
 * applied decoratively across the whole site.
 */
export function TicketCard({ stub, children, className }: TicketCardProps) {
  return (
    <div
      className={cn(
        "group relative flex rounded-2xl bg-white shadow-sm ring-1 ring-ink-navy/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-stamp-gold/30",
        className
      )}
    >
      <div className="flex w-20 shrink-0 items-center justify-center bg-ink-navy font-sans text-xl font-extrabold text-stamp-gold transition-colors sm:w-24 sm:text-2xl">
        {stub}
      </div>

      {/* Perforated divider with notch cutouts, like a real ticket stub */}
      <div className="relative w-0">
        <div className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-boarding-paper" />
        <div className="absolute -left-2 -bottom-2 h-4 w-4 rounded-full bg-boarding-paper" />
        <div className="h-full border-l border-dashed border-ink-navy/15" />
      </div>

      <div className="flex-1 p-6 sm:p-7">{children}</div>
    </div>
  );
}
