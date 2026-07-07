import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { formatReferenceNumber } from "@/lib/utils";

const VALID_SERVICE_TYPES = new Set([
  "FLIGHT_BOOKING",
  "VISA_CONSULTANCY",
  "PASSPORT",
  "FINANCIAL_ADVISORY",
  "CAC_REGISTRATION",
  "GENERAL_INQUIRY",
]);

const VALID_URGENCY = new Set(["STANDARD", "PRIORITY", "URGENT", "EMERGENCY"]);

// Basic in-memory rate limiting per server instance — a lightweight
// first line of defense against form-spam bots. For serious abuse
// protection, put this route behind Vercel WAF / Cloudflare rate
// limiting as well.
const submissionLog = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      serviceType,
      urgency,
      message,
      consentGiven,
      conditionalData,
      // honeypot field — real users never fill this in; bots often do
      website,
    } = body ?? {};

    if (website) {
      // Silently pretend success to bots without touching the DB.
      return NextResponse.json({ referenceNumber: formatReferenceNumber(0) }, { status: 201 });
    }

    if (!firstName || !lastName || !email || !phone || !serviceType) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!VALID_SERVICE_TYPES.has(serviceType)) {
      return NextResponse.json({ error: "Invalid service type." }, { status: 400 });
    }
    if (urgency && !VALID_URGENCY.has(urgency)) {
      return NextResponse.json({ error: "Invalid urgency level." }, { status: 400 });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (!consentGiven) {
      return NextResponse.json({ error: "Consent is required to submit an enquiry." }, { status: 400 });
    }

    const year = new Date().getFullYear();
    const yearStart = new Date(`${year}-01-01T00:00:00.000Z`);
    const countThisYear = await prisma.enquiry.count({ where: { createdAt: { gte: yearStart } } });
    const referenceNumber = formatReferenceNumber(countThisYear + 1, year);

    const enquiry = await prisma.enquiry.create({
      data: {
        referenceNumber,
        firstName: String(firstName).trim().slice(0, 100),
        lastName: String(lastName).trim().slice(0, 100),
        email: String(email).trim().toLowerCase().slice(0, 200),
        phone: String(phone).trim().slice(0, 30),
        serviceType,
        urgency: urgency ?? "STANDARD",
        message: message ? String(message).trim().slice(0, 4000) : null,
        conditionalData: conditionalData ?? {},
        consentGiven: true,
        consentAt: new Date(),
        status: "NEW",
      },
    });

    return NextResponse.json({ referenceNumber: enquiry.referenceNumber }, { status: 201 });
  } catch (err) {
    console.error("Enquiry submission failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or reach us on WhatsApp." },
      { status: 500 }
    );
  }
}
