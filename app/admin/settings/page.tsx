"use client";

import { useState } from "react";
import { siteSettings as initialSettings } from "@/data/home-content";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);

  function update(field: keyof typeof settings, value: string) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  const fields: { key: keyof typeof settings; label: string }[] = [
    { key: "companyName", label: "Company Name" },
    { key: "rcNumber", label: "RC Number" },
    { key: "phonePrimary", label: "Phone (Primary)" },
    { key: "phoneSecondary", label: "Phone (Secondary)" },
    { key: "email", label: "Email" },
    { key: "officeAddress", label: "Office Address" },
    { key: "workingHours", label: "Working Hours" },
    { key: "instagramHandle", label: "Instagram Handle" },
    { key: "tiktokHandle", label: "TikTok Handle" },
    { key: "whatsappNumber", label: "WhatsApp Number" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl italic text-ink-navy">Site Settings</h1>
      <p className="mt-1 text-sm text-slate">
        These values appear across the footer, contact page, and hero stat strips
        sitewide. Also set the office map coordinates here before launch (fixes
        the wrong-pin issue from the audit).
      </p>

      <div className="mt-6 grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-navy/5 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.key} className="block text-sm font-medium text-ink-navy">
            {f.label}
            <input
              value={settings[f.key] ?? ""}
              onChange={(e) => update(f.key, e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink-navy/15 px-3 py-2 text-sm font-normal"
            />
          </label>
        ))}
      </div>

      <Button variant="primary" className="mt-6">Save Settings</Button>
    </div>
  );
}
