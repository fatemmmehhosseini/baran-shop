"use client";

import { CartItem } from "@/types/cart.type";
import { Truck, Tag } from "lucide-react";

function formatPrice(price: number) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

type Props = {
  items: CartItem[];
};

export default function PaymentSummary({ items }: Props) {
  const totalPrice = items.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const totalDiscount = items.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0);
  const shippingCost = 80000;
  const finalPrice = totalPrice - totalDiscount + shippingCost;

  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold text-text">خلاصه پرداخت</h2>
      
      <div className="space-y-4 text-sm">
        <div className="flex justify-between text-text-secondary">
          <span>جمع کالاها</span>
          <span>{formatPrice(totalPrice)} تومان</span>
        </div>
        
        <div className="flex justify-between text-text-secondary">
          <span className="flex items-center gap-2">
            <Tag size={16} className="text-primary" />
            تخفیف
          </span>
          <span className="text-light">-{formatPrice(totalDiscount)} تومان</span>
        </div>
        
        <div className="flex justify-between text-text-secondary">
          <span className="flex items-center gap-2">
            <Truck size={16} className="text-primary" />
            هزینه ارسال (پست پیشتاز)
          </span>
          <span>{formatPrice(shippingCost)} تومان</span>
        </div>
        
        <div className="my-4 h-px bg-border" />
        
        <div className="flex justify-between text-base font-bold">
          <span>مبلغ قابل پرداخت</span>
          <span className="text-primary text-xl">{formatPrice(finalPrice)} تومان</span>
        </div>
      </div>

      
      <div className="mt-6">
        <label className="mb-2 block text-xs font-medium text-text-secondary">کد تخفیف (اختیاری)</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="کد تخفیف خود را وارد کنید"
            className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
            disabled
          />
          <button className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed">
            اعمال
          </button>
        </div>
      </div>
    </div>
  );
}