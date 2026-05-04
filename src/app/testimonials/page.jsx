import Image from "next/image";
import Link from "next/link";
import { testimonials } from "@/data/testimonials";

export const metadata = {
  title: "Testimonials",
  description: "Testimoni pelanggan (mock) untuk demo portfolio Shopable.",
};

export default function TestimonialsPage() {
  return (
    <main className="bg-muted px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              Testimoni
            </h1>
            <p className="mt-1 text-sm text-textMuted">
              Demo portfolio: testimoni menggunakan data mock.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-black px-6 py-3 text-sm font-semibold text-black hover:bg-white"
          >
            Kembali ke Home
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-6 ring-1 ring-border"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-muted">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-black">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-textMuted">Verified buyer</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-textMuted">
                “{testimonial.text}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
