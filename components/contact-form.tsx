"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { formatReferenceNumber } from "@/lib/utils";
import { serviceOptions, urgencyOptions, conditionalFields } from "@/data/contact-content";

export function ContactForm() {
  const [serviceType, setServiceType] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const extraFields = serviceType ? conditionalFields[serviceType] ?? [] : [];

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // In production this posts to a server action that creates an
    // Enquiry row and returns the real sequence-based reference number.
    // Placeholder sequence shown here for the UI demo.
    const ref = formatReferenceNumber(Math.floor(Math.random() * 900000) + 100000);
    setSubmitted(ref);
  }

  if (submitted) {
    const whatsappMsg = encodeURIComponent(
      `Hello Emunahh Global, I just submitted an enquiry. My reference number is ${submitted}.`
    );
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-ink-navy/5">
        <p className="text-3xl">🎉</p>
        <h3 className="mt-2 font-display text-2xl italic text-ink-navy">Enquiry Received!</h3>
        <p className="mt-2 text-sm text-slate">
          Thank you for contacting Emunahh Global Consult. We'll get back to you within{" "}
          <strong>24 hours</strong>.
        </p>
        <p className="mt-4 font-mono text-sm text-stamp-gold">Your Ref: {submitted}</p>
        <Button asChild variant="whatsapp" className="mt-6">
          <a href={`https://wa.me/2348179171456?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer">
            Follow Up on WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-navy/5 sm:p-8">
      <h3 className="font-display text-2xl italic text-ink-navy">Send Us an Enquiry</h3>
      <p className="mt-1 text-sm text-slate">We'll get back to you within 24 hours.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="First Name" required>
          <input required type="text" name="firstName" className={inputClass} />
        </Field>
        <Field label="Last Name" required>
          <input required type="text" name="lastName" className={inputClass} />
        </Field>
        <Field label="Email" required>
          <input required type="email" name="email" className={inputClass} />
        </Field>
        <Field label="Phone" required>
          <input required type="tel" name="phone" className={inputClass} />
        </Field>

        <Field label="Service Needed" required className="sm:col-span-2">
          <select
            required
            name="serviceType"
            className={inputClass}
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="">Select a service...</option>
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </Field>

        {/* Conditional fields — change based on selected service (audit #3) */}
        {extraFields.map((field) => (
          <Field key={field.key} label={field.label}>
            <input type={field.type === "date" ? "date" : "text"} name={field.key} className={inputClass} />
          </Field>
        ))}

        <Field label="How Urgent?" className="sm:col-span-2">
          <select name="urgency" className={inputClass}>
            {urgencyOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Message / Details" required className="sm:col-span-2">
          <textarea required name="message" rows={4} className={inputClass} />
        </Field>
      </div>

      {/* Consent checkbox — fixes audit #4 (no consent flow on live site) */}
      <label className="mt-4 flex items-start gap-2 text-sm text-slate">
        <input
          required
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        I agree to the{" "}
        <a href="/privacy-policy" className="underline underline-offset-2">
          Privacy Policy
        </a>{" "}
        and consent to Emunahh Global Consult contacting me about this enquiry.
      </label>

      <Button type="submit" variant="primary" className="mt-6 w-full sm:w-auto">
        📩 Send Enquiry
      </Button>
    </form>
  );
}

const inputClass =
  "mt-1 w-full rounded-lg border border-ink-navy/15 bg-boarding-paper/40 px-3 py-2 text-sm text-ink-navy focus:border-stamp-gold focus:outline-none focus:ring-2 focus:ring-stamp-gold/40";

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block text-sm font-medium text-ink-navy ${className ?? ""}`}>
      {label} {required && <span className="text-visa-red">*</span>}
      {children}
    </label>
  );
}
