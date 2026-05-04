import { products } from "@/data/products";
import { parsePrice, slugify } from "@/lib/utils";

function parseInteger(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function sortProducts(list, sort) {
  const items = list.slice();

  switch (sort) {
    case "price_asc":
      items.sort((a, b) => a.price - b.price);
      return items;
    case "price_desc":
      items.sort((a, b) => b.price - a.price);
      return items;
    case "name_asc":
      items.sort((a, b) => a.name.localeCompare(b.name));
      return items;
    case "name_desc":
      items.sort((a, b) => b.name.localeCompare(a.name));
      return items;
    case "popular":
      items.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
      return items;
    case "newest":
    default:
      items.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      return items;
  }
}

export function queryProducts(options = {}) {
  const q = String(options.q ?? "").trim().toLowerCase();
  const sort = String(options.sort ?? "newest").trim() || "newest";
  const category = slugify(options.category ?? "");
  const brand = slugify(options.brand ?? "");
  const min = parsePrice(options.min);
  const max = parsePrice(options.max);

  const pageSize = Math.max(1, parseInteger(options.pageSize, 20));
  const page = Math.max(1, parseInteger(options.page, 1));

  let filtered = products;

  if (q) {
    filtered = filtered.filter((product) => {
      return (
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q)
      );
    });
  }

  if (category) {
    filtered = filtered.filter((product) => product.categorySlug === category);
  }

  if (brand) {
    filtered = filtered.filter((product) => product.brandSlug === brand);
  }

  if (min !== null) {
    filtered = filtered.filter((product) => product.price >= min);
  }

  if (max !== null) {
    filtered = filtered.filter((product) => product.price <= max);
  }

  const sorted = sortProducts(filtered, sort);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const items = sorted.slice(startIndex, startIndex + pageSize);

  return {
    items,
    page: safePage,
    pageSize,
    total,
    totalPages,
  };
}

