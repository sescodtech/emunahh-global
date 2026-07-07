"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

export function Navbar({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 shadow-sm backdrop-blur" : "bg-white/70 backdrop-blur-sm"
      )}
    >
      <Container className={cn("flex items-center justify-between transition-all duration-300", scrolled ? "h-16" : "h-20")}>
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

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-ink-navy/80 transition-colors hover:text-brand-green"
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
          className="lg:hidden rounded-md p-2 text-ink-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
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
          "overflow-hidden border-t border-ink-navy/5 transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[28rem]" : "max-h-0"
        )}
      >
        <Container className="flex flex-col gap-4 py-6">
          {links.map((link) => (
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
