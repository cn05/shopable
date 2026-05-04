import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { queryProducts } from "@/lib/product-query";
import AddToCartButton from "@/components/cart/add-to-cart-button";
import ProductCard from "@/components/product/product-card";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ?? "";
  const category = categories.find((item) => item.slug === slug) ?? null;

  if (!category) {
    return {
      title: "Category",
      description: "Halaman kategori produk di Shopable.",
    };
  }

  return {
    title: `Kategori: ${category.name}`,
    description: `Produk-produk dalam kategori ${category.name} (mock data).`,
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = (await searchParams) ?? {};

  const slug = resolvedParams?.slug ?? "";
  const category = categories.find((item) => item.slug === slug) ?? null;

  if (!category) {
    notFound();
  }

  const page = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;

  const result = queryProducts({ category: slug, sort: "popular", page });

  return (
    <main className="bg-muted px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-282.5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              Kategori: {category.name}
            </h1>
            <p className="mt-1 text-sm text-textMuted">{result.total} produk</p>
          </div>
          <Link
            href={`/catalog?category=${category.slug}`}
            className="rounded-full border border-black px-5 py-2 text-sm font-semibold text-black hover:bg-white"
          >
            Buka di Catalog
          </Link>
        </div>

        {result.items.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center ring-1 ring-border">
            <p className="text-sm font-semibold text-black">
              Belum ada produk di kategori ini
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {result.items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                meta={product.brand}
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
      </div>
    </main>
  );
}
