"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="container flex min-h-[70vh] items-center justify-center">

      <div className="w-full max-w-md rounded-3xl border border-border bg-white p-10 text-center shadow-sm">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">

          <ShoppingBag
            size={42}
            className="text-primary"
          />

        </div>

        <h1 className="mt-8 text-2xl font-bold text-text">
          سبد خرید شما خالی است
        </h1>

        <p className="mt-3 leading-8 text-text-secondary">
          هنوز محصولی به سبد خرید اضافه نکرده‌اید.
          از فروشگاه دیدن کنید و محصول مورد علاقه‌تان را انتخاب کنید.
        </p>

        <Link
          href="/products"
          className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-base font-bold text-white transition hover:bg-dark"
        >
          مشاهده محصولات
        </Link>

      </div>

    </div>
  );
}