"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { formatRupiah } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, setQty, removeItem, clear } = useCart();

  if (items.length === 0) {
    return (
      <main className="bg-muted px-4 py-10 md:py-14">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold text-black md:text-3xl">Cart</h1>
          <div className="mt-6 rounded-3xl bg-white p-8 ring-1 ring-border">
            <p className="text-sm font-semibold text-black">
              Keranjang kamu masih kosong
            </p>
            <p className="mt-2 text-sm text-textMuted">
              Yuk, cari produk yang kamu suka dulu.
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
                Kembali ke Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-muted px-4 py-10 md:py-14">
      <div className="container mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-black md:text-3xl">Cart</h1>
              <p className="mt-1 text-sm text-textMuted">
                {items.length} item
              </p>
            </div>
            <button
              type="button"
              onClick={clear}
              className="rounded-full border border-black px-5 py-2 text-sm font-semibold text-black hover:bg-white"
            >
              Clear Cart
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex flex-col gap-4 rounded-3xl bg-white p-5 ring-1 ring-border md:flex-row md:items-center"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm font-bold text-black">{item.name}</p>
                  {item.variant?.name ? (
                    <p className="text-xs text-textMuted">{item.variant.name}</p>
                  ) : null}
                  <p className="mt-2 text-sm font-semibold text-brand">
                    {formatRupiah(item.price)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 md:justify-end">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQty(item.key, Math.max(1, item.qty - 1))}
                      className="h-9 w-9 rounded-full bg-muted text-lg font-bold text-black"
                      aria-label="Kurangi jumlah"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(event) => {
                        const next = Number(event.target.value);
                        if (!Number.isFinite(next)) return;
                        setQty(item.key, Math.max(1, Math.floor(next)));
                      }}
                      className="h-9 w-16 rounded-2xl border border-border text-center text-sm font-semibold text-black outline-none focus:border-brand"
                      aria-label="Jumlah item"
                    />
                    <button
                      type="button"
                      onClick={() => setQty(item.key, item.qty + 1)}
                      className="h-9 w-9 rounded-full bg-muted text-lg font-bold text-black"
                      aria-label="Tambah jumlah"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-semibold text-textMuted">
                      Total
                    </p>
                    <p className="text-sm font-bold text-black">
                      {formatRupiah(item.price * item.qty)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="rounded-full border border-black px-4 py-2 text-sm font-semibold text-black hover:bg-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="h-fit rounded-3xl bg-white p-6 ring-1 ring-border">
          <h2 className="text-lg font-bold text-black">Ringkasan</h2>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between text-textMuted">
              <span>Subtotal</span>
              <span className="font-semibold text-black">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-textMuted">
              <span>Shipping</span>
              <span className="font-semibold text-black">Dihitung di checkout</span>
            </div>
            <div className="mt-3 h-px w-full bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-black">Total</span>
              <span className="text-lg font-bold text-brand">
                {formatRupiah(subtotal)}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <Link
              href="/checkout"
              className="rounded-full bg-brand px-6 py-3 text-center text-sm font-semibold text-white hover:bg-brandHover"
            >
              Checkout
            </Link>
            <Link
              href="/catalog"
              className="rounded-full border border-black px-6 py-3 text-center text-sm font-semibold text-black hover:bg-white"
            >
              Lanjut Belanja
            </Link>
          </div>

          <p className="mt-4 text-xs text-textMuted">
            * Demo portfolio: tidak ada pembayaran sungguhan.
          </p>
        </aside>
      </div>
    </main>
  );
}
