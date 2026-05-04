import { NextResponse } from "next/server";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const dynamic = "force-dynamic";

export async function GET() {
  const productCountByCategory = products.reduce((accumulator, product) => {
    accumulator[product.categorySlug] = (accumulator[product.categorySlug] ?? 0) + 1;
    return accumulator;
  }, {});

  const items = categories.map((category) => ({
    ...category,
    productCount: productCountByCategory[category.slug] ?? 0,
  }));

  return NextResponse.json({ items });
}

