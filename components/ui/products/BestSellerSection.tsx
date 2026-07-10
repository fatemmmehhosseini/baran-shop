import Link from "next/link";
import { getProducts } from "@/services/product.service"
import ProductCarousel from "./ProductCarousel";
import FadeIn from "@/components/ui/FadeIn";

export default async function BestSellerSection() {
  const products = await getProducts({
    bestSeller: true,
    limit: 8,
  });

  if (!products?.length) return null;

  return (
    <section className="container py-14">
      <FadeIn>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-2xl font-bold text-primary sm:text-3xl">
              پرفروش‌ترین‌ها
            </span>
            <h2 className="mt-1 text-sm font-medium text-text-secondary sm:text-md">
              محبوب‌ترین انتخاب مشتریان
            </h2>
          </div>

          <Link
            href="/products?bestSeller=true"
            className="hidden shrink-0 text-sm font-medium text-primary hover:underline sm:block"
          >
            مشاهده همه
          </Link>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <ProductCarousel products={products} />
      </FadeIn>
    </section>
  );
}