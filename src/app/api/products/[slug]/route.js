import { NextResponse } from "next/server";
import { getProductBySlug } from "@/data/products";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams?.slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ item: product });
}
