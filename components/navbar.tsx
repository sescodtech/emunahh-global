"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  // Only the homepage has a full-bleed dark hero directly under the
  // navbar — every other page starts with a light background, so the
  // transparent/dark-text treatment only applies there.
  const onHomeHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        onHomeHero
          ? "bg-transparent"
          : "bg-white/90 shadow-[0_1px_0_0_rgba(16,32,58,0.06)] backdrop-blur-md"
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between transition-all duration-500",
          scrolled ? "h-20" : "h-24"
        )}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Emunahh Global Consult"
            width={168}
            height={56}
            priority
            className={cn(
              "h-9 w-auto object-contain transition-all duration-500",
              onHomeHero && "brightness-0 invert"
            )}
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-sans text-[15px] font-medium tracking-tight transition-colors",
                onHomeHero
                  ? "text-boarding-paper/85 hover:text-boarding-paper"
                  : "text-ink-navy/70 hover:text-ink-navy"
              )}
            >
              {link.label}
            </Link>
          ))}

          <Button asChild variant="primary" size="sm" className="ml-2">
            <Link href="/contact-us">Book Consultation</Link>
          </Button>
        </nav>

        <button
          type="button"
          className={cn(
            "rounded-md p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green lg:hidden",
            onHomeHero ? "text-boarding-paper" : "text-ink-navy"
          )}
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
          "overflow-hidden border-t transition-[max-height] duration-300 lg:hidden",
          onHomeHero ? "border-boarding-paper/10 bg-ink-navy" : "border-ink-navy/5 bg-white",
          open ? "max-h-[28rem]" : "max-h-0"
        )}
      >
        <Container className="flex flex-col gap-4 py-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-sans text-base",
                onHomeHero ? "text-boarding-paper/85" : "text-ink-navy/80"
              )}
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
