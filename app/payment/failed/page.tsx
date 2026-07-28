import Link from "next/link";
import { XCircle, RefreshCcw, ShoppingBag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پرداخت ناموفق | باران‌شاپ",
  description: "پرداخت انجام نشد.",
};

export default function FailedPage() {
  return (
    <div className="container flex min-h-[80vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-white p-8 text-center shadow-sm">
        
        
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
          <XCircle size={48} strokeWidth={1.5} />
        </div>

        
        <h1 className="text-2xl font-bold text-text">
          پرداخت انجام نشد
        </h1>

        
        <p className="mt-3 text-sm leading-7 text-text-secondary">
          متأسفانه عملیات پرداخت با خطا مواجه شد.<br />
          در صورت کسر وجه، مبلغ طبق قوانین بانکی طی مدت مشخص به حساب شما باز خواهد گشت.
        </p>

        
        <div className="mt-8 space-y-3">
          <Link
            href="/payment"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-white transition hover:bg-dark"
          >
            تلاش مجدد
            <RefreshCcw className="h-5 w-5" />
          </Link>

          <Link
            href="/cart"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-white py-4 font-bold text-text transition hover:bg-surface"
          >
            بازگشت به سبد خرید
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}