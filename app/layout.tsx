import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { navLinks, siteSettings } from "@/data/home-content";

export const metadata: Metadata = {
  title: "Emunahh Global Consult | Travel & Financial Advisory",
  description:
    "Nigeria's trusted partner for flight bookings, visa consultancy, international passports, financial advisory, and business registration.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body text-ink-navy antialiased">
        <Navbar links={navLinks} />
        <main>{children}</main>
        <Footer
          companyName={siteSettings.companyName}
          rcNumber={siteSettings.rcNumber}
          tagline={siteSettings.tagline}
          phonePrimary={siteSettings.phonePrimary}
          phoneSecondary={siteSettings.phoneSecondary}
          email={siteSettings.email}
          instagramHandle={siteSettings.instagramHandle}
          tiktokHandle={siteSettings.tiktokHandle}
        />
      </body>
    </html>
  );
}
