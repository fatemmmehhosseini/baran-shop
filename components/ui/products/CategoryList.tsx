import { Category } from "@/types/category.type";
import Link from "next/link";

type CategoryListProps = {
  categories: Category[];
  activeSlug: string;
};

export default function CategoryList({ categories, activeSlug }: CategoryListProps) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <h3 className="mb-4 text-sm font-bold text-text">دسته‌بندی‌ها</h3>
      <ul className="space-y-1">
        {categories.map((cat) => {
          const isActive = cat.slug === activeSlug;
          return (
            <li key={cat.id}>
              <Link
                href={`/products/${cat.slug}`}
                className={`block rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-primary font-semibold text-white"
                    : "text-text hover:bg-surface"
                }`}
              >
                {cat.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}