"use client";

import { useState } from "react";
import { services as initialServices } from "@/data/home-content";
import { Button } from "@/components/ui/button";

// Client-side editable demo. In production, "Save" calls a server
// action that writes to the Service table (see Prisma schema) instead
// of local state — the shape of this data already matches that model.
export default function AdminServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function updateField(i: number, field: "title" | "description", value: string) {
    setServices((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s))
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl italic text-ink-navy">Services</h1>
      <p className="mt-1 text-sm text-slate">
        Edit the 5 core services shown on Home and Service pages. Changes here
        update both pages at once, since they share one data source.
      </p>

      <div className="mt-6 space-y-4">
        {services.map((s, i) => (
          <div key={s.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-navy/5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-stamp-gold">Service {s.index}</span>
              <button
                className="text-xs text-slate underline"
                onClick={() => setEditingIndex(editingIndex === i ? null : i)}
              >
                {editingIndex === i ? "Close" : "Edit"}
              </button>
            </div>

            {editingIndex === i ? (
              <div className="mt-3 space-y-3">
                <label className="block text-sm font-medium text-ink-navy">
                  Title
                  <input
                    value={s.title}
                    onChange={(e) => updateField(i, "title", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-ink-navy/15 px-3 py-2 text-sm"
                  />
                </label>
                <label className="block text-sm font-medium text-ink-navy">
                  Description
                  <textarea
                    value={s.description}
                    onChange={(e) => updateField(i, "description", e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-ink-navy/15 px-3 py-2 text-sm"
                  />
                </label>
                <Button variant="primary" size="sm" onClick={() => setEditingIndex(null)}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="mt-2">
                <p className="font-body font-medium text-ink-navy">{s.title}</p>
                <p className="mt-1 text-sm text-slate line-clamp-2">{s.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
