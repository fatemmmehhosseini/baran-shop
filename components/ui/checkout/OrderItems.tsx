"use client";

import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/types/cart.type";
import { colorMap } from "@/lib/colorMap";

function formatPrice(price: number) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

type Props = {
  items: CartItem[];
};

export default function OrderItems({ items }: Props) {
  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold text-text">محصولات سفارش</h2>
      
      <div className="divide-y divide-border">
        {items.map((item) => (
          <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-4 py-4">
            <Link href={`/products/${item.category_slug}/${item.slug}`} className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-surface">
              <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
            </Link>
            
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link href={`/products/${item.category_slug}/${item.slug}`} className="font-bold text-text hover:text-primary line-clamp-1">
                  {item.title}
                </Link>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary">
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full border" style={{ backgroundColor: colorMap[item.color] || "#ddd" }} />
                    {item.color}
                  </span>
                  <span>سایز: {item.size}</span>
                  <span>تعداد: {item.quantity}</span>
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <span className="text-xs text-text-secondary">قیمت :</span>
                <span className="font-bold text-text">
                  {formatPrice(item.price)} تومان
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}