import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/layout";
import { NewsletterForm } from "@/components/newsletter-form";

interface FooterProps {
  companyName: string;
  rcNumber: string;
  tagline: string;
  phonePrimary: string;
  phoneSecondary?: string;
  email: string;
  officeAddress?: string;
  workingHours?: string;
  logoUrl?: string;
  instagramHandle?: string;
  tiktokHandle?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  xUrl?: string;
  whatsappNumber?: string;
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-boarding-paper/10 text-boarding-paper/70 transition-colors hover:bg-brand-green hover:text-white"
    >
      {children}
    </a>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-stamp-gold">{heading}</p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-sans text-[15px] text-boarding-paper/70 transition-colors hover:text-boarding-paper"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({
  companyName,
  rcNumber,
  tagline,
  phonePrimary,
  phoneSecondary,
  email,
  officeAddress,
  workingHours,
  logoUrl = "/logo.png",
  instagramHandle,
  tiktokHandle,
  facebookUrl,
  linkedinUrl,
  youtubeUrl,
  xUrl,
  whatsappNumber,
}: FooterProps) {
  return (
    <footer className="bg-ink-navy text-boarding-paper/80">
      {/* Newsletter band */}
      <Container className="flex flex-col items-start justify-between gap-6 border-b border-boarding-paper/10 py-12 lg:flex-row lg:items-center">
        <div>
          <p className="font-sans text-2xl font-extrabold tracking-tight text-boarding-paper sm:text-3xl">
            Stay ahead of visa &amp; travel updates.
          </p>
          <p className="mt-2 font-sans text-sm text-boarding-paper/60">
            Occasional emails only — no spam, ever.
          </p>
        </div>
        <NewsletterForm />
      </Container>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        {/* Company */}
        <div>
          <Link href="/" className="inline-flex items-center rounded-lg bg-white px-3 py-2">
            <Image src={logoUrl} alt={companyName} width={150} height={50} className="h-8 w-auto object-contain" />
          </Link>
          <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-boarding-paper/70">
            Nigeria&rsquo;s trusted partner for flights, visas, passports, financial advisory and
            business registration &mdash; handled end to end, nationwide.
          </p>
          <p className="mt-4 font-mono text-xs text-boarding-paper/50">{tagline} &middot; {rcNumber}</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {whatsappNumber && (
              <SocialLink href={`https://wa.me/${whatsappNumber}`} label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.09-1.34A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18a7.94 7.94 0 0 1-4.06-1.11l-.29-.17-3.02.79.8-2.94-.19-.3A7.95 7.95 0 1 1 12 20z"/></svg>
              </SocialLink>
            )}
            {instagramHandle && (
              <SocialLink href={`https://instagram.com/${instagramHandle}`} label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.02-3.58.07-4.85C2.38 3.85 3.9 2.32 7.15 2.17 8.42 2.11 8.8 2.1 12 2.1M12 0C8.74 0 8.33.01 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 24 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.79-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.19-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.41-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z"/></svg>
              </SocialLink>
            )}
            {tiktokHandle && (
              <SocialLink href={`https://tiktok.com/@${tiktokHandle}`} label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.89-2.89c.28 0 .54.04.79.1V9.4a6.33 6.33 0 1 0 5.54 6.28V8.69a8.16 8.16 0 0 0 4.78 1.53V6.75a4.85 4.85 0 0 1-1-.06z"/></svg>
              </SocialLink>
            )}
            {facebookUrl && (
              <SocialLink href={facebookUrl} label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>
              </SocialLink>
            )}
            {linkedinUrl && (
              <SocialLink href={linkedinUrl} label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56z"/></svg>
              </SocialLink>
            )}
            {youtubeUrl && (
              <SocialLink href={youtubeUrl} label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.4 3.6 12 3.6 12 3.6s-7.4 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2 .5 9.4.5 9.4.5s7.4 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6z"/></svg>
              </SocialLink>
            )}
            {xUrl && (
              <SocialLink href={xUrl} label="X (Twitter)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.2 8.2L23.3 22h-6.6l-5.2-6.8L5.5 22H2.3l7.7-8.8L1 2h6.8l4.7 6.2zm-1.2 18h1.8L7.4 4H5.5z"/></svg>
              </SocialLink>
            )}
          </div>
        </div>

        <FooterColumn
          heading="Quick Links"
          links={[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about-us" },
            { label: "Services", href: "/service" },
            { label: "Contact Us", href: "/contact-us" },
          ]}
        />

        <FooterColumn
          heading="Services"
          links={[
            { label: "Flight Bookings", href: "/service" },
            { label: "Travel & Visa Consultancy", href: "/service" },
            { label: "International Passport", href: "/service" },
            { label: "Financial Advisory", href: "/service" },
            { label: "Business Registration (CAC)", href: "/service" },
          ]}
        />

        <div>
          <FooterColumn
            heading="Resources"
            links={[
              { label: "Blog", href: "/blog" },
              { label: "Careers", href: "/careers" },
              { label: "FAQ", href: "/faq" },
            ]}
          />

          <div className="mt-9">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-stamp-gold">Get In Touch</p>
            <p className="font-sans text-[15px] text-boarding-paper/70">{phonePrimary}</p>
            {phoneSecondary && <p className="font-sans text-[15px] text-boarding-paper/70">{phoneSecondary}</p>}
            <p className="font-sans text-[15px] text-boarding-paper/70">{email}</p>
            {officeAddress && <p className="mt-3 font-sans text-[15px] text-boarding-paper/70">{officeAddress}</p>}
            {workingHours && <p className="mt-1 font-mono text-xs text-boarding-paper/50">{workingHours}</p>}
          </div>
        </div>
      </Container>

      <Container className="flex flex-wrap items-center justify-between gap-3 border-t border-boarding-paper/10 py-7 font-mono text-xs text-boarding-paper/60">
        <span>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</span>
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-boarding-paper">
          Privacy Policy
        </Link>
      </Container>
    </footer>
  );
}
