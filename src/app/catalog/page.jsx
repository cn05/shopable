import Link from "next/link";
import { queryProducts } from "@/lib/product-query";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import AddToCartButton from "@/components/cart/add-to-cart-button";
import CatalogFilters from "@/components/catalog/catalog-filters";
import ProductCard from "@/components/product/product-card";

export const metadata = {
  title: "Catalog",
  description: "Browse dan filter produk demo e-commerce Shopable.",
};

function first(value) {
  return Array.isArray(value) ? value[0] : value;
}

function buildHref(pathname, current, overrides) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(current ?? {})) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const entry of value) params.append(key, String(entry));
    } else {
      params.set(key, String(value));
    }
  }

  for (const [key, value] of Object.entries(overrides ?? {})) {
    const stringValue = value === null || value === undefined ? "" : String(value);
    if (!stringValue) params.delete(key);
    else params.set(key, stringValue);
  }

  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export default async function CatalogPage({ searchParams }) {
  const resolvedSearchParams = (await searchParams) ?? {};

  const q = first(resolvedSearchParams.q) ?? "";
  const sort = first(resolvedSearchParams.sort) ?? "newest";
  const category = first(resolvedSearchParams.category) ?? "";
  const brand = first(resolvedSearchParams.brand) ?? "";
  const min = first(resolvedSearchParams.min) ?? "";
  const max = first(resolvedSearchParams.max) ?? "";
  const page = first(resolvedSearchParams.page) ?? 1;

  const result = queryProducts({ q, sort, category, brand, min, max, page });

  return (
    <main className="bg-muted px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-282.5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              Catalog Produk
            </h1>
            <p className="mt-1 text-sm text-textMuted">
              {result.total} produk • halaman {result.page} dari {result.totalPages}
            </p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-black px-5 py-2 text-sm font-semibold text-black hover:bg-white"
          >
            Kembali ke Home
          </Link>
        </div>

        <CatalogFilters
          categories={categories}
          brands={brands}
          values={{ q, sort, category, brand, min, max }}
        />

        {result.items.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center ring-1 ring-border">
            <p className="text-sm font-semibold text-black">
              Produk tidak ditemukan
            </p>
            <p className="mt-2 text-sm text-textMuted">
              Coba ubah filter atau kata kunci pencarian.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {result.items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                footer={
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      Detail
                    </Link>
                    <AddToCartButton
                      product={product}
                      className="px-3 py-2 text-xs"
                    />
                  </div>
                }
              />
            ))}
          </div>
        )}

        <div className="mt-10 flex items-center justify-center gap-2">
          <Link
            href={buildHref("/catalog", resolvedSearchParams, {
              page: Math.max(1, result.page - 1),
            })}
            aria-disabled={result.page <= 1}
            className={`rounded-full border px-5 py-2 text-sm font-semibold ${
              result.page <= 1
                ? "pointer-events-none border-border text-textMuted"
                : "border-black text-black hover:bg-white"
            }`}
          >
            Prev
          </Link>
          <span className="px-4 text-sm font-semibold text-black">
            {result.page}
          </span>
          <Link
            href={buildHref("/catalog", resolvedSearchParams, {
              page: Math.min(result.totalPages, result.page + 1),
            })}
            aria-disabled={result.page >= result.totalPages}
            className={`rounded-full border px-5 py-2 text-sm font-semibold ${
              result.page >= result.totalPages
                ? "pointer-events-none border-border text-textMuted"
                : "border-black text-black hover:bg-white"
            }`}
          >
            Next
          </Link>
        </div>
      </div>
    </main>
  );
}
