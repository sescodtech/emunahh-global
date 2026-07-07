// Seeds the live database with Emunahh Global Consult's real content.
// Safe to re-run: every model uses upsert keyed on a stable natural key
// (slug, type, singleton id, etc.) so running `npm run db:seed` again
// after an admin edits content in the DB will NOT wipe those edits for
// unrelated rows — it only touches the rows it manages here.
//
// Run with:  npm run db:seed
// (requires DATABASE_URL / DIRECT_URL to already be set in .env)

import { ServiceType, PageSlug, JobType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

async function seedAdminUser() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME ?? "Site Admin";

  if (!email || !password) {
    console.log(
      "⚠️  Skipping admin user — set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env before seeding to create your login."
    );
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: {},
    create: {
      email: email.toLowerCase(),
      name,
      password: hashed,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });
  console.log(`✅ Admin user ready: ${email}`);
}

async function seedSiteSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      companyName: "Emunahh Global Consult",
      rcNumber: "RC 8937100",
      tagline: "Travel & Financial Advisory",
      officeAddress: "Adeoye Close, Meiran Bus Stop, Lagos State, Nigeria",
      phonePrimary: "+234 817 917 1456",
      phoneSecondary: "+234 814 112 8119",
      email: "info@emunahh.com",
      workingHours: "Monday – Saturday · 8:00 AM – 7:00 PM",
      logoUrl: "/logo.png",
      instagramHandle: "Emunahhglobal",
      tiktokHandle: "Emunahhglobal",
      whatsappNumber: "2348179171456",
      whatsappDefaultMsg: "Hello Emunahh Global, I'd like to enquire about your services.",
      footerText: "Nigeria's trusted partner for travel & business consulting.",
    },
  });
  console.log("✅ Site settings seeded");
}

async function seedNavigation() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Service", href: "/service" },
    { label: "About Us", href: "/about-us" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact us", href: "/contact-us" },
  ];
  for (const [i, link] of links.entries()) {
    const existing = await prisma.navigationItem.findFirst({ where: { href: link.href } });
    if (existing) {
      await prisma.navigationItem.update({ where: { id: existing.id }, data: { ...link, order: i } });
    } else {
      await prisma.navigationItem.create({ data: { ...link, order: i } });
    }
  }
  console.log("✅ Navigation seeded");
}

async function seedServices() {
  const services: {
    type: ServiceType;
    slug: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    featureTags: string[];
    order: number;
  }[] = [
    {
      type: "FLIGHT_BOOKING",
      slug: "flight-bookings",
      title: "Flight Bookings",
      shortDescription:
        "Domestic and international flight bookings at the best fares, with instant e-ticket confirmation.",
      fullDescription:
        "We search, compare and secure the best flight deals to any destination worldwide — domestic or international. Whether you're flying for business, study, medical travel or family visits, we find the right flight at the right price with zero stress. Receive your confirmed e-ticket fast, with full 24hr support.",
      featureTags: ["Domestic Flights", "International Routes", "Best Fare Guarantee", "Fast E-Ticket", "All Airlines"],
      order: 1,
    },
    {
      type: "VISA_CONSULTANCY",
      slug: "travel-visa-consultancy",
      title: "Travel & Visa Consultancy",
      shortDescription:
        "End-to-end travel planning and visa application support for Canada, UK, USA, Schengen, Dubai and more.",
      fullDescription:
        "End-to-end travel planning and visa application support for Canada, UK, USA, Schengen, Dubai and more. We handle every document, follow up on your application and walk you through each step until your visa is approved.",
      featureTags: ["Visa Applications", "Document Prep", "Full Travel Planning"],
      order: 2,
    },
    {
      type: "PASSPORT",
      slug: "international-passport",
      title: "International Passport",
      shortDescription: "New passport applications and renewals made simple, from biometrics to collection.",
      fullDescription:
        "New passport applications and renewals made simple. We guide you through the full NIS process — from form completion and biometrics scheduling all the way to collection — with fast turnaround and zero confusion.",
      featureTags: ["New Applications", "Renewals", "Fast Turnaround"],
      order: 3,
    },
    {
      type: "FINANCIAL_ADVISORY",
      slug: "financial-advisory",
      title: "Financial Advisory",
      shortDescription: "Travel loans, business capital and strategic financial planning tailored to your goal.",
      fullDescription:
        "We connect individuals and businesses with the right financial tools — including travel loans, business capital and strategic financial planning. Whatever your funding goal, we help you access the right resources.",
      featureTags: ["Travel Loans", "Business Capital", "Financial Planning"],
      order: 4,
    },
    {
      type: "CAC_REGISTRATION",
      slug: "business-registration",
      title: "Business Registration",
      shortDescription: "From CAC name search to certificate collection, handled end-to-end.",
      fullDescription:
        "From CAC name search to certificate collection — we manage your full business registration professionally and efficiently. Sole proprietorships, limited liability companies and NGOs all handled end-to-end.",
      featureTags: ["CAC Registration", "All Business Types", "End-to-End Support"],
      order: 5,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { type: s.type },
      update: { ...s },
      create: { ...s, isActive: true },
    });
  }
  console.log("✅ Services seeded");
}

