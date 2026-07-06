// Shared display helpers for the Enquiry model (see prisma/schema.prisma).
// Centralised here so the Enquiries table, the detail drawer, and the
// Dashboard overview all render the same labels/colors without drift.

export type ServiceType =
  | "FLIGHT_BOOKING"
  | "VISA_CONSULTANCY"
  | "PASSPORT"
  | "FINANCIAL_ADVISORY"
  | "CAC_REGISTRATION";

export type UrgencyLevel = "STANDARD" | "PRIORITY" | "URGENT" | "EMERGENCY";

export type EnquiryStatus = "NEW" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export interface Enquiry {
  id: string;
  referenceNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  urgency: UrgencyLevel;
  message: string | null;
  status: EnquiryStatus;
  createdAt: string; // ISO date
}

export const serviceLabels: Record<ServiceType, string> = {
  FLIGHT_BOOKING: "Flight Bookings",
  VISA_CONSULTANCY: "Travel & Visa Consultancy",
  PASSPORT: "International Passport",
  FINANCIAL_ADVISORY: "Financial Advisory",
  CAC_REGISTRATION: "Business Registration (CAC)",
};

export const urgencyLabels: Record<UrgencyLevel, string> = {
  STANDARD: "Within a month",
  PRIORITY: "This week",
  URGENT: "Urgent — ASAP",
  EMERGENCY: "Emergency",
};

export const urgencyStyles: Record<UrgencyLevel, string> = {
  STANDARD: "bg-slate/10 text-slate ring-1 ring-slate/20",
  PRIORITY: "bg-stamp-gold/10 text-stamp-gold ring-1 ring-stamp-gold/25",
  URGENT: "bg-visa-red/10 text-visa-red ring-1 ring-visa-red/25",
  EMERGENCY: "bg-visa-red text-boarding-paper ring-1 ring-visa-red",
};

export const statusLabels: Record<EnquiryStatus, string> = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

export const statusStyles: Record<EnquiryStatus, string> = {
  NEW: "bg-approved-green/10 text-approved-green ring-1 ring-approved-green/25",
  IN_PROGRESS: "bg-stamp-gold/10 text-stamp-gold ring-1 ring-stamp-gold/25",
  RESOLVED: "bg-ink-navy/10 text-ink-navy ring-1 ring-ink-navy/20",
  CLOSED: "bg-slate/10 text-slate ring-1 ring-slate/20",
};

export function fullName(e: Pick<Enquiry, "firstName" | "lastName">) {
  return `${e.firstName} ${e.lastName}`.trim();
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function whatsappLink(phone: string, referenceNumber: string) {
  const digits = phone.replace(/[^\d]/g, "");
  const msg = encodeURIComponent(
    `Hello, this is Emunahh Global Consult following up on your enquiry (Ref: ${referenceNumber}).`
  );
  return `https://wa.me/${digits}?text=${msg}`;
}

export function mailtoLink(email: string, referenceNumber: string) {
  const subject = encodeURIComponent(`Your Emunahh Global enquiry — ${referenceNumber}`);
  return `mailto:${email}?subject=${subject}`;
}

// ----------------------------------------------------------------
// TEMPORARY DEMO DATA
// Shaped 1:1 with the Enquiry model in prisma/schema.prisma. Once the
// database is connected, replace this with a server action such as:
//
//   export async function getEnquiries() {
//     return prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });
//   }
//
// ...and drop this array. Nothing else in the admin UI needs to change.
// ----------------------------------------------------------------
export const demoEnquiries: Enquiry[] = [
  {
    id: "1",
    referenceNumber: "EGC-2026-000481",
    firstName: "Tunde",
    lastName: "Bakare",
    email: "tunde.bakare@gmail.com",
    phone: "+2348031234567",
    serviceType: "VISA_CONSULTANCY",
    urgency: "URGENT",
    message: "Need a UK visitor visa consultation before end of month — travel date already booked.",
    status: "NEW",
    createdAt: "2026-07-04T09:20:00.000Z",
  },
  {
    id: "2",
    referenceNumber: "EGC-2026-000480",
    firstName: "Grace",
    lastName: "Adeyemi",
    email: "grace.adeyemi@outlook.com",
    phone: "+2348123456789",
    serviceType: "CAC_REGISTRATION",
    urgency: "STANDARD",
    message: "Looking to register a limited liability company for my logistics business.",
    status: "IN_PROGRESS",
    createdAt: "2026-07-03T14:05:00.000Z",
  },
  {
    id: "3",
    referenceNumber: "EGC-2026-000479",
    firstName: "Ifeoma",
    lastName: "Chukwu",
    email: "ifeoma.c@yahoo.com",
    phone: "+2347098765432",
    serviceType: "FLIGHT_BOOKING",
    urgency: "PRIORITY",
    message: "Round trip Lagos to Dubai, first week of August, 2 adults.",
    status: "NEW",
    createdAt: "2026-07-02T11:40:00.000Z",
  },
  {
    id: "4",
    referenceNumber: "EGC-2026-000478",
    firstName: "Emeka",
    lastName: "Okafor",
    email: "emeka.okafor@gmail.com",
    phone: "+2348056781234",
    serviceType: "PASSPORT",
    urgency: "EMERGENCY",
    message: "Passport renewal needed urgently — travelling for a medical emergency abroad in 5 days.",
    status: "IN_PROGRESS",
    createdAt: "2026-07-01T08:15:00.000Z",
  },
  {
    id: "5",
    referenceNumber: "EGC-2026-000477",
    firstName: "Blessing",
    lastName: "Eze",
    email: "blessing.eze@gmail.com",
    phone: "+2348199988776",
    serviceType: "FINANCIAL_ADVISORY",
    urgency: "STANDARD",
    message: "Interested in advisory on offshore savings options for my children's education fund.",
    status: "RESOLVED",
    createdAt: "2026-06-28T16:50:00.000Z",
  },
  {
    id: "6",
    referenceNumber: "EGC-2026-000476",
    firstName: "Chinedu",
    lastName: "Obi",
    email: "chinedu.obi@gmail.com",
    phone: "+2348134567890",
    serviceType: "VISA_CONSULTANCY",
    urgency: "PRIORITY",
    message: "Canadian study visa — already have admission letter, need full consultation.",
    status: "CLOSED",
    createdAt: "2026-06-25T10:10:00.000Z",
  },
];
