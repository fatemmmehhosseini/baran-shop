"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Package } from "lucide-react";
import { SearchProduct } from "@/types/product.type";

type Props = {
  product: SearchProduct;
  isHighlighted?: boolean;
  onClick?: () => void;
};

export default function SearchResult({ product, isHighlighted, onClick }: Props) {
  return (
    <Link
      href={`/products/${product.category_slug}/${product.slug}`}
      onClick={onClick}
      className={`group flex items-center gap-3 border-b border-border p-3 transition last:border-none ${
        isHighlighted ? "bg-primary/10" : "hover:bg-surface"
      }`}
    >
      <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-surface">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-secondary">
            <Package size={20} />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        <p className="line-clamp-2 text-sm font-bold text-text">
          {product.title}
        </p>
      </div>
      
      <ChevronLeft className="h-4 w-4 text-text-secondary opacity-60 transition group-hover:opacity-100 ltr:rotate-180" />
    </Link>
  );
}