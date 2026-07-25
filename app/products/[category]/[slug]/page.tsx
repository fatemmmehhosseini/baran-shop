import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/services/product.service";
import ProductGallery from "@/components/ui/products/ProductGallery";
import ProductPurchasePanel from "@/components/ui/products/ProductPurchasePanel";
import ProductInfoSection from "@/components/ui/products//ProductInfoSection";
import RelatedProducts from "@/components/ui/products/RelatedProducts";

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const galleryImages = Array(4).fill(product.thumbnail);

  return (
    <div className="container py-8 pb-24 md:pb-8">
      {/* breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-text-secondary">
        <Link href="/" className="transition hover:text-primary">
          خانه
        </Link>
        <span>/</span>
        <Link
          href={`/products/${product.category_slug}`}
          className="transition hover:text-primary"
        >
          {product.category_name}
        </Link>
        <span>/</span>
        <span className="text-text">{product.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        
        <ProductGallery images={galleryImages} alt={product.title} />

      
        <ProductPurchasePanel  product={product} />
      </div>

      <ProductInfoSection product={product} />

      <RelatedProducts categorySlug={product.category_slug} excludeId={product.id} />
    </div>
  );
}