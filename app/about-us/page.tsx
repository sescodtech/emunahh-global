import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { StatStrip } from "@/components/stat-strip";
import {
  aboutHero,
  aboutStats,
  companyCard,
  ourStory,
  mission,
  vision,
  coreValues,
  leadership,
  companyDetails,
  problemsWeSolve,
} from "@/data/about-content";

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ink-navy pb-16 pt-20">
        <Container className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">
              {aboutHero.eyebrow} · {aboutHero.kicker}
            </p>
            <h1 className="mt-4 font-display text-4xl italic leading-tight text-boarding-paper sm:text-5xl">
              {aboutHero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-boarding-paper/80">{aboutHero.subcopy}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="primary">
                <Link href={aboutHero.ctaPrimary.href}>{aboutHero.ctaPrimary.label}</Link>
              </Button>
              <Button asChild variant="secondary">
                <a href={aboutHero.ctaSecondary.href}>{aboutHero.ctaSecondary.label}</a>
              </Button>
            </div>
            <div className="mt-10">
              <StatStrip stats={aboutStats} />
            </div>
          </div>

          {/* Company card */}
          <div className="rounded-2xl bg-boarding-paper p-6">
            <p className="font-display text-lg italic text-ink-navy">Emunahh Global Consult</p>
            <p className="font-mono text-xs text-slate">{companyCard.rcNumber}</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-medium text-ink-navy">📍 Office Address</dt>
                <dd className="text-slate">{companyCard.address}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink-navy">📞 Phone</dt>
                <dd className="text-slate">{companyCard.phones.join(" · ")}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink-navy">✉️ Email</dt>
                <dd className="text-slate">{companyCard.email}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink-navy">📱 Social Media</dt>
                <dd className="text-slate">{companyCard.instagram} · {companyCard.tiktok}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      {/* OUR STORY */}
      <section id="story" className="bg-white py-20">
        <Container className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">
            {ourStory.eyebrow} · {ourStory.year}
          </p>
          <h2 className="mt-3 font-display text-3xl italic text-ink-navy sm:text-4xl">
            {ourStory.heading}
          </h2>
          {ourStory.paragraphs.map((p) => (
            <p key={p} className="mt-4 text-slate leading-relaxed">{p}</p>
          ))}
          <blockquote className="mt-6 border-l-2 border-stamp-gold pl-4 font-display text-xl italic text-ink-navy">
            "{ourStory.quote}"
            <footer className="mt-2 font-mono text-xs not-italic text-slate">
              — {ourStory.quoteAttribution}
            </footer>
          </blockquote>
          {ourStory.closingParagraphs.map((p) => (
            <p key={p} className="mt-4 text-slate leading-relaxed">{p}</p>
          ))}
        </Container>
      </section>

      {/* MISSION / VISION */}
      <section className="bg-boarding-paper py-20">
        <Container className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">Our Mission</p>
            <h3 className="mt-2 font-display text-xl italic text-ink-navy">{mission.heading}</h3>
            <p className="mt-2 text-sm text-slate">{mission.body}</p>
          </div>
          <div className="rounded-2xl bg-white p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-stamp-gold">Our Vision</p>
            <h3 className="mt-2 font-display text-xl italic text-ink-navy">{vision.heading}</h3>
            <p className="mt-2 text-sm text-slate">{vision.body}</p>
          </div>
        </Container>
      </section>

      {/* CORE VALUES */}
      <section className="bg-white py-20">
        <Container>
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Core Values"
            description="Five principles that define how we work, how we treat our clients, and the standard every team member is held to every single day."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((v) => (
              <div key={v.title} className="rounded-2xl bg-boarding-paper p-5">
                <span aria-hidden className="text-2xl">{v.icon}</span>
                <p className="mt-2 font-body font-medium text-ink-navy">{v.title}</p>
                <p className="mt-1 text-sm text-slate">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-boarding-paper py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Leadership"
            title="The Visionaries Behind the Mission"
            description="Emunahh Global Consult is led by two dedicated directors who bring passion, expertise and an unwavering commitment to client success."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {leadership.map((p) => (
              <div key={p.name} className="rounded-2xl bg-white p-6">
                <Image
                  src={p.photo}
                  alt={p.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <p className="mt-3 font-body font-medium text-ink-navy">{p.name}</p>
                <p className="font-mono text-xs text-stamp-gold">{p.role}</p>
                <p className="mt-2 text-sm text-slate">{p.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* COMPANY DETAILS + PROBLEMS WE SOLVE */}
      <section className="bg-white py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Company Details" title="Registered & Ready to Serve" />
            <ul className="mt-6 space-y-3">
              {companyDetails.map((d) => (
                <li key={d.label} className="flex gap-3 text-sm">
                  <span aria-hidden>{d.icon}</span>
                  <span className="font-medium text-ink-navy">{d.label}:</span>
                  <span className="text-slate">{d.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="What We Solve" title="Problems We Fix For You" />
            <ul className="mt-6 space-y-2">
              {problemsWeSolve.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-slate">
                  <span aria-hidden className="text-approved-green">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="bg-ink-navy py-20">
        <Container className="text-center">
          <h2 className="font-display text-3xl italic text-boarding-paper sm:text-4xl">
            Now You Know Who We Are. Let's Work Together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-boarding-paper/80">
            Whether you need to book a flight, sort your passport, secure funding or
            register your business — we are ready. Fill the form and let's make your
            next move happen.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="primary">
              <Link href="/contact-us">Fill Enquiry Form</Link>
            </Button>
            <Button asChild variant="whatsapp">
              <a href="https://wa.me/2348179171456" target="_blank" rel="noopener noreferrer">
                Urgent? WhatsApp Us
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
