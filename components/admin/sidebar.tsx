"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const contentLinks = [
  { label: "Services", href: "/admin/services" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "FAQs", href: "/admin/faqs" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Careers", href: "/admin/careers" },
  { label: "Site Settings", href: "/admin/settings" },
];

export function AdminSidebar({ userName, userRole }: { userName: string; userRole: string }) {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-ink-navy px-5 py-7 text-boarding-paper">
      <div className="px-1">
        <p className="font-display text-2xl italic leading-none">Emunahh</p>
        <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-boarding-paper/50">
          Admin Console
        </p>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        <Link
          href="/admin"
          className={cn(
            "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/admin"
              ? "bg-stamp-gold text-ink-navy"
              : "text-boarding-paper/70 hover:bg-boarding-paper/10 hover:text-boarding-paper"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/admin/enquiries"
          className={cn(
            "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive("/admin/enquiries")
              ? "bg-stamp-gold text-ink-navy"
              : "text-boarding-paper/70 hover:bg-boarding-paper/10 hover:text-boarding-paper"
          )}
        >
          Enquiries
        </Link>
      </nav>

      <p className="mt-7 px-3 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-boarding-paper/40">
        Site Content
      </p>
      <nav className="mt-2 flex flex-col gap-1">
        {contentLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive(link.href)
                ? "bg-stamp-gold text-ink-navy"
                : "text-boarding-paper/70 hover:bg-boarding-paper/10 hover:text-boarding-paper"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto space-y-3 pt-8">
        <div className="rounded-lg bg-boarding-paper/5 px-3 py-2">
          <p className="truncate text-sm font-medium text-boarding-paper">{userName}</p>
          <p className="font-mono text-[0.62rem] uppercase tracking-wide text-boarding-paper/50">
            {userRole}
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full rounded-lg px-3 py-2 text-left text-xs text-boarding-paper/60 underline decoration-boarding-paper/20 underline-offset-4 hover:text-boarding-paper/90"
        >
          Sign out
        </button>
        <Link
          href="/"
          className="block rounded-lg px-3 py-2 text-xs text-boarding-paper/50 underline decoration-boarding-paper/20 underline-offset-4 hover:text-boarding-paper/80"
        >
          ← Back to live site
        </Link>
      </div>
    </aside>
  );
}
