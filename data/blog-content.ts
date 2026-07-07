// Seed/fallback data for the Blog — shaped to match the BlogPost model
// in prisma/schema.prisma. In production this is served from the
// database via Admin → Blog, not hardcoded here.

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // simple paragraphs, split on double newline
  coverEmoji: string;
  author: string;
  publishedAt: string;
  tags: string[];
  isActive: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "uk-visitor-visa-checklist-2026",
    title: "The Complete UK Visitor Visa Checklist for Nigerians (2026)",
    excerpt:
      "Everything you need to prepare before you apply for a UK visitor visa — from bank statements to invitation letters.",
    content:
      "Applying for a UK visitor visa can feel overwhelming, especially with how often requirements seem to change. Here's what actually matters in 2026.\n\nFirst, your financial documents need to show a consistent pattern, not just a healthy balance the week before you apply. Embassies look for stability over the last six months.\n\nSecond, your travel itinerary should be realistic and specific — flight bookings, accommodation, and a clear purpose of visit all strengthen your application.\n\nThird, ties to Nigeria matter more than people realize. Proof of employment, property, or family responsibilities all help demonstrate that you intend to return.\n\nWe handle this process end-to-end for our clients, reviewing every document before submission so nothing gets rejected over an avoidable mistake.",
    coverEmoji: "🇬🇧",
    author: "Emunahh Global Team",
    publishedAt: "2026-06-25T00:00:00.000Z",
    tags: ["Visa", "United Kingdom", "Travel Tips"],
    isActive: true,
  },
  {
    id: "2",
    slug: "how-travel-loans-work",
    title: "How Travel Loans Work — and When They Make Sense",
    excerpt:
      "A plain-English breakdown of travel loan facilitation: what it covers, what it costs, and how to know if it's right for your trip.",
    content:
      "A travel loan helps cover the cost of flights, visa fees, or accommodation when you don't want to pay everything upfront.\n\nWe work with individuals to structure financing that fits their travel timeline — usually repaid over a few months after your trip is booked.\n\nThis isn't the same as a Proof of Funds letter, which is a completely different document embassies use to confirm you can support yourself during your trip. We keep these two services clearly separate so there's no confusion about what you're applying for.\n\nIf you're considering a travel loan, the most important thing is being realistic about your repayment plan before you commit — we'll walk you through the numbers honestly.",
    coverEmoji: "💳",
    author: "Emunahh Global Team",
    publishedAt: "2026-06-10T00:00:00.000Z",
    tags: ["Financial Advisory", "Travel Loans"],
    isActive: true,
  },
  {
    id: "3",
    slug: "cac-registration-business-types-explained",
    title: "Sole Proprietorship, LLC, or NGO? Choosing the Right CAC Registration",
    excerpt:
      "A quick guide to the three most common business structures Nigerians register — and how to pick the right one for your goals.",
    content:
      "One of the most common questions we get is which business structure to register with the CAC. Here's the short version.\n\nA sole proprietorship (business name) is the fastest and cheapest option — ideal if you're just starting out and want to formalize a small business quickly.\n\nA limited liability company (LLC) separates your personal assets from your business's liabilities, which matters as soon as you start taking on contracts, hiring staff, or seeking investment.\n\nAn NGO registration is for organizations pursuing a social, charitable, or community mission rather than profit — the requirements and reporting obligations are different from a standard business.\n\nWe help clients pick the right structure before registration, not after, since changing structures later costs more time and money than getting it right the first time.",
    coverEmoji: "🏢",
    author: "Emunahh Global Team",
    publishedAt: "2026-05-28T00:00:00.000Z",
    tags: ["Business Registration", "CAC"],
    isActive: true,
  },
];
