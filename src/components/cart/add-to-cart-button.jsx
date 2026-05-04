"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";

export default function AddToCartButton({
  product,
  qty = 1,
  variant = null,
  className,
  children,
}) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const label = useMemo(() => {
    if (children) return children;
    return isAdded ? "Ditambahkan" : "Tambah ke cart";
  }, [children, isAdded]);

  function handleClick() {
    addItem(product, { qty, variant });
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 900);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brandHover disabled:opacity-60",
        "transition-transform active:scale-[0.98] motion-reduce:transform-none",
        className,
      )}
    >
      {label}
    </button>
  );
}
