import Link from "next/link";
import { services, testimonials } from "@/data/home-content";
import { faqs } from "@/data/contact-content";
import {
  demoEnquiries,
  serviceLabels,
  statusLabels,
  statusStyles,
  urgencyStyles,
  urgencyLabels,
  fullName,
  formatDate,
} from "@/lib/enquiry-helpers";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const newEnquiries = demoEnquiries.filter((e) => e.status === "NEW").length;
  const recent = [...demoEnquiries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const cards = [
    { label: "Active Services", value: services.length, href: "/admin/services" },
    { label: "Testimonials", value: testimonials.length, href: "/admin/testimonials" },
    { label: "FAQs", value: faqs.length, href: "/admin/faqs" },
    { label: "New Enquiries", value: newEnquiries, href: "/admin/enquiries" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl italic text-ink-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-slate">
        Manage every editable section of the live site from here.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-navy/5 transition-shadow hover:shadow-md hover:ring-stamp-gold/40"
          >
            <p className="font-mono text-xs uppercase text-slate">{c.label}</p>
            <p className="mt-1 font-display text-3xl italic text-ink-navy">{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-navy/5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-body font-medium text-ink-navy">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-xs font-medium text-stamp-gold hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-4 divide-y divide-ink-navy/5">
            {recent.map((e) => (
              <Link
                key={e.id}
                href="/admin/enquiries"
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink-navy">{fullName(e)}</p>
                  <p className="truncate text-xs text-slate">
                    {serviceLabels[e.serviceType]} · {formatDate(e.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className={cn("rounded-full px-2.5 py-1 text-[0.65rem] font-medium", urgencyStyles[e.urgency])}>
                    {urgencyLabels[e.urgency]}
                  </span>
                  <span className={cn("rounded-full px-2.5 py-1 text-[0.65rem] font-medium", statusStyles[e.status])}>
                    {statusLabels[e.status]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 ring-1 ring-ink-navy/5">
          <h2 className="font-body font-medium text-ink-navy">Setup checklist</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate">
            <li>☐ Connect PostgreSQL database and run <code>npx prisma db push</code></li>
            <li>☐ Wire NextAuth login and protect all /admin routes</li>
            <li>☐ Replace in-memory data files with live database reads/writes</li>
            <li>☐ Set correct map coordinates in Site Settings</li>
            <li>☐ Connect Cloudinary for media uploads</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
