import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export default function sitemap() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

  const now = new Date();

  const staticRoutes = [
    "/",
    "/catalog",
    "/categories",
    "/testimonials",
    "/rewards",
    "/cart",
    "/checkout",
    "/signin",
    "/signup",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  const urls = [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
    })),
    ...categories.map((item) => ({
      url: `${base}/category/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...brands.map((item) => ({
      url: `${base}/brand/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    })),
    ...products.map((item) => ({
      url: `${base}/product/${item.slug}`,
      lastModified: new Date(item.createdAt ?? now),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];

  return urls;
}

