import Link from "next/link";
import { getProducts } from "@/services/product.service";
import FadeIn from "@/components/ui/home/FadeIn";
import NewArrivalCard from "./NewArrivalCard";

export default async function NewArrivalsSection() {
  const products = await getProducts({
    limit: 8,
   
  });

  if (!products?.length) return null;



  return (
    <section className="container py-14">
      <FadeIn>
        <div className="mb-8 flex items-end justify-between gap-4">
        
            <h2 className="mt-1 text-2xl font-bold text-primary sm:text-3xl">
              جدیدترین محصولات
            </h2>
        
          <Link
            href="/products?sort=newest"
            className="shrink-0 text-sm font-medium text-primary hover:underline sm:block"
          >
            مشاهده همه
          </Link>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-6">
        

          {products.map((product) => (
            <div key={product.id} className="relative">
          
              <NewArrivalCard product={product} />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}


