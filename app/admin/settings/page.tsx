"use client";

import { useState } from "react";
import Image from "next/image";
import { siteSettings as initialSettings } from "@/data/home-content";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  function update(field: keyof typeof settings, value: string) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  function onLogoFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // NOTE: this only previews the file locally in the browser — it
    // isn't uploaded anywhere yet. Once Cloudinary is connected (see
    // README setup checklist), this should upload the file and call
    // update("logoUrl", <cloudinary URL>) with the real hosted URL.
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
  }

  const contactFields: { key: keyof typeof settings; label: string }[] = [
    { key: "companyName", label: "Company Name" },
    { key: "rcNumber", label: "RC Number" },
    { key: "phonePrimary", label: "Phone (Primary)" },
    { key: "phoneSecondary", label: "Phone (Secondary)" },
    { key: "email", label: "Email" },
    { key: "officeAddress", label: "Office Address" },
    { key: "workingHours", label: "Working Hours" },
  ];

  const socialFields: { key: keyof typeof settings; label: string; placeholder: string }[] = [
    { key: "whatsappNumber", label: "WhatsApp Number", placeholder: "234XXXXXXXXXX" },
    { key: "instagramHandle", label: "Instagram Handle", placeholder: "yourhandle" },
    { key: "tiktokHandle", label: "TikTok Handle", placeholder: "yourhandle" },
    { key: "facebookUrl", label: "Facebook URL", placeholder: "https://facebook.com/..." },
    { key: "linkedinUrl", label: "LinkedIn URL", placeholder: "https://linkedin.com/company/..." },
    { key: "youtubeUrl", label: "YouTube URL", placeholder: "https://youtube.com/@..." },
    { key: "xUrl", label: "X (Twitter) URL", placeholder: "https://x.com/..." },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl italic text-ink-navy">Site Settings</h1>
      <p className="mt-1 text-sm text-slate">
        These values appear across the navbar, footer, contact page, and hero stat strips
        sitewide.
      </p>

      {/* LOGO */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-navy/5">
        <h2 className="font-body font-medium text-ink-navy">Site Logo</h2>
        <p className="mt-1 text-sm text-slate">
          Shown in the navbar and footer. Upload a transparent PNG or SVG for best results.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-6">
          <div className="flex h-16 items-center rounded-lg bg-boarding-paper px-4">
            <Image
              src={logoPreview || settings.logoUrl}
              alt="Current logo"
              width={160}
              height={48}
              className="h-9 w-auto object-contain"
              unoptimized={!!logoPreview}
            />
          </div>
          <label className="cursor-pointer rounded-full border border-ink-navy/15 px-5 py-2 text-sm font-medium text-ink-navy hover:border-stamp-gold hover:text-stamp-gold">
            Upload New Logo
            <input type="file" accept="image/*" className="hidden" onChange={onLogoFileSelected} />
          </label>
        </div>
        {logoPreview && (
          <p className="mt-3 font-mono text-xs text-stamp-gold">
            Preview only — connect Cloudinary to actually save this upload (see setup checklist on
            the Dashboard).
          </p>
        )}
        <label className="mt-4 block text-sm font-medium text-ink-navy">
          Or paste a logo URL directly
          <input
            value={settings.logoUrl}
            onChange={(e) => update("logoUrl", e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink-navy/15 px-3 py-2 text-sm font-normal"
          />
        </label>
      </div>

      {/* CONTACT DETAILS */}
      <div className="mt-6 grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-navy/5 sm:grid-cols-2">
        {contactFields.map((f) => (
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

      {/* SOCIAL MEDIA */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-navy/5">
        <h2 className="font-body font-medium text-ink-navy">Social Media Links</h2>
        <p className="mt-1 text-sm text-slate">
          Shown as icons in the site footer. Leave blank to hide a platform.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {socialFields.map((f) => (
            <label key={f.key} className="block text-sm font-medium text-ink-navy">
              {f.label}
              <input
                value={settings[f.key] ?? ""}
                onChange={(e) => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="mt-1 w-full rounded-lg border border-ink-navy/15 px-3 py-2 text-sm font-normal placeholder:text-slate/40"
              />
            </label>
          ))}
        </div>
      </div>

      <Button variant="primary" className="mt-6">Save Settings</Button>
    </div>
  );
}