async function seedCoreValues() {
  const values = [
    { title: "Integrity", description: "We are honest and transparent in everything we do. No hidden fees, no misleading promises — ever.", icon: "🤝", order: 1 },
    { title: "Excellence", description: "We deliver quality service at all times, holding ourselves to the highest standard on every engagement.", icon: "⭐", order: 2 },
    { title: "Empowerment", description: "We equip our clients with the knowledge and tools to achieve more — beyond just the service we provide.", icon: "🚀", order: 3 },
    { title: "Accessibility", description: "We make our services available to everyone. World-class consulting should not be a privilege for the few.", icon: "🔓", order: 4 },
    { title: "Innovation", description: "We constantly find smarter, faster ways to serve our clients — adapting and improving with every experience.", icon: "💡", order: 5 },
  ];
  for (const v of values) {
    const existing = await prisma.coreValue.findFirst({ where: { title: v.title } });
    if (existing) await prisma.coreValue.update({ where: { id: existing.id }, data: v });
    else await prisma.coreValue.create({ data: v });
  }
  console.log("✅ Core values seeded");
}

async function seedTeamMembers() {
  const team = [
    {
      name: "Faith Omini Ufala",
      role: "Director & Co-Founder",
      bio: "A passionate advocate for accessible travel and financial services, Faith co-founded Emunahh Global Consult with a clear vision — to help everyday Nigerians achieve their travel dreams and business goals with professionalism and care.",
      order: 1,
    },
    {
      name: "Daniel Ikuromowei Anomietei",
      role: "Director & Co-Founder",
      bio: "With deep expertise in financial advisory and business consulting, Daniel drives the strategic direction of Emunahh Global Consult, ensuring every client receives reliable, transparent, and results-driven service.",
      order: 2,
    },
  ];
  for (const m of team) {
    const existing = await prisma.teamMember.findFirst({ where: { name: m.name } });
    if (existing) await prisma.teamMember.update({ where: { id: existing.id }, data: { ...m, isActive: true } });
    else await prisma.teamMember.create({ data: { ...m, isActive: true } });
  }
  console.log("✅ Team members seeded");
}

async function seedProblemsSolved() {
  const problems = [
    "Flight bookings to any destination worldwide",
    "Travel consultancy & visa documentation guidance",
    "International passport applications & renewals",
    "Travel loans for international travel",
    "Financial advisory & access to business capital",
    "Business registration from start to certificate",
    "Bridging the gap between founders and funding",
  ];
  for (const [i, text] of problems.entries()) {
    const existing = await prisma.problemSolved.findFirst({ where: { text } });
    if (!existing) await prisma.problemSolved.create({ data: { text, order: i } });
  }
  console.log("✅ Problems-we-solve seeded");
}

