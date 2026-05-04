import { NextResponse } from "next/server";
import { testimonials } from "@/data/testimonials";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ items: testimonials });
}

