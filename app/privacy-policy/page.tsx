import { Container } from "@/components/ui/layout";

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-20">
      <Container className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl italic text-ink-navy">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate">Last updated: [DATE — set before launch]</p>

        <div className="prose prose-slate mt-8 max-w-none">
          <p>
            Emunahh Global Consult Limited ("we," "us," "our") respects your privacy.
            This policy explains what information we collect when you contact us or use
            our enquiry form, how we use it, and your rights regarding that information,
            in line with the Nigeria Data Protection Regulation (NDPR).
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>Name, email address, and phone number you provide via our enquiry form</li>
            <li>Details related to your requested service (e.g. travel destination, business name, financial goal)</li>
            <li>Messages you send us via WhatsApp, email, or phone</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To respond to your enquiry and provide the service you requested</li>
            <li>To follow up on visa, passport, flight, financial advisory, or business registration applications</li>
            <li>To improve our services and communicate updates relevant to your request</li>
          </ul>

          <h2>Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share necessary details with
            relevant third parties strictly required to deliver your requested service
            (e.g. airlines for flight bookings, government agencies for visa/passport/CAC
            processing), and only with your consent.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your information only as long as necessary to complete your
            request and comply with legal obligations, after which it is securely deleted.
          </p>

          <h2>Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data
            at any time by contacting us at{" "}
            <a href="mailto:info@emunahh.com">info@emunahh.com</a>.
          </p>

          <h2>Contact Us</h2>
          <p>
            Questions about this policy can be sent to{" "}
            <a href="mailto:info@emunahh.com">info@emunahh.com</a> or{" "}
            <a href="https://wa.me/2348179171456">WhatsApp</a>.
          </p>
        </div>
      </Container>
    </section>
  );
}
