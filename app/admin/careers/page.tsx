"use client";

import { useState } from "react";
import { jobOpenings as initialJobs, type JobOpening } from "@/data/careers-content";
import { Button } from "@/components/ui/button";

// Client-side editable demo, same pattern as the other admin content
// pages. In production, Add/Save/Delete call server actions that write
// to a JobPosting table (see prisma/schema.prisma) instead of local state.
export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<JobOpening[]>(initialJobs);
  const [editingId, setEditingId] = useState<string | null>(null);

  function updateField(id: string, field: keyof JobOpening, value: string | boolean) {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, [field]: value } : j)));
  }

  function addJob() {
    const id = `new-${Date.now()}`;
    const newJob: JobOpening = {
      id,
      title: "New Role",
      department: "",
      location: "Lagos, Nigeria (On-site)",
      type: "Full-time",
      summary: "",
      responsibilities: [],
      requirements: [],
      isActive: false,
      postedAt: new Date().toISOString(),
    };
    setJobs((prev) => [newJob, ...prev]);
    setEditingId(id);
  }

  function remove(id: string) {
    if (!confirm("Delete this role? This cannot be undone.")) return;
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl italic text-ink-navy">Careers</h1>
          <p className="mt-1 text-sm text-slate">
            Manage open roles shown on the public Careers page.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={addJob}>+ New Role</Button>
      </div>

      <div className="mt-6 space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-navy/5">
            <div className="flex items-center justify-between">
              <span
                className={`rounded-full px-2.5 py-1 font-mono text-[0.65rem] font-medium ${
                  job.isActive ? "bg-approved-green/10 text-approved-green" : "bg-slate/10 text-slate"
                }`}
              >
                {job.isActive ? "Open" : "Closed / Draft"}
              </span>
              <div className="flex gap-2">
                <button
                  className="text-xs text-slate underline"
                  onClick={() => setEditingId(editingId === job.id ? null : job.id)}
                >
                  {editingId === job.id ? "Close" : "Edit"}
                </button>
                <button className="text-xs text-visa-red underline" onClick={() => remove(job.id)}>
                  Delete
                </button>
              </div>
            </div>

            {editingId === job.id ? (
              <div className="mt-3 space-y-3">
                <label className="block text-sm font-medium text-ink-navy">
                  Job Title
                  <input
                    value={job.title}
                    onChange={(e) => updateField(job.id, "title", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-ink-navy/15 px-3 py-2 text-sm"
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-ink-navy">
                    Department
                    <input
                      value={job.department}
                      onChange={(e) => updateField(job.id, "department", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-ink-navy/15 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block text-sm font-medium text-ink-navy">
                    Location
                    <input
                      value={job.location}
                      onChange={(e) => updateField(job.id, "location", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-ink-navy/15 px-3 py-2 text-sm"
                    />
                  </label>
                </div>
                <label className="block text-sm font-medium text-ink-navy">
                  Summary
                  <textarea
                    value={job.summary}
                    onChange={(e) => updateField(job.id, "summary", e.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-ink-navy/15 px-3 py-2 text-sm"
                  />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={`open-${job.id}`}
                    type="checkbox"
                    checked={job.isActive}
                    onChange={(e) => updateField(job.id, "isActive", e.target.checked)}
                  />
                  <label htmlFor={`open-${job.id}`} className="text-sm text-ink-navy">
                    Open (visible on the public Careers page)
                  </label>
                </div>
                <Button variant="primary" size="sm" onClick={() => setEditingId(null)}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="mt-2">
                <p className="font-body font-medium text-ink-navy">{job.title}</p>
                <p className="font-mono text-xs text-slate">{job.department} · {job.location}</p>
                <p className="mt-1 text-sm text-slate line-clamp-2">{job.summary}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
