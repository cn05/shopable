# Shopable

Konsep frontend e-commerce menggunakan Next.js (App Router) + Tailwind CSS. Fokus project ini: UI yang rapi, responsif, dan mudah dikembangkan menjadi flow e-commerce lengkap (catalog → product detail → cart → checkout).

## Fitur (saat ini)

- Homepage responsif: hero, kategori, produk, testimoni, footer
- Optimasi gambar dengan `next/image`
- Tailwind CSS v4 (CSS-first)
- ESLint preset `next/core-web-vitals`

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- ESLint 9
- pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Buka `http://localhost:3000`.

## Scripts

```bash
pnpm lint
pnpm build
pnpm start
```

## Struktur Folder

- `src/app` — routes, layout, global styles
- `src/components` — components
- `src/components/ui` — UI primitives (Button, Input, Badge, dll)
- `src/components/sections` — page sections (Hero, ProductGrid, dll)
- `src/lib` — utility functions
- `src/data` — mock data seed
- `public/assets` — static assets

## Screenshot

Tambahkan screenshot halaman utama ke `docs/screenshots/home.png`, lalu update README agar menampilkan gambar tersebut.
