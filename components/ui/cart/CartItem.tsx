"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import { colorMap } from "@/lib/colorMap";
import { CartItem as CartItemType } from "@/types/cart.type";
import { useCartStore } from "@/stores/cart.store";
import FadeIn from "../home/FadeIn";

type Props = {
  item: CartItemType;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export default function CartItem({ item }: Props) {

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const isMaxStock = item.quantity >= (item.stock || 0);


  return (
    
    <FadeIn>
      <div className="rounded-3xl border border-border bg-white p-5 shadow-sm transition hover:shadow-md">

        <div className="flex gap-5">

          <Link
            href={`/products/${item.category_slug}/${item.slug}`}
            className="relative h-36 w-28 overflow-hidden rounded-2xl bg-surface"
          >

            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              sizes="120px"
              className="object-cover"
            />

          </Link>

          <div className="flex flex-1 flex-col">

            <div className="flex items-start justify-between gap-4">

              <div>

                <Link
                  href={`/products/${item.category_slug}/${item.slug}`}
                  className="text-lg font-bold hover:text-primary"
                >
                  {item.title}
                </Link>

                <div className="mt-4 flex flex-wrap gap-3">

                  <div className="flex items-center gap-2">

                    <span
                      className="h-4 w-4 rounded-full border"
                      style={{
                        backgroundColor:
                          colorMap[item.color] ?? "#ddd",
                      }}
                    />

                    <span className="text-sm text-text-secondary">
                      {item.color}
                    </span>

                  </div>

                  <span className="text-text-secondary">
                    سایز {item.size}
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  removeItem({
                    productId: item.productId,
                    color: item.color,
                    size: item.size,
                  })
                }
                className="rounded-xl p-2 text-red-500 transition hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>

            </div>

            <div className="mt-auto flex items-end justify-between">

              <div>

                <p className="text-xl font-bold text-primary">

                  {formatPrice(item.price)}

                  <span className="mr-1 text-sm">
                    تومان
                  </span>

                </p>

              </div>

              <div className="flex items-center rounded-2xl border border-border">

                <button
                  onClick={() =>
                    decreaseQuantity({
                      productId: item.productId,
                      color: item.color,
                      size: item.size,
                    })
                  }
                  
                  className="p-3 transition hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus size={18} />
                </button>

                <span className="min-w-10 text-center font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity({
                      productId: item.productId,
                      color: item.color,
                      size: item.size,
                    })
                  }
                  disabled={isMaxStock}
                  className="p-3 transition hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus size={18} />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </FadeIn>

  );
}