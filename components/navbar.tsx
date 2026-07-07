"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { navMoreLinks } from "@/data/home-content";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

export function Navbar({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Emunahh Global Consult"
            width={168}
            height={56}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-ink-navy/80 hover:text-brand-green"
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 font-body text-sm text-ink-navy/80 hover:text-brand-green"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
            >
              More
              <span aria-hidden className={cn("text-xs transition-transform", moreOpen && "rotate-180")}>
                ▾
              </span>
            </button>
            <div
              className={cn(
                "absolute right-0 top-full mt-2 min-w-[160px] overflow-hidden rounded-xl bg-white py-2 shadow-lg ring-1 ring-ink-navy/10 transition-all",
                moreOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
              )}
            >
              {navMoreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 font-body text-sm text-ink-navy/80 hover:bg-boarding-paper hover:text-brand-green"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Button asChild variant="primary" size="sm">
            <Link href="/contact-us">Book Consultation</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="sm:hidden text-ink-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-md p-2"
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
          "sm:hidden overflow-hidden transition-[max-height] duration-300 border-t border-ink-navy/5",
          open ? "max-h-[28rem]" : "max-h-0"
        )}
      >
        <Container className="flex flex-col gap-4 py-6">
          {[...links, ...navMoreLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-ink-navy/80"
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
