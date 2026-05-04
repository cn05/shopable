import { NextResponse } from "next/server";
import { queryProducts } from "@/lib/product-query";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const result = queryProducts({
    q: searchParams.get("q"),
    sort: searchParams.get("sort"),
    min: searchParams.get("min"),
    max: searchParams.get("max"),
    category: searchParams.get("category"),
    brand: searchParams.get("brand"),
    page: searchParams.get("page"),
  });

  return NextResponse.json(result);
}
