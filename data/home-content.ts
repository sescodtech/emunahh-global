// Verbatim content transcribed from https://emunahh.com/ (fetched fresh
// for Phase 6). This is seed/fallback data shaped to match the Prisma
// schema — in production this is served from the database via the
// Admin Dashboard, not hardcoded here.

export const homeHero = {
  eyebrow: "Emunahh Global Consult | Nigeria's Trusted Travel & Business Consultants",
  headline: "Your Trusted Partner for Global Travel & Business Capital in Nigeria",
  subcopy:
    "Nigeria's most trusted travel and business consulting firm. We handle your flights, visas, passports, business registration and financial advisory — wherever you are in Nigeria. 🇳🇬✈️",
  ctaPrimary: { label: "Book a Flight", href: "/contact-us" },
  ctaSecondary: {
    label: "Chat on WhatsApp",
    href: "https://wa.me/2348179171456",
  },
  stampBadgeLabel: "Visa Approved · Canada · UK · Schengen",
};

export const homeStats = [
  { label: "Clients Served", value: "500+" },
  { label: "Visa Success", value: "98%" },
  { label: "Processing", value: "72hrs" },
  { label: "Destinations", value: "50+" },
];

export const routeMarquee = [
  "Nigeria → London",
  "Nigeria → Dubai",
  "Nigeria → Toronto",
  "Nigeria → Houston",
  "Nigeria → Paris",
  "Nigeria → Johannesburg",
  "Nigeria → Accra",
  "Nigeria → Amsterdam",
  "Nigeria → New York",
  "Nigeria → Nairobi",
];

export const destinations = [
  {
    name: "United Kingdom — London",
    routeCode: "Nigeria → Heathrow · Direct & Connecting Flights",
    flag: "🇬🇧",
    featured: true,
  },
  { name: "Dubai, UAE", flag: "🇦🇪" },
  { name: "Toronto, Canada", flag: "🇨🇦" },
  { name: "Houston, USA", flag: "🇺🇸" },
  { name: "Paris, France", flag: "🇫🇷" },
];

export const services = [
  {
    index: 1,
    title: "Flight Bookings",
    description:
      "Domestic and international flight bookings at the best fares. We search across airlines to get you the most competitive price — with instant e-ticket confirmation and 24hr support.",
    cta: "Book Now",
  },
  {
    index: 2,
    title: "Travel & Visa Consultancy",
    description:
      "End-to-end travel planning and visa application support for Canada, UK, USA, Schengen, Dubai and more. We handle documentation, guidance and follow-up until your visa is approved.",
    cta: "Learn More",
  },
  {
    index: 3,
    title: "International Passport",
    description:
      "New applications and renewals made simple. We guide you through the full NIS process — from form completion and biometrics scheduling to collection — with fast turnaround and zero hassle.",
    cta: "Learn More",
  },
  {
    index: 4,
    title: "Financial Advisory",
    description:
      "Access travel loans, business capital and strategic financial planning. We connect individuals and businesses with the right funding solutions to achieve their goals.",
    cta: "Learn More",
  },
  {
    index: 5,
    title: "Business Registration (CAC)",
    description:
      "Register your business with the Corporate Affairs Commission quickly and correctly. We handle sole proprietorships, limited liability companies and NGOs — end-to-end with all documentation sorted.",
    cta: "Learn More",
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Fill the Form",
    description:
      "Fill our enquiry form from anywhere in Nigeria. Tell us your destination and what service you need.",
  },
  {
    step: 2,
    title: "Get a Quote",
    description:
      "We find the best fares and packages for you — transparent pricing with zero hidden fees.",
  },
  {
    step: 3,
    title: "We Handle Everything",
    description:
      "Ticket booking, visa documents, hotel options — our team manages every single detail for you.",
  },
  {
    step: 4,
    title: "Take Off! ✈️",
    description:
      "Receive your confirmed ticket and travel documents. All you need to do is pack and fly!",
  },
];

export const aboutTeaser = {
  heading: "Built for Every Nigerian Who Wants to Fly.",
  body: "Emunahh Global Consult was founded with one mission — to help Nigerians travel the world without stress, confusion, or being misled by fake agents. We serve clients nationwide and we are your travel family.",
  registrationLine: "CAC Registered · RC No. 8937100 · Lagos, Nigeria",
  bullets: [
    {
      title: "Fully Licensed — RC 8937100",
      body: "100% legitimate business. You always know exactly who you are dealing with.",
    },
    {
      title: "End-to-End Travel Support",
      body: "We manage every step ourselves — from flight search to visa processing to departure day.",
    },
    {
      title: "Proven Track Record",
      body: "Over 500+ Nigerians helped. 98% visa success rate. Results speak for themselves.",
    },
  ],
};

export const testimonials = [
  {
    id: "chidinma",
    clientName: "Chidinma Okafor",
    roleOrCity: "Nurse Practitioner · Lagos",
    quote:
      "Emunahh Global sorted my UK visa and flight from Lagos to London in less than one week! I had been struggling with another agent for months. Very professional and trustworthy people. I am recommending them to all my family and friends.",
    rating: 5,
    serviceTag: "UK Visa + Flight Booking",
    isVerified: true,
  },
  {
    id: "emeka",
    clientName: "Emeka Nwosu",
    roleOrCity: "Petroleum Engineer · Port Harcourt",
    quote:
      "My Canadian visa was approved first attempt after Emunahh Global handled my complete application. They explained every document, followed up constantly, and delivered. I have referred colleagues and all got their visas too. Absolutely wonderful!",
    rating: 5,
    serviceTag: "Canada Visa + Flight",
    isVerified: true,
  },
  {
    id: "adaeze",
    clientName: "Adaeze Onyekachi",
    roleOrCity: "Fashion Designer · Lagos",
    quote:
      "I wanted to travel to Paris for my fashion show and did not know how to get a Schengen visa. Emunahh Global walked me through every step. My visa was approved in 10 days and I was on my flight to Paris with zero stress. A true blessing!",
    rating: 5,
    serviceTag: "Schengen Visa + Paris Flight",
    isVerified: true,
  },
];

export const siteSettings = {
  companyName: "Emunahh Global Consult",
  tagline: "Travel & Financial Advisory",
  rcNumber: "RC 8937100",
  phonePrimary: "+234 817 917 1456",
  phoneSecondary: "+234 814 112 8119",
  email: "info@emunahh.com",
  officeAddress: "Adeoye Close, Meiran Bus Stop, Lagos State, Nigeria",
  workingHours: "Monday – Saturday · 8:00 AM – 7:00 PM",
  logoUrl: "/logo.png",
  instagramHandle: "Emunahhglobal",
  tiktokHandle: "Emunahhglobal",
  facebookUrl: "",
  linkedinUrl: "",
  youtubeUrl: "",
  xUrl: "",
  whatsappNumber: "2348179171456",
};

// Every item shown directly in the desktop nav — no hidden "More" menu.
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Service", href: "/service" },
  { label: "About Us", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact us", href: "/contact-us" },
];
