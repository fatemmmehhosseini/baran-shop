"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product.type"; 
import { colorMap } from "@/lib/colorMap";

function formatToman(amount: number) {
  return new Intl.NumberFormat("fa-IR").format(Math.round(amount));
}

export default function ProductCard({ product }: { product: Product}) {

  

  const hasDiscount = product.discount > 0;

  const finalPrice = hasDiscount

    ? product.price - (product.price * product.discount) / 100
    : product.price;
  const outOfStock = product.stock <= 0;


  

 

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      <Link
        href={`/products/${product.category_slug}/${product.slug}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-surface"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 55vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {hasDiscount && (
          <span className="absolute right-3 top-3 rounded-full   px-2.5 py-1 text-xs font-bold text-text shadow">
            ٪{product.discount} تخفیف
          </span>
          
        )}

        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[0.5px]">
            <span className="rounded-full bg-white/60 px-4 py-1.5 text-sm font-semibold text-text">
              ناموجود
            </span>
          </div>
        )}

        <button
          
          type="button"
          aria-label="افزودن سریع به سبد خرید"
          disabled={outOfStock}
          className="absolute bottom-5 left-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-primary shadow-md transition-all duration-300 group-hover:translate-y-0 disabled:pointer-events-none disabled:opacity-0"
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.category_name && (
          <span className="text-xs text-text-secondary">
            {product.category_name}
          </span>
          
        )}

        <Link href={`/products/${product.category_slug}/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-medium text-text transition-colors hover:text-primary">
            {product.title}
          </h3>
        </Link>

        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color}
                className="h-3.5 w-3.5 rounded-full ring-1 ring-gray-500/30"
                style={{ backgroundColor: colorMap[color] ?? "#E5E7EB"}}
              />
            ))}
          </div>
        )}

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-base font-bold text-primary">
            {formatToman(finalPrice)} تومان
          </span>
          {hasDiscount && (
            <span className="text-xs text-text-secondary line-through">
              {formatToman(product.price)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}