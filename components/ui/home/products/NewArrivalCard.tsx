import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product.type";
import { ShoppingBag } from "lucide-react";

function formatToman(amount: number) {
  return new Intl.NumberFormat("fa-IR").format(Math.round(amount));
}

export default function NewArrivalCard({
  product,
}: {
  product: Product;
}) {
  const hasDiscount = product.discount > 0;
  const finalPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

    const outOfStock = product.stock <= 0;

  return (
    <Link
      href={`/products/${product.category_slug}/${product.slug}`}
      className={`group relative block h-64 overflow-hidden rounded-2xl sm:h-80 lg:h-84`}
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        fill
        
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      {/* bottom gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* top badges */}
      <div className="absolute inset-x-3 top-3 flex items-start justify-between">
        <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-white shadow">
          جدید
        </span>
       
      </div>

      {/* bottom text */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-white sm:text-base">
          {product.title}
        </h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-bold text-white/70">
            {formatToman(finalPrice)} تومان
          </span>
         
        </div>
      </div>
       <button
          type="button"
          aria-label="افزودن سریع به سبد خرید"
          disabled={outOfStock}
          className="absolute bottom-5 left-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/80 text-primary opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 disabled:pointer-events-none disabled:opacity-0"
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
        </button>
    </Link>
  );
}