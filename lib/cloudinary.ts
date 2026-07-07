/**
 * Builds a responsive, optimized Cloudinary delivery URL from a public ID.
 *
 * Reads the cloud name from NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME. That env
 * var does not exist yet in this project — add it to .env.local and to
 * your Vercel project's Environment Variables once you have a Cloudinary
 * account, e.g.:
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
 *
 * Until then, callers should pass a `fallback` (a fully-qualified URL,
 * e.g. an Unsplash placeholder) which is returned as-is.
 */
export function cloudinaryUrl(
  publicId: string,
  fallback: string,
  opts: { width?: number; quality?: string } = {}
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return fallback;

  const { width = 1600, quality = "auto" } = opts;
  const transforms = [`f_auto`, `q_${quality}`, `w_${width}`, `c_fill`, `dpr_auto`].join(",");
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${publicId}`;
}

/**
 * Actually uploads a File to Cloudinary from the browser using an
 * UNSIGNED upload preset (no server/API route needed — this is safe to
 * call directly from admin pages).
 *
 * Requires two env vars in `.env.local` (and in your Vercel project
 * settings):
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
 *   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-unsigned-preset-name
 *
 * To create the preset: Cloudinary Dashboard → Settings → Upload →
 * "Add upload preset" → set Signing Mode to "Unsigned" → save → copy
 * its name here.
 *
 * Throws a descriptive Error if env vars are missing or the upload
 * fails, so callers can show that message to the admin user.
 */
export async function uploadToCloudinary(
  file: File,
  folder = "emunahh/uploads"
): Promise<{ secureUrl: string; publicId: string }> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary isn't configured yet. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and " +
        "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to .env.local (see lib/cloudinary.ts for setup steps)."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.error?.message || `Cloudinary upload failed (${response.status}).`
    );
  }

  const data = await response.json();
  return { secureUrl: data.secure_url as string, publicId: data.public_id as string };
}
