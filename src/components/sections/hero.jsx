"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero({
  eyebrow = "100 Produk Terpopuler di Shopable",
  title,
  description,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
}) {
  return (
    <section className="bg-muted px-4 pb-8 md:px-0 md:pb-12.5">
      <div className="container mx-auto flex max-w-282.5 flex-col items-center justify-between gap-6 pt-8 md:gap-1 md:pt-12.5 lg:flex-row">
        <div className="flex flex-col gap-5 px-4 md:gap-7.5 md:px-0">
          <div className="flex w-fit items-center gap-2.5 rounded-full bg-white p-[8px_16px]">
            <div className="flex h-5.5 w-5.5 shrink-0">
              <Image src="/assets/icons/crown.svg" alt="Popular" width={22} height={22} />
            </div>
            <p className="text-xs font-semibold text-black md:text-sm">{eyebrow}</p>
          </div>

          <div className="flex flex-col gap-3.5">
            <h1 className="animate-fade-up text-4xl font-bold leading-tight text-black motion-reduce:animate-none sm:text-5xl md:text-13.75 md:leading-13.75">
              {title}
            </h1>
            <p className="animate-fade-up text-base leading-relaxed text-textSubtle motion-reduce:animate-none md:text-lg md:leading-8.5">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brandHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:px-7 md:py-3.5 md:text-base"
              >
                {primaryCta.label}
              </Link>
            ) : null}

            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black ring-1 ring-border transition-colors hover:bg-muted md:px-7 md:py-3.5 md:text-base"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative h-62.5 w-full shrink-0 overflow-hidden lg:h-90 lg:w-147">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 588px, 100vw"
            className="object-contain"
            priority
          />

          <div className="absolute left-4 top-[60%] flex items-center gap-2.5 rounded-2xl bg-white p-[10px_12px] md:left-0 md:rounded-3xl md:p-[14px_16px]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent md:h-12 md:w-12">
              <Image src="/assets/icons/code-circle.svg" width={24} height={24} alt="Bonus" />
            </div>
            <p className="text-xs font-semibold text-black md:text-sm">
              Bonus Mac OS <br /> Capitan Pro
            </p>
          </div>

          <div className="absolute right-4 top-[30%] flex flex-col items-center gap-2.5 rounded-2xl bg-white p-[10px_12px] md:right-0 md:rounded-3xl md:p-[14px_16px]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent md:h-12 md:w-12">
              <Image src="/assets/icons/star-outline.svg" width={24} height={24} alt="Warranty" />
            </div>
            <p className="text-center text-xs font-semibold text-black md:text-sm">
              Produk <br /> Bergaransi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
