"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";

/**
 * Front-end only for now — there's no /api/newsletter route or
 * subscriber table in the schema yet, so this just confirms the
 * interaction visually. Wire this up to a real endpoint (and a
 * NewsletterSubscriber model in prisma/schema.prisma) before relying
 * on it to actually collect emails.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="font-sans text-sm text-boarding-paper/80">
        Thanks — you&rsquo;re on the list. We&rsquo;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="w-full rounded-full border border-boarding-paper/20 bg-white/5 px-4 py-2.5 font-sans text-sm text-boarding-paper placeholder:text-boarding-paper/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp-gold"
      />
      <Button type="submit" variant="primary" size="sm" className="shrink-0">
        Subscribe
      </Button>
    </form>
  );
}
