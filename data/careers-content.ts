// Seed/fallback data for the Careers page — shaped to match the
// JobPosting model in prisma/schema.prisma. In production this is
// served from the database via Admin → Careers, not hardcoded here.

export const careersHero = {
  eyebrow: "Careers at Emunahh Global",
  headline: "Help Nigerians Move Forward — Join Our Team",
  subcopy:
    "We're building Nigeria's most trusted travel and business consulting firm. If you care about people and getting things right, we'd love to hear from you.",
};

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  isActive: boolean;
  postedAt: string;
}

export const jobOpenings: JobOpening[] = [
  {
    id: "visa-consultant",
    title: "Travel & Visa Consultant",
    department: "Travel Services",
    location: "Lagos, Nigeria (On-site)",
    type: "Full-time",
    summary:
      "Guide clients through visa applications for the UK, Canada, USA, Schengen and more — from document review to submission and follow-up.",
    responsibilities: [
      "Advise clients on visa requirements for their destination and purpose of travel",
      "Review and prepare application documents for accuracy and completeness",
      "Track application status and follow up with clients and embassies",
      "Maintain accurate records of every enquiry and application in the admin system",
    ],
    requirements: [
      "1–3 years experience in travel consulting, visa processing, or related field",
      "Strong attention to detail and document handling",
      "Excellent verbal and written communication in English",
      "Comfortable using WhatsApp, email, and basic admin software daily",
    ],
    isActive: true,
    postedAt: "2026-06-20T00:00:00.000Z",
  },
  {
    id: "customer-support",
    title: "Customer Support Officer",
    department: "Client Services",
    location: "Lagos, Nigeria (On-site)",
    type: "Full-time",
    summary:
      "Be the first point of contact for enquiries coming through WhatsApp, phone, and the website — routing them to the right service team fast.",
    responsibilities: [
      "Respond to client enquiries within our 24-hour response commitment",
      "Log and categorize enquiries accurately in the admin dashboard",
      "Escalate urgent visa, passport, and financial advisory cases promptly",
      "Follow up with clients on the status of their requests",
    ],
    requirements: [
      "Prior customer service or front-desk experience preferred",
      "Calm, friendly, and professional communication style",
      "Basic computer literacy — comfortable with spreadsheets and web apps",
    ],
    isActive: true,
    postedAt: "2026-06-15T00:00:00.000Z",
  },
];
