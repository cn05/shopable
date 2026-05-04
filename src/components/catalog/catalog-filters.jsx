"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Drawer from "@/components/ui/drawer";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { cn } from "@/lib/utils";

function isTruthy(value) {
  return value !== null && value !== undefined && String(value).trim() !== "";
}

function CatalogFiltersForm({
  categories,
  brands,
  values,
  compact = false,
  onClose,
}) {
  const gridClassName = compact
    ? "grid grid-cols-1 gap-4"
    : "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6";

  return (
    <form action="/catalog" className={cn(compact ? "" : "mt-6")}>
      <Card className={cn("p-5", compact && "ring-0 hover:ring-0")}>
        <div className={gridClassName}>
          <div className={compact ? "" : "lg:col-span-2"}>
            <label className="text-xs font-semibold text-textMuted">Search</label>
            <Input
              name="q"
              defaultValue={values.q ?? ""}
              placeholder="Cari produk, brand, kategori..."
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-textMuted">Sort</label>
            <Select name="sort" defaultValue={values.sort ?? "newest"} className="mt-2">
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
              <option value="price_asc">Harga: Low → High</option>
              <option value="price_desc">Harga: High → Low</option>
              <option value="name_asc">Nama: A → Z</option>
              <option value="name_desc">Nama: Z → A</option>
            </Select>
          </div>

          <div>
            <label className="text-xs font-semibold text-textMuted">Category</label>
            <Select name="category" defaultValue={values.category ?? ""} className="mt-2">
              <option value="">Semua</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="text-xs font-semibold text-textMuted">Brand</label>
            <Select name="brand" defaultValue={values.brand ?? ""} className="mt-2">
              <option value="">Semua</option>
              {brands.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>

          <div className={compact ? "" : "lg:col-span-2"}>
            <label className="text-xs font-semibold text-textMuted">Harga</label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Input
                name="min"
                inputMode="numeric"
                defaultValue={values.min ?? ""}
                placeholder="Min"
              />
              <Input
                name="max"
                inputMode="numeric"
                defaultValue={values.max ?? ""}
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <div className={cn("mt-5 flex flex-wrap items-center gap-3", compact && "pb-2")}>
          <Button type="submit">Apply Filter</Button>
          <Link
            href="/catalog"
            className="rounded-full border border-black px-6 py-3 text-sm font-semibold text-black hover:bg-white"
          >
            Reset
          </Link>
          {compact ? (
            <button
              type="button"
              onClick={onClose}
              className="ml-auto rounded-full bg-muted px-6 py-3 text-sm font-semibold text-black hover:bg-muted/80"
            >
              Tutup
            </button>
          ) : null}
        </div>
      </Card>
    </form>
  );
}

export default function CatalogFilters({
  categories = [],
  brands = [],
  values = {},
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const activeCount = useMemo(() => {
    const countableKeys = ["q", "category", "brand", "min", "max"];
    const base = countableKeys.reduce((acc, key) => acc + (isTruthy(values[key]) ? 1 : 0), 0);
    const sortIsDefault = !isTruthy(values.sort) || values.sort === "newest";
    return base + (sortIsDefault ? 0 : 1);
  }, [values]);

  return (
    <div className={className}>
      <div className="hidden md:block">
        <CatalogFiltersForm categories={categories} brands={brands} values={values} />
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brandHover"
        >
          Filter & Sort
          {activeCount ? <Badge variant="accent">{activeCount}</Badge> : null}
        </button>
        <Link
          href="/catalog"
          className="rounded-full border border-black px-5 py-3 text-sm font-semibold text-black hover:bg-white"
        >
          Reset
        </Link>
      </div>

      <Drawer
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Filter Catalog"
        description="Gunakan filter untuk mempersempit hasil."
      >
        <CatalogFiltersForm
          categories={categories}
          brands={brands}
          values={values}
          compact
          onClose={() => setIsOpen(false)}
        />
      </Drawer>
    </div>
  );
}
