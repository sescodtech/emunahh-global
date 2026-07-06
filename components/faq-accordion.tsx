interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Uses native <details>/<summary> so keyboard and screen-reader support
 * is free and correct (audit #10) — no custom ARIA state to get wrong.
 * The parent page is expected to also emit matching FAQPage JSON-LD
 * from the same `items` array (audit #2), keeping content in one place.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-ink-navy/10 rounded-2xl bg-white ring-1 ring-ink-navy/5">
      {items.map((item) => (
        <details key={item.id} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between font-body font-medium text-ink-navy">
            {item.question}
            <span
              aria-hidden
              className="ml-4 shrink-0 font-mono text-stamp-gold transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
