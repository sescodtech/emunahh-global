"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

export function Navbar({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink-navy/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl italic text-boarding-paper">
          Emunahh
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-boarding-paper/90 hover:text-stamp-gold"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="primary" size="sm">
            <Link href="/contact-us">Book Consultation</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="sm:hidden text-boarding-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp-gold rounded-md p-2"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "sm:hidden overflow-hidden transition-[max-height] duration-300",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <Container className="flex flex-col gap-4 pb-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-boarding-paper/90"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="primary" size="sm">
            <Link href="/contact-us">Book Consultation</Link>
          </Button>
        </Container>
      </div>
    </header>
  );
}
