import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "پرداخت موفق | باران‌شاپ",
  description: "سفارش شما با موفقیت ثبت شد.",
};

type Props = {
  searchParams: Promise<{ order?: string; amount?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const orderNumber = params.order;
  const amount = params.amount ? Number(params.amount) : 0;
  
  if (!orderNumber) {
    
    redirect("/"); 
  }

  const formattedAmount = new Intl.NumberFormat("fa-IR").format(amount);

  return (
    <div className="container flex min-h-[80vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-white p-8 text-center shadow-sm">
        
        
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 size={48} strokeWidth={1.5} />
        </div>

        
        <h1 className="text-2xl font-bold text-text">
          پرداخت موفق
        </h1>

        
        <p className="mt-3 text-sm leading-7 text-text-secondary">
          پرداخت با موفقیت انجام شد.<br />
          سفارش شما با موفقیت ثبت شد و پس از بررسی، پردازش خواهد شد.
        </p>

        
        <div className="mt-8 rounded-2xl bg-surface p-6 text-right">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
            <span className="text-sm text-text-secondary">شماره سفارش</span>
            <span className="font-bold text-text dir-ltr">{orderNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">مبلغ پرداخت شده</span>
            <span className="font-bold text-primary">
              {formattedAmount}
              <span className="mr-1 text-xs">تومان</span>
            </span>
          </div>
        </div>

        
        <Link
          href="/"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-white transition hover:bg-dark"
        >
          بازگشت به صفحه اصلی
          <ArrowRight className="h-5 w-5 rotate-180" />
        </Link>
      </div>
    </div>
  );
}