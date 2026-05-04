import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Placeholder privacy policy untuk demo portfolio Shopable.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-muted px-4 py-10 md:py-14">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-black md:text-3xl">
          Privacy Policy (Demo)
        </h1>
        <p className="mt-2 text-sm text-textMuted">
          Halaman ini hanya untuk kebutuhan demo portfolio dan tidak menggantikan
          dokumen legal yang sebenarnya.
        </p>

        <div className="mt-6 space-y-4 rounded-3xl bg-white p-6 text-sm text-textMuted ring-1 ring-border">
          <p>
            Shopable demo tidak mengumpulkan data pribadi untuk tujuan komersial.
            Data seperti cart disimpan secara lokal di browser (localStorage)
            untuk kebutuhan pengalaman pengguna.
          </p>
          <p>
            Jika kamu ingin deploy project ini sebagai aplikasi sungguhan, gunakan
            generator legal (Privacy Policy/Terms/Cookies) dan sesuaikan dengan
            penggunaan analytics, payment, dan penyimpanan data.
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="text-sm font-semibold text-brand hover:underline"
          >
            ← Kembali ke Home
          </Link>
        </div>
      </div>
    </main>
  );
}
