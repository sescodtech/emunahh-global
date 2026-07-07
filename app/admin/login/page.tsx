"use client";

import { useState, FormEvent, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Incorrect email or password.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-navy px-4 font-body">
      <div className="w-full max-w-sm rounded-2xl bg-boarding-paper p-8 shadow-xl">
        <p className="font-display text-3xl italic text-ink-navy">Emunahh</p>
        <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-slate">
          Admin Console
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-navy">Email</label>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink-navy/15 bg-white px-3 py-2 text-sm text-ink-navy outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-navy">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink-navy/15 bg-white px-3 py-2 text-sm text-ink-navy outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
            />
          </div>

          {error && <p className="text-sm text-visa-red">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-ink-navy py-2.5 text-sm font-semibold text-boarding-paper transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate">
          Authorized personnel only. All access attempts are logged.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
