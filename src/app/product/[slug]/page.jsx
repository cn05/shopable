import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { formatRupiah } from "@/lib/utils";
import ProductPurchasePanel from "@/components/product/product-purchase-panel";

export async function generateMetadata({ params }) {
  const slug = params?.slug ?? "";
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product",
      description: "Detail produk di Shopable.",
    };
  }

  const desc = String(product.description ?? "").trim();
  const short = desc.length > 140 ? `${desc.slice(0, 140)}...` : desc;

  return {
    title: product.name,
    description: `${short} Harga ${formatRupiah(product.price)}.`,
  };
}

function RatingStars({ rating }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating ?? 0)));

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < filled;
        return (
          <Image
            key={index}
            src={isFilled ? "/assets/icons/Star.svg" : "/assets/icons/Star-gray.svg"}
            alt={isFilled ? "Star" : "Empty star"}
            width={18}
            height={18}
          />
        );
      })}
    </div>
  );
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams?.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-muted px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-282.5">
        <div className="flex flex-wrap items-center gap-2 text-sm text-textMuted">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-black">
            Catalog
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.categorySlug}`}
            className="hover:text-black"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-3xl bg-white p-6 ring-1 ring-border">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-contain p-6"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <h1 className="text-2xl font-bold leading-tight text-black md:text-3xl">
                  {product.name}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-textMuted">
                  <Link
                    href={`/brand/${product.brandSlug}`}
                    className="hover:text-black"
                  >
                    {product.brand}
                  </Link>
                  <span className="text-border">•</span>
                  <span>{product.category}</span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <RatingStars rating={product.rating} />
                  <span className="text-sm font-semibold text-black">
                    {product.rating?.toFixed(1) ?? "0.0"}
                  </span>
                  <span className="text-sm text-textMuted">
                    ({product.reviewCount ?? 0} ulasan)
                  </span>
                </div>

                <div className="mt-6 rounded-3xl bg-muted p-5">
                  <p className="text-xs font-semibold text-textMuted">Harga</p>
                  <p className="mt-1 text-xl font-bold text-brand">
                    {formatRupiah(product.price)}
                  </p>
                </div>

                <div className="mt-6">
                  <h2 className="text-sm font-bold text-black">Deskripsi</h2>
                  <p className="mt-2 text-sm leading-relaxed text-textMuted">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <ProductPurchasePanel product={product} />
        </div>
      </div>
    </main>
  );
}
