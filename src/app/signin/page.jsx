"use client";

import { useState } from "react";
import Link from "next/link";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError("Email tidak valid");
      return;
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }

    setSuccess(true);
  }

  return (
    <main className="bg-muted px-4 py-10 md:py-14">
      <div className="container mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-black md:text-3xl">Sign In</h1>
        <p className="mt-1 text-sm text-textMuted">
          Demo portfolio: autentikasi tidak benar-benar berjalan.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-3xl bg-white p-6 ring-1 ring-border"
        >
          {error ? (
            <div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="mb-4 rounded-2xl bg-green-50 p-4 text-sm text-green-800 ring-1 ring-green-200">
              Sign in berhasil (demo).
            </div>
          ) : null}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-textMuted">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm text-black outline-none focus:border-brand"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-textMuted">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm text-black outline-none focus:border-brand"
                required
                minLength={8}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brandHover"
          >
            Sign In
          </button>

          <div className="mt-5 flex items-center justify-between text-sm">
            <Link href="/" className="font-semibold text-black hover:underline">
              Home
            </Link>
            <Link
              href="/signup"
              className="font-semibold text-brand hover:underline"
            >
              Buat akun
            </Link>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link
            href="/catalog"
            className="text-sm font-semibold text-brand hover:underline"
          >
            Lanjut browse catalog →
          </Link>
        </div>
      </div>
    </main>
  );
}
