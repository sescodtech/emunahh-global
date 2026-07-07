"use client";

import { useState } from "react";
import { testimonials as initialTestimonials } from "@/data/home-content";
import { Button } from "@/components/ui/button";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState(initialTestimonials);

  function remove(id: string) {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <h1 className="font-display text-3xl italic text-ink-navy">Testimonials</h1>
      <p className="mt-1 text-sm text-slate">
        Approve, edit, or remove client testimonials shown on the Home page.
      </p>

      <Button variant="primary" size="sm" className="mt-4">+ Add Testimonial</Button>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-navy/5">
            <div className="flex items-center justify-between">
              <p className="font-body font-medium text-ink-navy">{t.clientName}</p>
              {t.isVerified && (
                <span className="font-mono text-xs text-approved-green">Verified</span>
              )}
            </div>
            <p className="font-mono text-xs text-slate">{t.roleOrCity}</p>
            <p className="mt-2 text-sm text-slate">{t.quote}</p>
            <p className="mt-2 font-mono text-xs text-stamp-gold">{t.serviceTag}</p>
            <div className="mt-3 flex gap-2">
              <Button variant="ghost" size="sm">Edit</Button>
              <Button variant="ghost" size="sm" onClick={() => remove(t.id)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
