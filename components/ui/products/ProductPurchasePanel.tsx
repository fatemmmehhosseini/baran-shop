"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus, Check } from "lucide-react";
import type { Product } from "@/types/product.type"; 
import { colorMap } from "@/lib/colorMap";
import { useCartStore } from "@/stores/cart.store";

function formatToman(n: number) {
  return new Intl.NumberFormat("fa-IR").format(Math.round(n));
}

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const hasDiscount = product.discount > 0;
  const finalPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price;
  const outOfStock = product.stock <= 0;

  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem)

  function handleAddToCart() {
    
    addItem({
      productId: product.id,
      title: product.title,
      slug: product.slug,
      thumbnail: product.thumbnail,
      price: finalPrice,
      discount: product.discount,
      originalPrice: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
      stock: product.stock,
      category_slug: product.category_slug
      
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const cart = useCartStore((state)=>state.cart)
  console.log(cart)

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-primary">
          {product.category_name}
        </span>
        <span className="text-xs text-text-secondary">
          کد: {product.product_code}
        </span>
      </div>

      <h1 className="text-2xl font-bold text-text sm:text-3xl">
        {product.title}
      </h1>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-2xl font-extrabold text-primary">
          {formatToman(finalPrice)} تومان
        </span>
        {hasDiscount && (
          <>
            <span className="text-sm text-text-secondary line-through">
              {formatToman(product.price)} تومان
            </span>
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
              ٪{product.discount}
            </span>
          </>
        )}
      </div>

      <span
        className={`mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
          outOfStock ? "bg-red-50 text-red-600" : "bg-light/10 text-light"
        }`}
      >
        {outOfStock ? "ناموجود" : `موجود در انبار (${product.stock} عدد)`}
      </span>

      <hr className="my-6 border-border" />

      {product.colors.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 text-sm font-semibold text-text">رنگ</p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                aria-label={color}
                className={`h-9 w-9 rounded-full mx-1 ring-2 ring-offset-2 transition ${
                  selectedColor === color ? "ring-primary" : "ring-gray-200"
                }`}
                style={{ backgroundColor: colorMap[color] ?? "#E5E7EB"}}
              />
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 text-sm font-semibold text-text">سایز</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`min-w-11 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  selectedSize === size
                    ? "border-primary bg-primary text-white"
                    : "border-border text-text hover:border-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row">
        <div className="flex items-center justify-between rounded-xl border border-border px-2 sm:w-32">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={outOfStock}
            className="flex h-10 w-10 items-center justify-center text-text disabled:opacity-40"
            aria-label="کم کردن تعداد"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
            disabled={outOfStock}
            className="flex h-10 w-10 items-center justify-center text-text disabled:opacity-40"
            aria-label="زیاد کردن تعداد"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-dark disabled:cursor-not-allowed disabled:bg-text-secondary disabled:shadow-none"
        >
          {added ? (
            <>
              <Check className="h-5 w-5" strokeWidth={2} />
              به سبد اضافه شد
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
              {outOfStock ? "ناموجود" : "افزودن به سبد خرید"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}