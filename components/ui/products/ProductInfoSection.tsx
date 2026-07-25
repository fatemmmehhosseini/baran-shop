import type { Product } from "@/types/product.type";

export default function ProductInfoSection({ product }: { product: Product }) {
  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
      <div className="rounded-2xl border border-border p-6 lg:col-span-2">
        <h2 className="mb-4 text-lg font-bold text-text">توضیحات محصول</h2>
        <p className="whitespace-pre-line leading-8 text-text-secondary">
          {product.description}
        </p>
      </div>

      <div className="rounded-2xl border border-border p-6">
        <h2 className="mb-4 text-lg font-bold text-text">مشخصات</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <dt className="text-text-secondary">کد محصول</dt>
            <dd className="font-medium text-text">{product.product_code}</dd>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <dt className="text-text-secondary">دسته‌بندی</dt>
            <dd className="font-medium text-text">{product.category_name}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-text-secondary">وضعیت موجودی</dt>
            <dd className="font-medium text-text">
              {product.stock > 0 ? "موجود" : "ناموجود"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}