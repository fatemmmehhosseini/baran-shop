import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageSearch } from "lucide-react";
import { getCategoryBySlug, getCategories } from "@/services/category.service"; 
import { getProducts } from "@/services/product.service";
import ProductCard from "@/components/ui/home/products/ProductCard";
import CategoryList from "@/components/ui/products/CategoryList";
import PriceRangeFilter from "@/components/ui/products/PriceRangeFilter";
import SortSelect from "@/components/ui/products/SortSelect";

const categoryMeta = {
  "office-uniform": {
    title: "لباس فرم اداری",
    description:
      "خرید لباس فرم اداری زنانه با طراحی رسمی، پارچه باکیفیت و دوخت حرفه‌ای از فروشگاه باران.",
    keywords: [
      "لباس فرم اداری",
      "فرم اداری زنانه",
      "خرید لباس اداری",
      "فروشگاه باران",
    ],
  },

  coat: {
    title: "پالتو زنانه",
    description:
      "جدیدترین مدل‌های پالتو زنانه با کیفیت بالا، طراحی مدرن و ارسال سریع از فروشگاه باران.",
    keywords: [
      "پالتو زنانه",
      "خرید پالتو",
      "پالتو شیک",
      "باران",
    ],
  },

  "manteau-coat": {
    title: "مانتو و پالتو",
    description:
      "مشاهده جدیدترین مدل‌های مانتو و پالتو زنانه با طراحی خاص و کیفیت بالا از فروشگاه باران.",
    keywords: [
      "مانتو",
      "پالتو",
      "مانتو زنانه",
      "خرید مانتو",
      "باران",
    ],
  },

  suit: {
    title: "ست زنانه",
    description:
      "خرید انواع ست زنانه شیک و مدرن مناسب استفاده روزمره و مجلسی از فروشگاه باران.",
    keywords: [
      "ست زنانه",
      "خرید ست",
      "لباس ست",
      "باران",
    ],
  },
};

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  const meta =
    categoryMeta[category as keyof typeof categoryMeta] ?? {
      title: "محصولات",
      description: "مشاهده محصولات فروشگاه باران",
      keywords: ["فروشگاه باران"],
    };

  return {
    title: `${meta.title} | فروشگاه باران`,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://baranshop.ir/products/${category}`,
    },
    openGraph: {
      title: `${meta.title} | فروشگاه باران`,
      description: meta.description,
      url: `https://baranshop.ir/products/${category}`,
      images: [
        {
          url: `/images/categories/coat.webp`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
  };
}


type PageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { category } = await params;
  const { sort, minPrice, maxPrice } = await searchParams;

  const [categoryInfo, categories] = await Promise.all([
    getCategoryBySlug(category),
    getCategories(),
  ]);

  if (!categoryInfo) {
    notFound();
  }


  const products = await getProducts({
    categorySlug: category,
    sort: sort as "newest" | "bestSeller" | "price-asc" | "price-desc" | undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  return (
    <div className="container py-8 pb-24 md:pb-8">
      
      
      <nav className="mb-4 flex items-center gap-2 text-xs text-text-secondary">
        <Link href="/" className="transition hover:text-primary">
          خانه
        </Link>
        <span>/</span>
         <Link href="/products" className="transition hover:text-primary">
          محصولات
        </Link>
        <span>/</span>
        <span className="text-text">{categoryInfo.name}</span>
      </nav>

      <h1 className="mb-1 text-2xl font-bold text-text sm:text-3xl">
        {categoryInfo.name}
      </h1>
      <p className="mb-6 text-sm text-text-secondary">
        {products.length} محصول
      </p>

      <div className="flex flex-col gap-8 lg:flex-row">
        
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-27 flex flex-col gap-6">
            <CategoryList categories={categories} activeSlug={category} />
            <PriceRangeFilter />
          </div>
        </aside>

        
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
  );
}