"use client";

import Link from "next/link";
import ProductCard from "@/components/product/product-card";

export default function ProductGrid({ title, cta, products }) {
  return (
    <section className="flex flex-col gap-5 md:gap-7.5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold leading-tight text-black md:text-2xl md:leading-8.5">
          {title}
        </h2>
        {cta ? (
          <Link
            href={cta.href}
            className="rounded-full border border-black px-5 py-2 text-sm font-semibold text-black hover:bg-white md:px-6 md:py-3"
          >
            {cta.label}
          </Link>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7.5 lg:grid-cols-5">
        {(products ?? []).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