async function seedProcessSteps() {
  const homeSteps = [
    { step: 1, title: "Fill the Form", description: "Fill our enquiry form from anywhere in Nigeria. Tell us your destination and what service you need." },
    { step: 2, title: "Get a Quote", description: "We find the best fares and packages for you — transparent pricing with zero hidden fees." },
    { step: 3, title: "We Handle Everything", description: "Ticket booking, visa documents, hotel options — our team manages every single detail for you." },
    { step: 4, title: "Take Off!", description: "Receive your confirmed ticket and travel documents. All you need to do is pack and fly!" },
  ];
  const serviceSteps = [
    { step: 1, title: "Fill the Form", description: "Fill our enquiry form from anywhere in Nigeria. Tell us your destination and what service you need." },
    { step: 2, title: "Consultation", description: "We assess your situation and recommend the best service path tailored specifically for you." },
    { step: 3, title: "We Handle It", description: "Our team processes your request with precision and speed — keeping you updated throughout." },
    { step: 4, title: "You Succeed", description: "Receive your results and achieve your travel, financial or business goal — stress-free." },
  ];

  for (const s of homeSteps) {
    await prisma.processStep.upsert({
      where: { page_stepNumber: { page: PageSlug.HOME, stepNumber: s.step } },
      update: { title: s.title, description: s.description },
      create: { page: PageSlug.HOME, stepNumber: s.step, title: s.title, description: s.description },
    });
  }
  for (const s of serviceSteps) {
    await prisma.processStep.upsert({
      where: { page_stepNumber: { page: PageSlug.SERVICE, stepNumber: s.step } },
      update: { title: s.title, description: s.description },
      create: { page: PageSlug.SERVICE, stepNumber: s.step, title: s.title, description: s.description },
    });
  }
  console.log("✅ Process steps seeded");
}

async function seedTestimonials() {
  const testimonials = [
    {
      clientName: "Chidinma Okafor",
      roleOrCity: "Nurse Practitioner · Lagos",
      quote:
        "Emunahh Global sorted my UK visa and flight from Lagos to London in less than one week! I had been struggling with another agent for months. Very professional and trustworthy people.",
      rating: 5,
      serviceType: ServiceType.VISA_CONSULTANCY,
      isVerified: true,
      order: 1,
    },
    {
      clientName: "Emeka Nwosu",
      roleOrCity: "Petroleum Engineer · Port Harcourt",
      quote:
        "My Canadian visa was approved first attempt after Emunahh Global handled my complete application. They explained every document, followed up constantly, and delivered.",
      rating: 5,
      serviceType: ServiceType.VISA_CONSULTANCY,
      isVerified: true,
      order: 2,
    },
    {
      clientName: "Adaeze Onyekachi",
      roleOrCity: "Fashion Designer · Lagos",
      quote:
        "I wanted to travel to Paris for my fashion show and did not know how to get a Schengen visa. Emunahh Global walked me through every step. My visa was approved in 10 days.",
      rating: 5,
      serviceType: ServiceType.VISA_CONSULTANCY,
      isVerified: true,
      order: 3,
    },
  ];
  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { clientName: t.clientName } });
    if (existing) await prisma.testimonial.update({ where: { id: existing.id }, data: { ...t, isActive: true } });
    else await prisma.testimonial.create({ data: { ...t, isActive: true } });
  }
  console.log("✅ Testimonials seeded");
}

