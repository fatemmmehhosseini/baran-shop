"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const gallery = images.length > 0 ? images : ["/images/placeholder.jpg"];

  return (
    <div className={`flex flex-col-reverse gap-4 lg:flex-row`}>
      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto lg:w-20 lg:flex-col lg:overflow-visible">
          {gallery.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-20 w-18 shrink-0 overflow-hidden rounded-xl border-3 transition ${
                active === i ? "border-primary" : "border-transparent"
              }`}
            >
              <Image src={img} alt={`${alt} ${i + 1}`} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-[3/3.7] md:max-w-110 flex-1 overflow-hidden rounded-2xl bg-surface">
        <Image
          src={gallery[active]}
          alt={alt}
          fill
          sizes="(min-width:100px) 45vw, 80vw"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}