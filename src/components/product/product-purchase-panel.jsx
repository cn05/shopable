"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { cn, formatRupiah } from "@/lib/utils";

export default function ProductPurchasePanel({ product }) {
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const selectedVariant = useMemo(() => {
    if (!product.variants?.length) return null;
    return product.variants.find((variant) => variant.id === variantId) ?? null;
  }, [product.variants, variantId]);

  const canDecrement = qty > 1;
  const canIncrement = qty < Math.max(1, product.stock ?? 1);

  function handleAddToCart() {
    addItem(product, { qty, variant: selectedVariant });
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 900);
  }

  return (
    <aside className="rounded-3xl bg-white p-6 ring-1 ring-border">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-textMuted">Harga</p>
        <p className="text-lg font-bold text-brand">
          {formatRupiah(product.price)}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-textMuted">Stok</p>
        <p className="text-sm font-semibold text-black">
          {product.stock > 0 ? `${product.stock} tersedia` : "Habis"}
        </p>
      </div>

      {product.variants?.length ? (
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-black">Varian</legend>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {product.variants.map((variant) => (
              <label
                key={variant.id}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-colors",
                  variantId === variant.id
                    ? "border-brand bg-muted text-black"
                    : "border-border bg-white text-textMuted hover:border-brand",
                )}
              >
                <span className="font-semibold">{variant.name}</span>
                <input
                  type="radio"
                  name="variant"
                  value={variant.id}
                  className="sr-only"
                  checked={variantId === variant.id}
                  onChange={() => setVariantId(variant.id)}
                />
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="mt-6">
        <p className="text-sm font-semibold text-black">Jumlah</p>
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQty((current) => Math.max(1, current - 1))}
            disabled={!canDecrement}
            className="h-10 w-10 rounded-full bg-muted text-lg font-bold text-black disabled:opacity-60"
            aria-label="Kurangi jumlah"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            max={Math.max(1, product.stock ?? 1)}
            value={qty}
            onChange={(event) => {
              const next = Number(event.target.value);
              if (!Number.isFinite(next)) return;
              setQty(Math.max(1, Math.min(Math.floor(next), product.stock ?? 1)));
            }}
            className="h-10 w-20 rounded-2xl border border-border text-center text-sm font-semibold text-black outline-none focus:border-brand"
          />
          <button
            type="button"
            onClick={() =>
              setQty((current) =>
                Math.min(current + 1, Math.max(1, product.stock ?? 1)),
              )
            }
            disabled={!canIncrement}
            className="h-10 w-10 rounded-full bg-muted text-lg font-bold text-black disabled:opacity-60"
            aria-label="Tambah jumlah"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!product.stock}
        className="mt-7 w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brandHover disabled:cursor-not-allowed disabled:opacity-60 transition-transform active:scale-[0.99] motion-reduce:transform-none"
      >
        {isAdded ? "Ditambahkan" : "Tambah ke cart"}
      </button>

      <p className="mt-3 text-xs text-textMuted">
        * Demo portfolio: checkout tidak memproses pembayaran sungguhan.
      </p>
    </aside>
  );
}
