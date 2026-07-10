"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product.type";

type Props = {
  products: Product[];
};

export default function ProductCarousel({ products = [] }: Props) {

  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
     loop: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);


  useEffect(() => {
    
  if (!emblaApi) return;

  const updateButtons = () => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  };

  updateButtons();

  emblaApi.on("select", updateButtons);
  emblaApi.on("reInit", updateButtons);

  return () => {
    emblaApi.off("select", updateButtons);
    emblaApi.off("reInit", updateButtons);
  };
}, [emblaApi]);

  if (!products.length) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-me-4 flex">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-0 my-3 shrink-0 grow-0 basis-[55%] pe-4 sm:basis-[38%] md:basis-[28%] lg:basis-[20%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* prev/next: desktop only, hidden on mobile so users just swipe/scroll */}
      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
        aria-label="محصولات قبلی"
        className="absolute -right-5 top-[38%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] shadow-md transition hover:bg-[var(--color-surface)] disabled:pointer-events-none disabled:opacity-30 md:flex"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
        aria-label="محصولات بعدی"
        className="absolute -left-5 top-[38%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] shadow-md transition hover:bg-[var(--color-surface)] disabled:pointer-events-none disabled:opacity-30 md:flex"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
      </button>
    </div>
  );
}