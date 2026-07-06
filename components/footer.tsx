import Link from "next/link";
import { Container } from "@/components/ui/layout";

interface FooterProps {
  companyName: string;
  rcNumber: string;
  tagline: string;
  phonePrimary: string;
  phoneSecondary?: string;
  email: string;
  instagramHandle?: string;
  tiktokHandle?: string;
}

export function Footer({
  companyName,
  rcNumber,
  tagline,
  phonePrimary,
  phoneSecondary,
  email,
  instagramHandle,
  tiktokHandle,
}: FooterProps) {
  return (
    <footer className="bg-ink-navy text-boarding-paper/80">
      <Container className="grid gap-8 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg italic text-boarding-paper">{companyName}</p>
          <p className="mt-1 font-mono text-xs">{tagline} · {rcNumber}</p>
        </div>

        <div className="font-body text-sm space-y-1">
          <p>{phonePrimary}</p>
          {phoneSecondary && <p>{phoneSecondary}</p>}
          <p>{email}</p>
        </div>

        <div className="font-body text-sm space-y-1">
          {instagramHandle && <p>Instagram · @{instagramHandle}</p>}
          {tiktokHandle && <p>TikTok · @{tiktokHandle}</p>}
          <Link href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
        </div>
      </Container>

      <Container className="border-t border-boarding-paper/10 py-4 font-mono text-xs">
        © {new Date().getFullYear()} {companyName}
      </Container>
    </footer>
  );
}
