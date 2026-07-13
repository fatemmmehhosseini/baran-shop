import Link from "next/link";
import ProductCard from '@/components/ui/home/products/ProductCard'
import PriceRangeFilter from '@/components/ui/products/PriceRangeFilter';
import SortSelect from '@/components/ui/products/SortSelect';
import { getProducts } from '@/services/product.service'
import { PackageSearch } from 'lucide-react'
import React from 'react'


type Props = {
  
  searchParams: Promise<{
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

export default async function page({searchParams}: Props ) {
    const {sort, minPrice, maxPrice} = await searchParams;

    const products = await getProducts({
        sort: sort as "discount" |"newest" | "bestSeller" | "price-asc" | "price-desc" | undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
    })
    

  return (
       <div className="container py-8 pb-24 md:pb-8">
          <nav className="mb-4 flex items-center gap-2 text-xs text-text-secondary">
            <Link href="/" className="transition hover:text-primary">
              خانه
            </Link>
            <span>/</span>
            <Link href="/" className="transition hover:text-primary">
              محصولات
            </Link>
          </nav>
    
          <h1 className="mb-1 text-2xl font-bold text-text sm:text-3xl">
           فروشگاه
          </h1>
          <p className="mb-6 text-sm text-text-secondary">
            {products.length} محصول
          </p>
    
          <div className="flex flex-col gap-8 lg:flex-row">
            
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-24 flex flex-col gap-6">{/* <CategoryList categories={categories} activeSlug={category} /> */}
                <PriceRangeFilter />
              </div>
            </aside>
    
            {/* محتوای اصلی */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-end">
                     <SortSelect />
              </div>
              {products.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-24 text-center">
                  <PackageSearch
                    className="h-10 w-10 text-text-secondary"
                    strokeWidth={1.5}
                  />
                  <p className="text-text-secondary">
                    محصولی با این فیلترها پیدا نشد.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
  )
}
