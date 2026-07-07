import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { FaqSearch } from "@/components/faq-search";
import { getFaqs } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "FAQ | Emunahh Global Consult",
  description:
    "Answers to the most common questions about flight bookings, visa consultancy, international passports, travel loans, and business registration with Emunahh Global Consult.",
};

const quickTopics = [
  { label: "Flight Bookings", href: "#" },
  { label: "Visa Consultancy", href: "#" },
  { label: "Passport", href: "#" },
  { label: "Financial Advisory", href: "#" },
  { label: "Business Registration", href: "#" },
];

export default async function FaqPage() {
  const faqs = await getFaqs();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-ink-navy pb-16 pt-20">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">
            Frequently Asked Questions
          </p>
          <h1 className="mt-4 max-w-2xl font-sans font-extrabold tracking-tight text-4xl leading-tight text-boarding-paper sm:text-5xl">
            Got Questions? We've Got Answers.
          </h1>
          <p className="mt-6 max-w-xl text-boarding-paper/80">
            Everything you need to know about flights, visas, passports, travel loans, and
            business registration — before you fill the enquiry form.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {quickTopics.map((topic) => (
              <span
                key={topic.label}
                className="rounded-full bg-boarding-paper/10 px-4 py-1.5 font-mono text-xs text-boarding-paper/80"
              >
                {topic.label}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="max-w-3xl">
          <FaqSearch items={faqs} />

          <div className="mt-14 rounded-2xl bg-boarding-paper p-8 text-center">
            <SectionHeading
              title="Still have a question?"
              description="Fill our enquiry form and we'll get back to you within 24 hours — or reach us directly on WhatsApp for urgent matters."
              align="center"
            />
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="primary">
                <Link href="/contact-us">Fill Enquiry Form</Link>
              </Button>
              <Button asChild variant="whatsapp">
                <a href="https://wa.me/2348179171456" target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
