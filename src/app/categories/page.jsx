import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const metadata = {
  title: "Categories",
  description: "Daftar kategori produk di Shopable (mock data).",
};

export default function CategoriesPage() {
  const productCountByCategory = products.reduce((accumulator, product) => {
    accumulator[product.categorySlug] = (accumulator[product.categorySlug] ?? 0) + 1;
    return accumulator;
  }, {});

  const items = categories.map((category) => ({
    ...category,
    productCount: productCountByCategory[category.slug] ?? 0,
  }));

  return (
    <main className="bg-muted px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-282.5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              Semua Kategori
            </h1>
            <p className="mt-1 text-sm text-textMuted">
              Pilih kategori untuk melihat produk terkait.
            </p>
          </div>
          <Link
            href="/catalog"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brandHover"
          >
            Buka Catalog
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-[20px] bg-white p-5 ring-1 ring-border transition-all duration-300 hover:ring-2 hover:ring-accent"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-black">{category.name}</p>
                  <p className="mt-1 text-xs text-textMuted">
                    {category.productCount.toLocaleString("id-ID")} products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
