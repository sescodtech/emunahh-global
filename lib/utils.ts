import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generates the boarding-pass style reference number shown on
// enquiry confirmation, e.g. "EGC-2026-000482"
export function formatReferenceNumber(sequence: number, year = new Date().getFullYear()) {
  return `EGC-${year}-${String(sequence).padStart(6, "0")}`;
}
