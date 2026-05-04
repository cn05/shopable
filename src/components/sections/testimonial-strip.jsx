"use client";

import Image from "next/image";

export default function TestimonialStrip({ items, error }) {
  return (
    <section className="bg-muted px-4 md:px-0">
      <div className="container mx-auto flex max-w-282.5 items-center justify-center gap-4 overflow-x-auto px-4 pb-8 md:gap-10 md:px-0 md:pb-12.5">
        {error ? (
          <div className="shrink-0 rounded-2xl bg-white p-4 text-sm text-red-600 ring-1 ring-red-200">
            {error}
          </div>
        ) : null}

        {(items ?? []).map((testimonial, index) => (
          <div key={index} className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-4 border-white md:h-12.5 md:w-12.5 md:border-[5px]">
              <Image
                src={testimonial.photo}
                width={50}
                height={50}
                alt={testimonial.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5 text-black">
              <p className="text-xs font-semibold leading-5.5 md:text-sm">
                {testimonial.text}
              </p>
              <p className="text-2.5 leading-4.5 md:text-xs">{testimonial.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
