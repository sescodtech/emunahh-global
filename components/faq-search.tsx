"use client";

import { useMemo, useState } from "react";
import { FaqAccordion } from "@/components/faq-accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export function FaqSearch({ items }: { items: FaqItem[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div>
      <div className="relative">
        <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate/50">
          🔍
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions — e.g. visa, passport, CAC..."
          className="w-full rounded-xl border border-ink-navy/15 bg-white py-3 pl-11 pr-4 text-sm text-ink-navy shadow-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
        />
      </div>

      <p className="mt-3 font-mono text-xs text-slate">
        {filtered.length} of {items.length} question{items.length === 1 ? "" : "s"}
      </p>

      <div className="mt-4">
        {filtered.length > 0 ? (
          <FaqAccordion items={filtered} />
        ) : (
          <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-ink-navy/5">
            <p className="text-sm text-slate">
              No matching questions. Try a different word, or ask us directly below.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
