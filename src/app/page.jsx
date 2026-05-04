"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Hero from "@/components/sections/hero";
import TestimonialStrip from "@/components/sections/testimonial-strip";
import CategoryGrid from "@/components/sections/category-grid";
import ProductGrid from "@/components/sections/product-grid";
import BrandGrid from "@/components/sections/brand-grid";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [newReleaseProducts, setNewReleaseProducts] = useState([]);
  const [error, setError] = useState(null);

  const heroProduct = useMemo(() => {
    return (
      popularProducts.find((product) => product.slug === "macbook-pro-x") ??
      popularProducts[0] ??
      null
    );
  }, [popularProducts]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchJson(url) {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    }

    async function loadHome() {
      try {
        setError(null);

        const [
          categoriesData,
          brandsData,
          testimonialsData,
          popularData,
          newestData,
        ] = await Promise.all([
          fetchJson("/api/categories"),
          fetchJson("/api/brands"),
          fetchJson("/api/testimonials"),
          fetchJson("/api/products?sort=popular&page=1"),
          fetchJson("/api/products?sort=newest&page=1"),
        ]);

        setCategories(categoriesData.items ?? []);
        setBrands(brandsData.items ?? []);
        setTestimonials(testimonialsData.items ?? []);
        setPopularProducts((popularData.items ?? []).slice(0, 8));
        setNewReleaseProducts(newestData.items ?? []);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Failed to load data");
      }
    }

    loadHome();

    return () => controller.abort();
  }, []);

  return (
    <div className="bg-white">
      <Hero
        title={heroProduct?.name ?? "MacBook Pro X"}
        description="Performa kencang, desain clean, dan pengalaman belanja yang simpel untuk demo portfolio."
        primaryCta={{ href: "/catalog", label: "Browse Catalog" }}
        secondaryCta={{
          href: heroProduct ? `/product/${heroProduct.slug}` : "/catalog",
          label: "Lihat Detail",
        }}
        imageSrc="/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png"
        imageAlt="Hero product"
      />
      <TestimonialStrip items={testimonials} error={error} />

      {/* Main Content */}
      <section className="container max-w-282.5 mx-auto flex flex-col gap-8 px-4 pb-16 pt-8 md:gap-12.5 md:px-0 md:pb-25 md:pt-12.5">
        {/* Categories */}
        <div className="flex flex-col gap-5 md:gap-7.5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl md:text-2xl leading-tight md:leading-8.5 text-black">
              Kategori
            </h2>
            <Link
              href="/catalog"
              className="p-[10px_20px] md:p-[12px_24px] border border-black rounded-full font-semibold text-sm text-black"
            >
              Lainnya
            </Link>
          </div>
          <CategoryGrid items={categories} />
        </div>

        <ProductGrid
          title="Produk Terpopuler"
          cta={{ href: "/catalog", label: "Explore All" }}
          products={popularProducts}
        />

        {/* Popular Brands */}
        <div className="flex flex-col gap-5 md:gap-7.5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl md:text-2xl leading-tight md:leading-8.5 text-black">
              Brand Populer
            </h2>
            <Link
              href="/catalog"
              className="p-[10px_20px] md:p-[12px_24px] border border-black text-black rounded-full font-semibold text-sm"
            >
              Explore All
            </Link>
          </div>
          <BrandGrid items={brands} />
        </div>

        {/* New Releases */}
        <ProductGrid
          title="Produk Terbaru"
          cta={{ href: "/catalog", label: "Explore All" }}
          products={newReleaseProducts.slice(0, 10)}
        />
      </section>
    </div>
  );
}
