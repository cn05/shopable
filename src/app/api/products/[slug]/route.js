import { NextResponse } from "next/server";
import { getProductBySlug } from "@/data/products";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ item: product });
}

