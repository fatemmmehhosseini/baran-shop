"use client";

import Link from "next/link";
import { Truck, ShieldCheck, Tag } from "lucide-react";
import { useCartStore } from "@/stores/cart.store";



function formatPrice(price: number) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export default function CartSummary() {
  const cart = useCartStore((state) => state.cart);

  
  const totalPrice = cart.reduce(
    (total, item) => total + item.originalPrice * item.quantity,0);

  
  const totalDiscount = cart.reduce(
    (total, item) =>total +(item.originalPrice - item.price) * item.quantity,0);


  const shipping = 0;

  
  const finalPrice = totalPrice - totalDiscount + shipping;

  return (
    <aside className="sticky top-24 h-fit rounded-3xl border border-border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        خلاصه سفارش
      </h2>

      <div className="space-y-5">


        <div className="flex items-center justify-between">

          <span className="text-text-secondary">
            جمع کالاها
          </span>

          <span className="font-bold">

            {formatPrice(totalPrice)}

            <span className="mr-1 text-sm">
              تومان
            </span>

          </span>

        </div>

        

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Tag
              size={18}
              className="text-primary"
            />

            <span className="text-text-secondary">
              سود شما
            </span>

          </div>

          <span className="font-bold text-light">

            {formatPrice(totalDiscount)}

            <span className="mr-1 text-sm">
              تومان
            </span>

          </span>

        </div>

        

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Truck
              size={18}
              className="text-primary"
            />

            <span className="text-text-secondary">
              هزینه ارسال
            </span>

          </div>

          <span className="font-bold text-light">
            رایگان
          </span>

        </div>

        <div className="h-px bg-border" />

        

        <div className="flex items-center justify-between">

          <span className="text-lg font-bold">
            مبلغ قابل پرداخت
          </span>

          <span className="text-2xl font-extrabold text-primary">

            {formatPrice(finalPrice)}

            <span className="mr-1 text-sm">
              تومان
            </span>

          </span>

        </div>

      </div>

      <Link
        href="/checkout"
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/20 transition duration-300 hover:bg-dark hover:shadow-xl active:scale-[0.98]"
      >
        ادامه فرایند خرید
      </Link>

      <Link
        href="/products"
        className="mt-4 block text-center text-sm text-primary hover:underline"
      >
        بازگشت به فروشگاه
      </Link>

      <div className="mt-8 rounded-2xl bg-surface p-5">

        <div className="flex items-start gap-3">

          <ShieldCheck
            size={22}
            className="mt-1 text-primary"
          />

          <div>

            <h3 className="font-semibold">
              خرید مطمئن
            </h3>

            <p className="mt-2 text-sm leading-7 text-text-secondary">

              تمامی سفارش‌های فروشگاه باران با تضمین
              کیفیت، امکان تعویض و پشتیبانی کامل
              ارسال می‌شوند.

            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}