import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { navLinks, siteSettings } from "@/data/home-content";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = "https://emunahh.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Emunahh Global Consult | Travel & Financial Advisory",
    template: "%s | Emunahh Global Consult",
  },
  description:
    "Nigeria's trusted partner for flight bookings, visa consultancy, international passports, financial advisory, and business registration. RC 8937100, Lagos, Nigeria.",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "Emunahh Global Consult",
    title: "Emunahh Global Consult | Travel & Financial Advisory",
    description:
      "Nigeria's trusted partner for flight bookings, visa consultancy, international passports, financial advisory, and business registration.",
    images: [{ url: "/logo.png", width: 168, height: 56, alt: "Emunahh Global Consult" }],
  },
  twitter: {
    card: "summary",
    title: "Emunahh Global Consult | Travel & Financial Advisory",
    description:
      "Nigeria's trusted partner for flight bookings, visa consultancy, international passports, financial advisory, and business registration.",
    images: ["/logo.png"],
  },
  alternates: { canonical: siteUrl },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Emunahh Global Consult",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/logo.png`,
  telephone: "+234 817 917 1456",
  email: "info@emunahh.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Adeoye Close, Meiran Bus Stop",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  areaServed: "NG",
  sameAs: ["https://instagram.com/Emunahhglobal", "https://tiktok.com/@Emunahhglobal"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-body text-ink-navy antialiased">
        <script
          type="application/ld+json"
          // Organization schema for SEO rich results — kept to verified,
          // real company details only (no invented ratings or reviews).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar links={navLinks} />
        <main>{children}</main>
        <Footer
          companyName={siteSettings.companyName}
          rcNumber={siteSettings.rcNumber}
          tagline={siteSettings.tagline}
          phonePrimary={siteSettings.phonePrimary}
          phoneSecondary={siteSettings.phoneSecondary}
          email={siteSettings.email}
          officeAddress={siteSettings.officeAddress}
          workingHours={siteSettings.workingHours}
          logoUrl={siteSettings.logoUrl}
          instagramHandle={siteSettings.instagramHandle}
          tiktokHandle={siteSettings.tiktokHandle}
          facebookUrl={siteSettings.facebookUrl}
          linkedinUrl={siteSettings.linkedinUrl}
          youtubeUrl={siteSettings.youtubeUrl}
          xUrl={siteSettings.xUrl}
          whatsappNumber={siteSettings.whatsappNumber}
        />
      </body>
    </html>
  );
}
