"use client";

import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";

export default function ProductCard({ product, meta, footer }) {
  const resolvedMeta = meta ?? product?.category ?? "";

  return (
    <Card className="group rounded-[20px] p-4 md:p-5">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative h-22.5 w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 220px, (min-width: 768px) 30vw, 45vw"
            className="object-contain transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-5 flex flex-col gap-2.5">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold leading-5.5 text-black md:text-base">
              {product.name}
            </p>
            <p className="text-xs text-textMuted md:text-sm">{resolvedMeta}</p>
          </div>
          <p className="text-sm font-semibold leading-5.5 text-brand md:text-base">
            {formatRupiah(product.price)}
          </p>
        </div>
      </Link>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </Card>
  );
}
