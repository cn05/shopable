import Link from "next/link";

export const metadata = {
  title: "Vouchers",
  description: "Halaman vouchers (demo) untuk showcase UI/UX.",
};

const vouchers = [
  {
    code: "SHOPABLE10",
    title: "Diskon 10%",
    description: "Min. belanja Rp 250.000 • Maks. potongan Rp 50.000",
  },
  {
    code: "ONGKIR25",
    title: "Potongan Ongkir",
    description: "Potong ongkir Rp 25.000 • Min. belanja Rp 150.000",
  },
  {
    code: "PAYDAY50",
    title: "Payday Sale",
    description: "Diskon hingga Rp 50.000 • Berlaku untuk produk pilihan",
  },
];

export default function RewardsPage() {
  return (
    <main className="bg-muted px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              Vouchers
            </h1>
            <p className="mt-1 text-sm text-textMuted">
              Demo portfolio: voucher hanya untuk tampilan UI.
            </p>
          </div>
          <Link
            href="/catalog"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brandHover"
          >
            Pakai di Catalog
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {vouchers.map((voucher) => (
            <div key={voucher.code} className="rounded-3xl bg-white p-6 ring-1 ring-border">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-textMuted">CODE</p>
                  <p className="mt-1 text-sm font-bold text-black">
                    {voucher.code}
                  </p>
                </div>
                <span className="rounded-full bg-muted px-4 py-2 text-xs font-semibold text-black">
                  {voucher.title}
                </span>
              </div>
              <p className="mt-4 text-sm text-textMuted">{voucher.description}</p>
              <p className="mt-4 text-xs text-textMuted">
                * Voucher ini tidak benar-benar dapat digunakan.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
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
