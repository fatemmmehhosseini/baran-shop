import { RowDataPacket } from "mysql2";

export interface Product {
  id: number;
  product_code: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  thumbnail: string;
  sizes: string[];
  colors: string[];
  status: "active" | "inactive";
  is_best_seller: number;
  category_id: number;
  category_name: string;
  category_slug: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProductDto {
  product_code: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  thumbnail: string;
  sizes: string[];
  colors: string[];
  status: "active" | "inactive";
  is_best_seller: number;
  category_id: number;
}

export interface GetProductsOptions {
  bestSeller?: boolean;
  categoryId?: number;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;

  limit?: number;

  sort?: "newest" | "bestSeller" | "oldest" | "price-asc" | "price-desc" | "discount";
}

export interface SearchProduct extends RowDataPacket {
  id: number;
  title: string;
  slug: string;

  thumbnail: string | null;
  category_slug: string;
  
}