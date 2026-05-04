import { NextResponse } from "next/server";
import { brands } from "@/data/brands";
import { products } from "@/data/products";

export const dynamic = "force-dynamic";

export async function GET() {
  const productCountByBrand = products.reduce((accumulator, product) => {
    accumulator[product.brandSlug] = (accumulator[product.brandSlug] ?? 0) + 1;
    return accumulator;
  }, {});

  const items = brands.map((brand) => ({
    ...brand,
    productCount: productCountByBrand[brand.slug] ?? 0,
  }));

  return NextResponse.json({ items });
}

