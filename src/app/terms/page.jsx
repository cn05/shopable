import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description: "Placeholder terms of service untuk demo portfolio Shopable.",
};

export default function TermsPage() {
  return (
    <main className="bg-muted px-4 py-10 md:py-14">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-black md:text-3xl">
          Terms of Service (Demo)
        </h1>
        <p className="mt-2 text-sm text-textMuted">
          Halaman ini hanya placeholder untuk demo portfolio.
        </p>

        <div className="mt-6 space-y-4 rounded-3xl bg-white p-6 text-sm text-textMuted ring-1 ring-border">
          <p>
            Shopable adalah project demo. Semua transaksi, voucher, dan checkout
            tidak memproses pembayaran sungguhan.
          </p>
          <p>
            Konten, harga, dan data produk bersifat mock untuk kebutuhan UI/UX
            showcase.
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
