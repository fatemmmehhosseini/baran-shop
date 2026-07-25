import { getProducts } from "@/services/product.service";
import ProductCarousel from "@/components/ui/home/products/ProductCarousel"
import FadeIn from "@/components/ui/home/FadeIn";

export default async function RelatedProducts({
  categorySlug,
  excludeId,
}: {
  categorySlug: string;
  excludeId: number;
}) {
  const products = await getProducts({ categorySlug, limit: 6 });
  const related = products.filter((p) => p.id !== excludeId).slice(0, 8);

  if (!related.length) return null;

  return (
    <section className="container mt-16">
      <FadeIn>
        <h2 className="mb-6 text-xl font-bold text-text sm:text-2xl">
          محصولات مرتبط
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <ProductCarousel products={related} />
      </FadeIn>
    </section>
  );
}