async function seedFaqs() {
  const faqs = [
    { question: "How do I book a flight through Emunahh Global?", answer: "Fill the enquiry form with your travel details — destination, travel date, number of passengers and preferred airline if any. We'll search for the best available fare and send you options within a few hours." },
    { question: "What visa destinations do you cover?", answer: "We assist with visa applications for Canada, UK, USA, Schengen countries, Dubai, and many more. Send us an enquiry and we'll advise on requirements, documents and processing times." },
    { question: "How long does passport processing take?", answer: "Standard processing through NIS takes 6–8 weeks. We help you complete forms correctly, schedule biometrics and track progress — reducing errors that cause delays." },
    { question: "What is Financial Advisory / Travel Loan?", answer: "Our Travel Loan service helps you access the funds you need to travel — including facilitation support for individuals who need financing for flights, visas, or related travel costs. We also offer business capital advisory and strategic financial planning for individuals and SMEs." },
    { question: "How much does business registration (CAC) cost?", answer: "Costs vary by business type — sole proprietorship, limited liability company or NGO. Fill the enquiry form and we'll send you a full breakdown with no hidden charges." },
    { question: "Why should I fill the form instead of calling directly?", answer: "The form gives us all the details we need to prepare a proper response before calling you. It also generates a reference number so your enquiry is tracked from start to finish — no details lost." },
  ];
  for (const [i, f] of faqs.entries()) {
    const existing = await prisma.faq.findFirst({ where: { question: f.question } });
    if (existing) await prisma.faq.update({ where: { id: existing.id }, data: { ...f, order: i, isActive: true } });
    else await prisma.faq.create({ data: { ...f, order: i, isActive: true } });
  }
  console.log("✅ FAQs seeded");
}

async function seedJobPostings() {
  const jobs = [
    {
      title: "Travel & Visa Consultant",
      department: "Travel Services",
      location: "Lagos, Nigeria (On-site)",
      type: JobType.FULL_TIME,
      summary: "Guide clients through visa applications for the UK, Canada, USA, Schengen and more — from document review to submission and follow-up.",
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
    },
    {
      title: "Customer Support Officer",
      department: "Client Services",
      location: "Lagos, Nigeria (On-site)",
      type: JobType.FULL_TIME,
      summary: "Be the first point of contact for enquiries coming through WhatsApp, phone, and the website — routing them to the right service team fast.",
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
    },
  ];
  for (const j of jobs) {
    const existing = await prisma.jobPosting.findFirst({ where: { title: j.title } });
    if (existing) await prisma.jobPosting.update({ where: { id: existing.id }, data: { ...j, isActive: true } });
    else await prisma.jobPosting.create({ data: { ...j, isActive: true } });
  }
  console.log("✅ Job postings seeded");
}

async function seedBlogPosts() {
  const posts = [
    {
      slug: "uk-visitor-visa-checklist-2026",
      title: "The Complete UK Visitor Visa Checklist for Nigerians (2026)",
      excerpt: "Everything you need to prepare before you apply for a UK visitor visa — from bank statements to invitation letters.",
      content:
        "Applying for a UK visitor visa can feel overwhelming, especially with how often requirements seem to change. Here's what actually matters in 2026.\n\nFirst, your financial documents need to show a consistent pattern, not just a healthy balance the week before you apply. Embassies look for stability over the last six months.\n\nSecond, your travel itinerary should be realistic and specific — flight bookings, accommodation, and a clear purpose of visit all strengthen your application.\n\nThird, ties to Nigeria matter more than people realize. Proof of employment, property, or family responsibilities all help demonstrate that you intend to return.\n\nWe handle this process end-to-end for our clients, reviewing every document before submission so nothing is left to chance.",
      tags: ["Visa", "UK", "Travel Tips"],
    },
  ];
  for (const p of posts) {
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: { ...p, isActive: true },
      create: { ...p, isActive: true },
    });
  }
  console.log("✅ Blog posts seeded");
}

export async function runSeed() {
  console.log("🌱 Seeding Emunahh Global database...\n");
  await seedAdminUser();
  await seedSiteSettings();
  await seedNavigation();
  await seedServices();
  await seedCoreValues();
  await seedTeamMembers();
  await seedProblemsSolved();
  await seedProcessSteps();
  await seedTestimonials();
  await seedFaqs();
  await seedJobPostings();
  await seedBlogPosts();
  console.log("\n✅ Done. Your live database now has real content.");
}
