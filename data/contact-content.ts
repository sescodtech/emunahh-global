// Verbatim content transcribed from https://emunahh.com/contact-us/
// Note: the live page's location section literally just says "Lagos,
// Nigeria" while the About page gives the full office address. V2 uses
// the full, accurate address consistently (Adeoye Close, Meiran Bus
// Stop, Lagos State) rather than repeating the vaguer version.

export const contactHero = {
  eyebrow: "Contact Us — Emunahh Global Consult",
  kicker: "Get In Touch",
  headline: "Let's Start Your Journey Together",
  subcopy:
    "Fill our enquiry form and we'll get back to you within 24 hours. For urgent matters, reach us on WhatsApp after submitting.",
  reassurance: ["📋 Fill the Form First", "⚡ Fast Response", "🔒 Your Info is Safe"],
};

export const contactStats = [
  { label: "Response Time", value: "24hr" },
  { label: "Clients Served", value: "500+" },
  { label: "Client Rating", value: "5★" },
];

export const serviceOptions = [
  { value: "FLIGHT_BOOKING", label: "✈️ Flight Booking" },
  { value: "VISA_CONSULTANCY", label: "🌍 Travel & Visa Consultancy" },
  { value: "PASSPORT", label: "📘 International Passport" },
  { value: "FINANCIAL_ADVISORY", label: "💰 Financial Advisory / Travel Loan" },
  { value: "CAC_REGISTRATION", label: "🏢 Business Registration (CAC)" },
  { value: "GENERAL_INQUIRY", label: "❓ General Inquiry" },
];

export const urgencyOptions = [
  { value: "STANDARD", label: "Just exploring" },
  { value: "WITHIN_WEEK", label: "Within a week" },
  { value: "WITHIN_MONTH", label: "Within a month" },
  { value: "URGENT", label: "Urgent – ASAP" },
];

// Drives the smart conditional fields (fixes audit #3 — one form for
// five very different services). Matches the EnquiryFieldSpec shape
// in the Prisma schema.
export const conditionalFields: Record<string, { key: string; label: string; type: string }[]> = {
  FLIGHT_BOOKING: [
    { key: "destination", label: "Destination", type: "text" },
    { key: "travelDate", label: "Preferred Travel Date", type: "date" },
    { key: "passengers", label: "Number of Passengers", type: "text" },
  ],
  VISA_CONSULTANCY: [
    { key: "destinationCountry", label: "Destination Country", type: "text" },
    { key: "travelDate", label: "Intended Travel Date", type: "date" },
  ],
  PASSPORT: [
    { key: "applicationType", label: "New Application or Renewal", type: "select" },
  ],
  FINANCIAL_ADVISORY: [
    { key: "goalType", label: "Travel Loan / Business Capital / Financial Planning", type: "text" },
  ],
  CAC_REGISTRATION: [
    { key: "companyName", label: "Proposed Company Name", type: "text" },
    { key: "businessType", label: "Sole Proprietorship / LLC / NGO", type: "text" },
  ],
  GENERAL_INQUIRY: [],
};

export const faqs = [
  {
    id: "book-flight",
    question: "How do I book a flight through Emunahh Global?",
    answer:
      "Fill the enquiry form with your travel details — destination, travel date, number of passengers and preferred airline if any. We'll search for the best available fare and send you options within a few hours.",
  },
  {
    id: "visa-destinations",
    question: "What visa destinations do you cover?",
    answer:
      "We assist with visa applications for Canada, UK, USA, Schengen countries, Dubai, and many more. Send us an enquiry and we'll advise on requirements, documents and processing times.",
  },
  {
    id: "passport-time",
    question: "How long does passport processing take?",
    answer:
      "Standard processing through NIS takes 6–8 weeks. We help you complete forms correctly, schedule biometrics and track progress — reducing errors that cause delays.",
  },
  {
    id: "travel-loan",
    question: "What is Financial Advisory / Travel Loan?",
    answer:
      "Our Travel Loan service helps you access the funds you need to travel — including facilitation support for individuals who need financing for flights, visas, or related travel costs. We also offer business capital advisory and strategic financial planning for individuals and SMEs.",
  },
  {
    id: "cac-cost",
    question: "How much does business registration (CAC) cost?",
    answer:
      "Costs vary by business type — sole proprietorship, limited liability company or NGO. Fill the enquiry form and we'll send you a full breakdown with no hidden charges.",
  },
  {
    id: "why-form",
    question: "Why should I fill the form instead of calling directly?",
    answer:
      "The form gives us all the details we need to prepare a proper response before calling you. It also generates a reference number so your enquiry is tracked from start to finish — no details lost.",
  },
];

export const location = {
  address: "Adeoye Close, Meiran Bus Stop, Lagos State, Nigeria",
  hours: "Monday – Saturday: 8:00am – 7:00pm",
  phone: "+234 817 917 1456",
  // Placeholder until the real Place ID/coordinates are confirmed —
  // fixes audit #1 (live site currently shows a generic Lagos pin).
  mapPlaceholderNote:
    "Precise coordinates/Place ID to be confirmed and set in Admin → Settings before launch.",
};
