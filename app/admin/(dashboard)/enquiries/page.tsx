"use client";

import { useMemo, useState } from "react";
import {
  demoEnquiries,
  serviceLabels,
  urgencyLabels,
  urgencyStyles,
  statusLabels,
  statusStyles,
  fullName,
  formatDate,
  whatsappLink,
  mailtoLink,
  type Enquiry,
  type EnquiryStatus,
} from "@/lib/enquiry-helpers";
import { cn } from "@/lib/utils";

// This page reads from `demoEnquiries` (see lib/enquiry-helpers.ts) until
// the database is connected. Swap the initial useState value for a
// server-fetched `prisma.enquiry.findMany()` result and the rest of this
// component — filtering, the drawer, status updates — needs no changes.

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(demoEnquiries);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const total = enquiries.length;
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const thisWeek = enquiries.filter((e) => new Date(e.createdAt).getTime() > weekAgo).length;
    const urgentCount = enquiries.filter(
      (e) => e.urgency === "URGENT" || e.urgency === "EMERGENCY"
    ).length;
    const counts: Record<string, number> = {};
    enquiries.forEach((e) => {
      counts[e.serviceType] = (counts[e.serviceType] || 0) + 1;
    });
    const topKey = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
    return {
      total,
      thisWeek,
      urgentCount,
      topService: topKey ? serviceLabels[topKey as keyof typeof serviceLabels] : "—",
    };
  }, [enquiries]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return enquiries.filter((e) => {
      const matchesSearch =
        !q ||
        fullName(e).toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.phone.toLowerCase().includes(q) ||
        e.referenceNumber.toLowerCase().includes(q);
      const matchesService = !serviceFilter || e.serviceType === serviceFilter;
      const matchesUrgency = !urgencyFilter || e.urgency === urgencyFilter;
      const matchesStatus = !statusFilter || e.status === statusFilter;
      return matchesSearch && matchesService && matchesUrgency && matchesStatus;
    });
  }, [enquiries, search, serviceFilter, urgencyFilter, statusFilter]);

  const selected = enquiries.find((e) => e.id === selectedId) ?? null;

  function updateStatus(id: string, status: EnquiryStatus) {
    // TODO: replace with a server action, e.g.
    //   await updateEnquiryStatus(id, status)
    // which runs `prisma.enquiry.update(...)` and writes an AuditLog row.
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  }

  function removeEnquiry(id: string) {
    if (!confirm("Delete this enquiry? This cannot be undone.")) return;
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    setSelectedId(null);
  }

  function exportCSV() {
    const headers = ["Reference", "Name", "Email", "Phone", "Service", "Urgency", "Status", "Date", "Message"];
    const rows = filtered.map((e) => [
      e.referenceNumber,
      fullName(e),
      e.email,
      e.phone,
      serviceLabels[e.serviceType],
      urgencyLabels[e.urgency],
      statusLabels[e.status],
      formatDate(e.createdAt),
      (e.message || "").replace(/\n/g, " "),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `egc-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl italic text-ink-navy">Enquiries</h1>
          <p className="mt-1 text-sm text-slate">
            Submissions from the Contact page enquiry form.
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="rounded-full border border-ink-navy/15 bg-white px-5 py-2 text-xs font-medium text-ink-navy transition-colors hover:border-stamp-gold hover:text-stamp-gold"
        >
          Export CSV
        </button>
      </div>

      {/* STATS */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Enquiries" value={stats.total} />
        <StatCard label="This Week" value={stats.thisWeek} />
        <StatCard label="Urgent / Emergency" value={stats.urgentCount} accent="text-visa-red" />
        <StatCard label="Top Service" value={stats.topService} small />
      </div>

      {/* FILTERS */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, phone, email, reference..."
          className="min-w-[240px] flex-1 rounded-lg border border-ink-navy/15 bg-white px-4 py-2.5 text-sm text-ink-navy placeholder:text-slate/60 focus:border-stamp-gold focus:outline-none"
        />
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="rounded-lg border border-ink-navy/15 bg-white px-3 py-2.5 text-sm text-ink-navy focus:border-stamp-gold focus:outline-none"
        >
          <option value="">All Services</option>
          {Object.entries(serviceLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select
          value={urgencyFilter}
          onChange={(e) => setUrgencyFilter(e.target.value)}
          className="rounded-lg border border-ink-navy/15 bg-white px-3 py-2.5 text-sm text-ink-navy focus:border-stamp-gold focus:outline-none"
        >
          <option value="">All Urgency</option>
          {Object.entries(urgencyLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-ink-navy/15 bg-white px-3 py-2.5 text-sm text-ink-navy focus:border-stamp-gold focus:outline-none"
        >
          <option value="">All Status</option>
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <span className="ml-auto font-mono text-xs text-slate">
          {filtered.length} of {enquiries.length}
        </span>
      </div>

      {/* TABLE */}
      <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-navy/5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-ink-navy font-mono text-xs uppercase tracking-wide text-boarding-paper/70">
              <tr>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Urgency</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr
                  key={e.id}
                  onClick={() => setSelectedId(e.id)}
                  className="cursor-pointer border-t border-ink-navy/5 transition-colors hover:bg-boarding-paper/60"
                >
                  <td className="px-4 py-3 font-mono text-xs text-stamp-gold">{e.referenceNumber}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink-navy">{fullName(e)}</p>
                    <p className="text-xs text-slate">{e.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-slate">{serviceLabels[e.serviceType]}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", urgencyStyles[e.urgency])}>
                      {urgencyLabels[e.urgency]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", statusStyles[e.status])}>
                      {statusLabels[e.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate">{formatDate(e.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs font-medium text-ink-navy/40">View →</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-display text-xl italic text-ink-navy/60">No enquiries found</p>
            <p className="mt-1 text-sm text-slate">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* DETAIL DRAWER */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-ink-navy/50 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setSelectedId(null)}
        >
          <div className="flex h-full w-full max-w-md flex-col overflow-y-auto bg-boarding-paper shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-ink-navy/10 bg-boarding-paper px-6 py-5">
              <div>
                <p className="font-display text-xl italic text-ink-navy">Enquiry Details</p>
                <p className="font-mono text-xs text-stamp-gold">{selected.referenceNumber}</p>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-navy/5 text-ink-navy/60 hover:bg-ink-navy/10 hover:text-ink-navy"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 px-6 py-6">
              <Field label="Name" value={fullName(selected)} />
              <Field label="Email" value={selected.email} />
              <Field label="Phone" value={selected.phone} />
              <Field label="Service" value={serviceLabels[selected.serviceType]} />
              <div className="mb-5">
                <p className="mb-1 font-mono text-xs uppercase tracking-wide text-slate/70">Urgency</p>
                <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-medium", urgencyStyles[selected.urgency])}>
                  {urgencyLabels[selected.urgency]}
                </span>
              </div>
              <Field label="Submitted" value={formatDate(selected.createdAt)} />
              {selected.message && (
                <div className="mb-5">
                  <p className="mb-1 font-mono text-xs uppercase tracking-wide text-slate/70">Message</p>
                  <p className="rounded-xl bg-white p-4 text-sm leading-relaxed text-ink-navy ring-1 ring-ink-navy/5">
                    {selected.message}
                  </p>
                </div>
              )}

              <div className="my-5 h-px bg-ink-navy/10" />

              <p className="mb-2 font-mono text-xs uppercase tracking-wide text-slate/70">Update Status</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {(Object.keys(statusLabels) as EnquiryStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                      selected.status === s
                        ? statusStyles[s]
                        : "bg-white text-slate ring-1 ring-ink-navy/10 hover:ring-ink-navy/25"
                    )}
                  >
                    {statusLabels[s]}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={whatsappLink(selected.phone, selected.referenceNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full bg-approved-green py-3 text-sm font-medium text-boarding-paper transition-opacity hover:opacity-90"
                >
                  Follow Up on WhatsApp
                </a>
                <a
                  href={mailtoLink(selected.email, selected.referenceNumber)}
                  className="flex items-center justify-center rounded-full border border-ink-navy/15 bg-white py-3 text-sm font-medium text-ink-navy transition-colors hover:border-stamp-gold hover:text-stamp-gold"
                >
                  Reply by Email
                </a>
                <button
                  onClick={() => removeEnquiry(selected.id)}
                  className="mt-2 rounded-full border border-visa-red/20 bg-visa-red/5 py-3 text-sm font-medium text-visa-red transition-colors hover:bg-visa-red/10"
                >
                  Delete Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
  small,
}: {
  label: string;
  value: string | number;
  accent?: string;
  small?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-navy/5">
      <p className="font-mono text-xs uppercase tracking-wide text-slate">{label}</p>
      <p
        className={cn(
          "mt-1 font-display italic text-ink-navy",
          small ? "text-lg" : "text-3xl",
          accent
        )}
      >
        {value}
      </p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-5">
      <p className="mb-1 font-mono text-xs uppercase tracking-wide text-slate/70">{label}</p>
      <p className="text-sm text-ink-navy">{value}</p>
    </div>
  );
}
