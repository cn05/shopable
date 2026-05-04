import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { brands } from "@/data/brands";
import { queryProducts } from "@/lib/product-query";
import AddToCartButton from "@/components/cart/add-to-cart-button";
import ProductCard from "@/components/product/product-card";

export async function generateMetadata({ params }) {
  const slug = params?.slug ?? "";
  const brand = brands.find((item) => item.slug === slug) ?? null;

  if (!brand) {
    return {
      title: "Brand",
      description: "Halaman brand produk di Shopable.",
    };
  }

  return {
    title: `Brand: ${brand.name}`,
    description: `Produk-produk dari brand ${brand.name} (mock data).`,
  };
}

export default async function BrandPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = (await searchParams) ?? {};

  const slug = resolvedParams?.slug ?? "";
  const brand = brands.find((item) => item.slug === slug) ?? null;

  if (!brand) {
    notFound();
  }

  const page = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;

  const result = queryProducts({ brand: slug, sort: "popular", page });

  return (
    <main className="bg-muted px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-282.5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-white ring-1 ring-border">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                sizes="48px"
                className="object-contain p-2"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black md:text-3xl">
                Brand: {brand.name}
              </h1>
              <p className="mt-1 text-sm text-textMuted">{result.total} produk</p>
            </div>
          </div>
          <Link
            href={`/catalog?brand=${brand.slug}`}
            className="rounded-full border border-black px-5 py-2 text-sm font-semibold text-black hover:bg-white"
          >
            Buka di Catalog
          </Link>
        </div>

        {result.items.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center ring-1 ring-border">
            <p className="text-sm font-semibold text-black">
              Belum ada produk dari brand ini
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
      </div>
    </main>
  );
}
