"use client";

import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/card";

export default function CategoryGrid({ items }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7.5 lg:grid-cols-4">
      {(items ?? []).map((category) => (
        <Link href={`/category/${category.slug}`} key={category.slug} className="block">
          <Card className="rounded-[20px] p-4 md:p-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand md:h-12 md:w-12">
                <Image src={category.icon} alt={category.name} width={24} height={24} />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold leading-5.5 text-black md:text-base">
                  {category.name}
                </p>
                <p className="text-xs text-textMuted md:text-sm">
                  {(category.productCount ?? 0).toLocaleString("id-ID")} products
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
