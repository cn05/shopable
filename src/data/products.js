import { slugify } from "@/lib/utils";

export const products = [
  {
    image:
      "/assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom 1.png",
    name: "iMac Green Energy",
    category: "PC & Laptop",
    brand: "Apple",
    price: 24000000,
    stock: 12,
    rating: 4.7,
    reviewCount: 184,
    variants: [
      { id: "8-256", name: "8GB / 256GB" },
      { id: "16-512", name: "16GB / 512GB" },
    ],
    description:
      "All-in-one desktop untuk produktivitas harian. Layar tajam, performa stabil, dan desain yang clean untuk workspace modern.",
    createdAt: "2026-02-01",
    popularity: 92,
  },
  {
    image:
      "/assets/thumbnails/iphone15pro-digitalmat-gallery-3-202309-Photoroom 1.png",
    name: "Smartwei Pro 18",
    category: "HP & Aksesoris",
    brand: "Huawei",
    price: 11000000,
    stock: 30,
    rating: 4.4,
    reviewCount: 96,
    variants: [
      { id: "128", name: "128GB" },
      { id: "256", name: "256GB" },
    ],
    description:
      "Smartphone flagship dengan kamera tajam dan performa kencang. Cocok untuk foto, video, dan multitasking tanpa kompromi.",
    createdAt: "2026-01-20",
    popularity: 88,
  },
  {
    image:
      "/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png",
    name: "MacBook Pro X",
    category: "PC & Laptop",
    brand: "Apple",
    price: 24000000,
    stock: 8,
    rating: 4.8,
    reviewCount: 242,
    variants: [
      { id: "m4-512", name: "M4 / 512GB" },
      { id: "m4-1tb", name: "M4 / 1TB" },
    ],
    description:
      "Laptop untuk creator dan developer: baterai awet, layar nyaman, dan performa tinggi untuk workflow berat.",
    createdAt: "2026-02-15",
    popularity: 95,
  },
  {
    image:
      "/assets/thumbnails/airpods-max-select-skyblue-202011-Photoroom 1.png",
    name: "Tuli Nyaman",
    category: "Headset",
    brand: "Apple",
    price: 3500000,
    stock: 44,
    rating: 4.3,
    reviewCount: 61,
    variants: [
      { id: "sky", name: "Sky Blue" },
      { id: "midnight", name: "Midnight" },
    ],
    description:
      "Headset nyaman untuk kerja dan hiburan. Suara detail, bass mantap, dan ear-cup lembut untuk pemakaian lama.",
    createdAt: "2026-02-10",
    popularity: 80,
  },
  {
    image:
      "/assets/thumbnails/imac24-digitalmat-gallery-1-202310-Photoroom 1.png",
    name: "Warna iMac Jadi",
    category: "PC & Laptop",
    brand: "Apple",
    price: 89000000,
    stock: 3,
    rating: 4.6,
    reviewCount: 37,
    variants: [
      { id: "pro", name: "Pro Display" },
      { id: "studio", name: "Studio Bundle" },
    ],
    description:
      "Desktop premium untuk studio. Dibuat untuk performa dan tampilan maksimal di workstation profesional.",
    createdAt: "2026-01-08",
    popularity: 76,
  },
  {
    image:
      "/assets/thumbnails/pngtree-wristwatch-analog-classic-brown-leather-strap-watch-png-image_10001801.png",
    name: "Jam Tangan Dude of Wars",
    category: "Jam Tangan",
    brand: "Nokia",
    price: 2400000,
    stock: 18,
    rating: 4.2,
    reviewCount: 54,
    variants: [
      { id: "leather", name: "Leather Strap" },
      { id: "steel", name: "Steel Strap" },
    ],
    description:
      "Jam tangan klasik dengan strap nyaman. Desain timeless untuk gaya kasual maupun formal.",
    createdAt: "2025-12-25",
    popularity: 64,
  },
  {
    image: "/assets/thumbnails/ea49dfcfcaa4513d799050c989d2f177.png",
    name: "Stik PS5 nih bos",
    category: "Games",
    brand: "Microsoft",
    price: 1200000,
    stock: 22,
    rating: 4.5,
    reviewCount: 112,
    variants: [
      { id: "white", name: "White" },
      { id: "black", name: "Black" },
    ],
    description:
      "Controller nyaman dengan grip mantap. Cocok untuk sesi gaming panjang dengan input responsif.",
    createdAt: "2026-02-18",
    popularity: 90,
  },
  {
    image: "/assets/thumbnails/images.jpg",
    name: "Lampu Tidur",
    category: "Penerangan",
    brand: "Samsung",
    price: 280000,
    stock: 120,
    rating: 4.1,
    reviewCount: 78,
    variants: [
      { id: "warm", name: "Warm White" },
      { id: "cool", name: "Cool White" },
    ],
    description:
      "Lampu tidur minimalis dengan cahaya lembut. Nyaman untuk kamar dan membantu tidur lebih rileks.",
    createdAt: "2026-01-30",
    popularity: 58,
  },
].map((product, index) => ({
  id: String(index + 1),
  ...product,
  slug: slugify(product.name),
  categorySlug: slugify(product.category),
  brandSlug: slugify(product.brand),
}));

export function getProductBySlug(slug) {
  if (!slug) return null;
  const normalizedSlug = String(slug);
  return products.find((product) => product.slug === normalizedSlug) ?? null;
}
