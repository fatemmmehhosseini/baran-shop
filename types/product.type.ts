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
  limit?: number;
}