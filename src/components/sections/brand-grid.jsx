"use client";

import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/card";

export default function BrandGrid({ items }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7.5 lg:grid-cols-5">
      {(items ?? []).map((brand) => (
        <Link href={`/brand/${brand.slug}`} key={brand.slug} className="block">
          <Card className="rounded-[20px] p-[20px_15px] md:p-[30px_20px]">
            <div className="relative flex h-7.5 w-full items-center justify-center overflow-hidden">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                sizes="(min-width: 1024px) 180px, 45vw"
                className="object-contain"
              />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
