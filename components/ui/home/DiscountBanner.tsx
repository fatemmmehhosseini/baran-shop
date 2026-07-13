import Image from "next/image";
import Link from "next/link";
import { Tag, ArrowLeft } from "lucide-react";
import FadeIn from "@/components/ui/home/FadeIn";


export default function DiscountBanner() {
  return (
    <section className="container py-10">
      <FadeIn>
        <Link
          href="/products?sort=discount"
          className="group relative block overflow-hidden rounded-3xl"
        >
          {/* image */}
          <div className="relative aspect-[4/2.5] w-full sm:aspect-[21/10] lg:aspect-[3/1.19]">
            <Image
              src="/images/banner/img4.png"
              alt="۲۰٪ تخفیف ویژه تا پایان هفته"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

          
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-dark/80 to-transparent" />
          </div>

          {/* content */}
          <div className="absolute inset-0 flex flex-col items-start justify-center gap-4 p-6 text-right sm:p-10 lg:p-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-light/400 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/80">
              <Tag className="h-3.5 w-3.5" strokeWidth={2} />
              پیشنهاد ویژه
            </span>

            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              ٪۲۰ تخفیف ویژه
            </h2>

            <p className="max-w-md text-sm text-white/80 sm:text-base">
              روی مجموعه‌ای منتخب از محصولات — تا پایان هفته
            </p>

              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2.5 text-sm font-semibold text-primary shadow-lg transition-transform duration-300 group-hover:-translate-x-1 animate-pulse">
              مشاهده تخفیف‌ها
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2} />
            </span>

          </div>
        </Link>
      </FadeIn>
    </section>
  );
}