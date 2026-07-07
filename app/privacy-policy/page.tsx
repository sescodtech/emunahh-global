import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Privacy Policy | Emunahh Global Consult",
  description:
    "How Emunahh Global Consult collects, uses, and protects your personal data, in line with the Nigeria Data Protection Act 2023 (NDPA).",
};

const sections = [
  { id: "scope", title: "1. Scope of This Policy" },
  { id: "information-we-collect", title: "2. Information We Collect" },
  { id: "legal-basis", title: "3. Legal Basis for Processing" },
  { id: "how-we-use", title: "4. How We Use Your Information" },
  { id: "sharing", title: "5. Data Sharing & Third-Party Processors" },
  { id: "cookies", title: "6. Cookies & Website Analytics" },
  { id: "retention", title: "7. Data Retention" },
  { id: "security", title: "8. How We Protect Your Data" },
  { id: "rights", title: "9. Your Rights" },
  { id: "children", title: "10. Children's Privacy" },
  { id: "changes", title: "11. Changes to This Policy" },
  { id: "contact", title: "12. Contact Us & Complaints" },
];

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();
  const email = settings.email;
  const lastUpdated = "7 July 2026";

  return (
    <section className="bg-white py-20">
      <Container className="max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* Table of contents */}
          <nav className="hidden lg:block">
            <div className="sticky top-24">
              <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">On this page</p>
              <ul className="mt-4 space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-slate hover:text-brand-green hover:underline">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">Legal</p>
            <h1 className="mt-3 font-sans font-extrabold tracking-tight text-4xl text-ink-navy">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-slate">Last updated: {lastUpdated}</p>

            <div className="prose prose-slate mt-8 max-w-none prose-h2:font-sans prose-h2:font-bold prose-h2:tracking-tight prose-h2:text-ink-navy prose-a:text-brand-green">
              <p>
                {settings.companyName} ("we," "us," "our") respects your privacy. This policy
                explains what information we collect when you contact us, use our enquiry form,
                or otherwise interact with our website, how we use that information, and your
                rights regarding it — in line with the Nigeria Data Protection Act 2023 (NDPA)
                and the Nigeria Data Protection Regulation (NDPR).
              </p>

              <h2 id="scope">1. Scope of This Policy</h2>
              <p>
                This policy applies to personal data we collect through our website
                (emunahh.com), our enquiry form, WhatsApp, email, and phone communications
                related to our flight booking, travel &amp; visa consultancy, international
                passport, financial advisory, and business registration (CAC) services.
              </p>

              <h2 id="information-we-collect">2. Information We Collect</h2>
              <ul>
                <li>Name, email address, and phone number you provide via our enquiry form</li>
                <li>
                  Details related to your requested service (e.g. travel destination, preferred
                  travel date, proposed company name, financing goal)
                </li>
                <li>Messages and documents you send us via WhatsApp, email, or phone</li>
                <li>
                  Basic technical information (browser type, device type, and approximate
                  location derived from IP address) collected automatically when you visit our
                  website
                </li>
              </ul>

              <h2 id="legal-basis">3. Legal Basis for Processing</h2>
              <p>We process your personal data on the following legal bases:</p>
              <ul>
                <li><strong>Consent</strong> — when you tick the consent box on our enquiry form</li>
                <li><strong>Contract performance</strong> — to deliver a service you've requested</li>
                <li>
                  <strong>Legitimate interest</strong> — to respond to enquiries, prevent fraud,
                  and improve our services
                </li>
                <li><strong>Legal obligation</strong> — where required by Nigerian law or regulators</li>
              </ul>

              <h2 id="how-we-use">4. How We Use Your Information</h2>
              <ul>
                <li>To respond to your enquiry and provide the service you requested</li>
                <li>
                  To follow up on visa, passport, flight, financial advisory, or business
                  registration applications
                </li>
                <li>To send you updates relevant to your specific request</li>
                <li>To improve our services and website experience</li>
                <li>To meet legal, regulatory, and compliance obligations</li>
              </ul>

              <h2 id="sharing">5. Data Sharing &amp; Third-Party Processors</h2>
              <p>
                We do not sell your personal information. We share necessary details only with
                third parties strictly required to deliver your requested service, and only with
                your consent — for example: airlines and travel partners for flight bookings,
                relevant government agencies (e.g. Nigeria Immigration Service, Corporate Affairs
                Commission) for visa, passport, and business registration processing, and our
                infrastructure providers (such as our secure cloud hosting and media storage
                providers) who process data on our behalf under confidentiality obligations.
              </p>

              <h2 id="cookies">6. Cookies &amp; Website Analytics</h2>
              <p>
                Our website may use essential cookies required for the site to function, and may
                use privacy-respecting analytics to understand overall visitor trends. We do not
                use cookies to build advertising profiles about you. You can control or disable
                cookies through your browser settings at any time.
              </p>

              <h2 id="retention">7. Data Retention</h2>
              <p>
                We retain your information only as long as necessary to complete your request,
                maintain accurate business records, and comply with legal, tax, and regulatory
                obligations under Nigerian law — after which it is securely deleted or
                anonymized.
              </p>

              <h2 id="security">8. How We Protect Your Data</h2>
              <p>
                We apply reasonable technical and organizational safeguards to protect your
                personal data against unauthorized access, alteration, disclosure, or
                destruction, including access controls on our systems, encrypted data
                transmission (HTTPS), and restricting internal access to personal data on a
                need-to-know basis. No method of transmission or storage is 100% secure, and we
                continuously work to improve our safeguards.
              </p>

              <h2 id="rights">9. Your Rights</h2>
              <p>Under the NDPA, you have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your data, subject to legal retention requirements</li>
                <li>Withdraw consent at any time where processing is based on consent</li>
                <li>Object to certain types of processing</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a href={`mailto:${email}`}>{email}</a>.
              </p>

              <h2 id="children">10. Children's Privacy</h2>
              <p>
                Our services are intended for individuals aged 18 and above. We do not knowingly
                collect personal data from children. If you believe a child has provided us with
                personal data, please contact us so we can remove it.
              </p>

              <h2 id="changes">11. Changes to This Policy</h2>
              <p>
                We may update this policy from time to time to reflect changes in our practices
                or legal requirements. The "Last updated" date at the top of this page indicates
                when it was last revised. We encourage you to review this page periodically.
              </p>

              <h2 id="contact">12. Contact Us &amp; Complaints</h2>
              <p>
                Questions or complaints about this policy or how we handle your data can be sent
                to <a href={`mailto:${email}`}>{email}</a> or via{" "}
                <a href="https://wa.me/2348179171456" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
                . If you're not satisfied with our response, you may lodge a complaint with the
                Nigeria Data Protection Commission (NDPC).
              </p>

              <p>
                For general questions, you can also visit our{" "}
                <Link href="/faq">FAQ page</Link> or{" "}
                <Link href="/contact-us">contact us directly</Link>.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
