import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { StatStrip } from "@/components/stat-strip";
import { ContactForm } from "@/components/contact-form";
import { contactHero, contactStats, location } from "@/data/contact-content";

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ink-navy pb-16 pt-20">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">
            {contactHero.eyebrow} · {contactHero.kicker}
          </p>
          <h1 className="mt-4 max-w-2xl font-sans font-extrabold tracking-tight text-4xl leading-tight text-boarding-paper sm:text-5xl">
            {contactHero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-boarding-paper/80">{contactHero.subcopy}</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {contactHero.reassurance.map((r) => (
              <li key={r} className="rounded-full bg-boarding-paper/10 px-4 py-2 font-mono text-xs text-boarding-paper">
                {r}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <StatStrip stats={contactStats} />
          </div>
        </Container>
      </section>

      {/* FORM + INFO */}
      <section id="contact-main" className="bg-boarding-paper py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading
              eyebrow="Contact Info"
              title="We're Always Here For You"
              description="Reach us through any of the channels below. For bookings, visa and passport enquiries — always start with the form so we can track your request properly."
            />
          </div>
          <ContactForm />
        </Container>
      </section>

      {/* FAQ TEASER */}
      <section className="bg-white py-16">
        <Container className="max-w-3xl text-center">
          <SectionHeading
            eyebrow="FAQ"
            title="Got Questions?"
            description="We've answered the questions we get most often — visa destinations, passport timelines, travel loans, business registration costs, and more."
            align="center"
          />
          <Button asChild variant="primary" className="mt-6">
            <Link href="/faq">Read the Full FAQ →</Link>
          </Button>
        </Container>
      </section>

      {/* LOCATION */}
      <section className="bg-boarding-paper py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Location"
            title="Find Us in Lagos, Nigeria"
            description="We serve clients across Nigeria and beyond. Visit our office or reach us remotely — we're equipped to handle your enquiry from anywhere."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-medium text-ink-navy">📍 Office Address</dt>
                <dd className="text-slate">{location.address}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink-navy">🕐 Working Hours</dt>
                <dd className="text-slate">{location.hours}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink-navy">📞 Phone / WhatsApp</dt>
                <dd className="text-slate">{location.phone}</dd>
              </div>
              <Button asChild variant="ghost" size="sm">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 Get Directions →
                </a>
              </Button>
            </dl>

            {/* Map: uses the precise address rather than the generic
                Lagos-wide pin currently live (audit #1). Coordinates/
                Place ID to be finalized in Admin → Settings. */}
            <div className="overflow-hidden rounded-2xl ring-1 ring-ink-navy/10">
              <iframe
                title="Emunahh Global Consult office location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(location.address)}&output=embed`}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="bg-ink-navy py-20">
        <Container className="text-center">
          <h2 className="font-sans font-extrabold tracking-tight text-3xl text-boarding-paper sm:text-4xl">
            Ready to Get Moving? Fill the Form Now.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-boarding-paper/80">
            Join hundreds of Nigerians who've trusted Emunahh Global Consult. Your
            journey starts with one enquiry.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="primary">
              <a href="#contact-main">Fill Enquiry Form</a>
            </Button>
            <Button asChild variant="whatsapp">
              <a href="https://wa.me/2348179171456" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
