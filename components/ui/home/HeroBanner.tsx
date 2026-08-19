
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { src: "/images/banner/img1.png", alt: "بنر ۱" },
  { src: "/images/banner/img2.png", alt: "بنر ۲" },
  { src: "/images/banner/img3.png", alt: "بنر ۳" },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent((index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="container group relative aspect-[16/8.4] lg:aspect-[3/1.3] w-full overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out w-full"
            style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1 : 0 }}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, 1200px"
              className={`object-cover transition-all duration-700 rounded-2xl ${
                isActive
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
              quality={85} 
            />
          </div>
        );
      })}

      {/* Controls */}
      <button
        type="button"
        onClick={prev}
        aria-label="اسلاید قبلی"
        className="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-text opacity-0 shadow-md transition hover:bg-white group-hover:opacity-100 focus-visible:opacity-100"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="اسلاید بعدی"
        className="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-text opacity-0 shadow-md transition hover:bg-white group-hover:opacity-100 focus-visible:opacity-100"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
      </button>

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-2">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`رفتن به اسلاید ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === current
                ? "w-6 bg-primary"
                : "w-2 bg-gray-400/70 hover:bg-gray-300/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}