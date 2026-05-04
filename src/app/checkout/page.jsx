"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { formatRupiah } from "@/lib/utils";

const SHIPPING_OPTIONS = [
  { id: "regular", name: "Regular (2-4 hari)", price: 25000 },
  { id: "express", name: "Express (1-2 hari)", price: 50000 },
];

const PAYMENT_OPTIONS = [
  { id: "transfer", name: "Bank Transfer" },
  { id: "ewallet", name: "E-Wallet" },
  { id: "cod", name: "COD" },
];

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingId, setShippingId] = useState(SHIPPING_OPTIONS[0].id);
  const [paymentId, setPaymentId] = useState(PAYMENT_OPTIONS[0].id);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const shippingPrice = useMemo(() => {
    return (
      SHIPPING_OPTIONS.find((option) => option.id === shippingId)?.price ?? 0
    );
  }, [shippingId]);

  const total = subtotal + shippingPrice;

  function validate() {
    if (!fullName.trim()) return "Nama wajib diisi";
    if (!phone.trim()) return "Nomor HP wajib diisi";
    if (!address.trim()) return "Alamat wajib diisi";
    if (!city.trim()) return "Kota wajib diisi";
    if (!postalCode.trim()) return "Kode pos wajib diisi";
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    const message = validate();
    if (message) {
      setError(message);
      return;
    }

    const orderId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now());

    setSuccess({
      orderId,
      total,
    });
    clear();
  }

  if (items.length === 0 && !success) {
    return (
      <main className="bg-muted px-4 py-10 md:py-14">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold text-black md:text-3xl">Checkout</h1>
          <div className="mt-6 rounded-3xl bg-white p-8 ring-1 ring-border">
            <p className="text-sm font-semibold text-black">
              Keranjang kosong
            </p>
            <p className="mt-2 text-sm text-textMuted">
              Tambahkan produk dulu sebelum checkout.
            </p>
            <div className="mt-6">
              <Link
                href="/catalog"
                className="inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brandHover"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="bg-muted px-4 py-10 md:py-14">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            Order Berhasil (Demo)
          </h1>
          <div className="mt-6 rounded-3xl bg-white p-8 ring-1 ring-border">
            <p className="text-sm text-textMuted">Order ID</p>
            <p className="mt-1 break-all text-sm font-bold text-black">
              {success.orderId}
            </p>
            <p className="mt-4 text-sm text-textMuted">Total</p>
            <p className="mt-1 text-lg font-bold text-brand">
              {formatRupiah(success.total)}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brandHover"
              >
                Kembali Belanja
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

  return (
    <main className="bg-muted px-4 py-10 md:py-14">
      <div className="container mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 ring-1 ring-border"
        >
          <h1 className="text-2xl font-bold text-black md:text-3xl">Checkout</h1>
          <p className="mt-1 text-sm text-textMuted">
            Isi data pengiriman dan pilih metode pembayaran (demo).
          </p>

          {error ? (
            <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200">
              {error}
            </div>
          ) : null}

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-textMuted">
                Nama Lengkap
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm text-black outline-none focus:border-brand"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-textMuted">
                Nomor HP
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                className="mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm text-black outline-none focus:border-brand"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-textMuted">
                Kode Pos
              </label>
              <input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                inputMode="numeric"
                className="mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm text-black outline-none focus:border-brand"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-textMuted">
                Alamat
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm text-black outline-none focus:border-brand"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-textMuted">Kota</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm text-black outline-none focus:border-brand"
                required
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-bold text-black">Pengiriman</h2>
            <div className="mt-3 space-y-2">
              {SHIPPING_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center justify-between rounded-2xl border border-border px-4 py-3 text-sm text-black hover:border-brand"
                >
                  <span>{option.name}</span>
                  <span className="font-semibold">{formatRupiah(option.price)}</span>
                  <input
                    className="sr-only"
                    type="radio"
                    name="shipping"
                    checked={shippingId === option.id}
                    onChange={() => setShippingId(option.id)}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-bold text-black">Pembayaran</h2>
            <div className="mt-3 space-y-2">
              {PAYMENT_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center justify-between rounded-2xl border border-border px-4 py-3 text-sm text-black hover:border-brand"
                >
                  <span>{option.name}</span>
                  <input
                    className="sr-only"
                    type="radio"
                    name="payment"
                    checked={paymentId === option.id}
                    onChange={() => setPaymentId(option.id)}
                  />
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-textMuted">
              Metode pembayaran bersifat dummy untuk demo portfolio.
            </p>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brandHover"
          >
            Place Order (Demo)
          </button>
        </form>

        <aside className="h-fit rounded-3xl bg-white p-6 ring-1 ring-border">
          <h2 className="text-lg font-bold text-black">Ringkasan Order</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between text-textMuted">
              <span>Subtotal</span>
              <span className="font-semibold text-black">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-textMuted">
              <span>Shipping</span>
              <span className="font-semibold text-black">
                {formatRupiah(shippingPrice)}
              </span>
            </div>
            <div className="mt-3 h-px w-full bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-black">Total</span>
              <span className="text-lg font-bold text-brand">
                {formatRupiah(total)}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/cart"
              className="inline-block rounded-full border border-black px-6 py-3 text-sm font-semibold text-black hover:bg-white"
            >
              Kembali ke Cart
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
