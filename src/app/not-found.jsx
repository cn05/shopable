import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-muted px-4 py-10 md:py-14">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-black md:text-3xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-2 text-sm text-textMuted">
          Link mungkin sudah berubah atau produk sudah tidak tersedia.
        </p>

        <div className="mt-6 rounded-3xl bg-white p-8 ring-1 ring-border">
          <p className="text-sm font-semibold text-black">
            Coba cari produk lain di catalog.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brandHover"
            >
              Browse Catalog
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
