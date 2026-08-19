import Link from "next/link";
import { Home, ArrowLeft, ShoppingBag } from "lucide-react";


export default function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-surface px-4 py-12 text-center">
      
      
      <div className="relative mb-8 h-48 w-48 md:h-64 md:w-64">
        
        <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
        
        
        <div className="relative flex h-full w-full items-center justify-center">
           
           <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-2xl md:h-40 md:w-40">
              <span className="text-6xl font-black text-primary/90 md:text-8xl">404</span>
           </div>
        </div>
      </div>

      
      <h1 className="mb-4 text-3xl font-black text-text md:text-5xl">
        صفحه مورد نظر یافت نشد!
      </h1>
      
      <p className="mx-auto mb-8 max-w-md text-lg leading-8 text-text-secondary">
        متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد یا جابه‌جا شده است. 
        نگران نباشید، ما شما را به صفحه اصلی راهنمایی می‌کنیم.
      </p>

      
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="group flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:bg-dark"
        >
          <Home size={20} />
          بازگشت به صفحه اصلی
        </Link>
        
        <Link
          href="/products"
          className="group flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-8 py-4 text-base font-bold text-text transition-all hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-md"
        >
          <ShoppingBag size={20} />
           مشاهده محصولات
        </Link>
      </div>

      
      <div className="mt-16 flex items-center gap-2 text-sm text-text-secondary opacity-60">
        <ArrowLeft size={16} className="animate-bounce" />
        <span>ممکن است آدرس صفحه تغییر کرده باشد.</span>
      </div>
    </div>
  );
}