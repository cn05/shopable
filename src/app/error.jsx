"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="bg-muted px-4 py-10 md:py-14">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-black md:text-3xl">
          Terjadi masalah
        </h1>
        <p className="mt-2 text-sm text-textMuted">
          Coba refresh atau kembali ke catalog.
        </p>

        <div className="mt-6 rounded-3xl bg-white p-6 ring-1 ring-border">
          <p className="text-sm font-semibold text-black">Detail error</p>
          <p className="mt-2 break-words text-sm text-red-700">
            {error?.message ?? "Unknown error"}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brandHover"
            >
              Coba Lagi
            </button>
            <Link
              href="/catalog"
              className="rounded-full border border-black px-6 py-3 text-sm font-semibold text-black hover:bg-white"
            >
              Buka Catalog
            </Link>
            <Link
              href="/"
              className="rounded-full border border-black px-6 py-3 text-sm font-semibold text-black hover:bg-white"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
