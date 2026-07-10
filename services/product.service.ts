import db from "@/lib/db";
import { CreateProductDto, GetProductsOptions, Product } from "@/types/product.type";
import { ResultSetHeader } from "mysql2";

export async function getProducts(options?: GetProductsOptions) {
   console.log("getProducts called", options);
  let query = `
    SELECT
      p.*,
      c.name AS category_name
    FROM products p
    INNER JOIN categories c
      ON p.category_id = c.id
    WHERE p.status = 'active'
  `;

  const values: (string | number)[] = [];

  if (options?.bestSeller) {
    query += ` AND p.is_best_seller = 1`;
  }

  if (options?.categoryId) {
    query += ` AND p.category_id = ?`;
    values.push(options.categoryId);
  }

  query += ` ORDER BY p.created_at DESC`;

  if (options?.limit) {
    query += ` LIMIT ?`;
    values.push(options.limit);
  }

  const [rows] = await db.query(query, values);

  return (rows as Product[]).map((product) => ({
    ...product,
    sizes: JSON.parse(product.sizes as unknown as string),
    colors: JSON.parse(product.colors as unknown as string),
  }));
 
}

export async function createProduct(product: CreateProductDto) {
  const [result] = await db.query<ResultSetHeader>(
    `
      INSERT INTO products
      (
        product_code,
        title,
        slug,
        description,
        price,
        discount,
        stock,
        thumbnail,
        sizes,
        colors,
        status,
        is_best_seller,
        category_id
      )

      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
    `,
    [
      product.product_code,
      product.title,
      product.slug,
      product.description,
      product.price,
      product.discount,
      product.stock,
      product.thumbnail,
      JSON.stringify(product.sizes),
      JSON.stringify(product.colors),
      product.status,
      product.is_best_seller,
      product.category_id,
    ]
  );

  return result.insertId;
}

