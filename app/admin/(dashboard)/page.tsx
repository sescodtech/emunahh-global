"use client";

import { useState } from "react";
import { faqs as initialFaqs } from "@/data/contact-content";
import { Button } from "@/components/ui/button";

export default function AdminFaqsPage() {
  const [items, setItems] = useState(initialFaqs);

  function updateAnswer(id: string, value: string) {
    setItems((prev) => prev.map((f) => (f.id === id ? { ...f, answer: value } : f)));
  }

  return (
    <div>
      <h1 className="font-display text-3xl italic text-ink-navy">FAQs</h1>
      <p className="mt-1 text-sm text-slate">
        Edit the questions and answers shown on the Contact page accordion.
      </p>

      <Button variant="primary" size="sm" className="mt-4">+ Add FAQ</Button>

      <div className="mt-6 space-y-4">
        {items.map((f) => (
          <div key={f.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-navy/5">
            <p className="font-body font-medium text-ink-navy">{f.question}</p>
            <textarea
              value={f.answer}
              onChange={(e) => updateAnswer(f.id, e.target.value)}
              rows={2}
              className="mt-2 w-full rounded-lg border border-ink-navy/15 px-3 py-2 text-sm text-slate"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
