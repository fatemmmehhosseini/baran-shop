import db from "@/lib/db";
import { CreateProductDto, GetProductsOptions, Product, SearchProduct } from "@/types/product.type";
import { ResultSetHeader } from "mysql2";

export async function getProducts(options?: GetProductsOptions) {
   
  let query = `
    SELECT
      p.*,
      c.name AS category_name,
      c.slug AS category_slug
    FROM products p
    INNER JOIN categories c
      ON p.category_id = c.id
    WHERE p.status = 'active'
  `;

  const values: (string | number)[] = [];

  const finalPriceExpr = `(p.price - (p.price * p.discount / 100))`;

  if (options?.bestSeller) {
    query += ` AND p.is_best_seller = 1`;
  }


  if (options?.categorySlug) {
  query += ` AND c.slug = ?`;
  values.push(options.categorySlug);
}

 if (options?.minPrice !== undefined) {
    query += ` AND ${finalPriceExpr} >= ?`;
    values.push(options.minPrice);
  }

  if (options?.maxPrice !== undefined) {
    query += ` AND ${finalPriceExpr} <= ?`;
    values.push(options.maxPrice);
  }


  switch (options?.sort) {
  case "bestSeller":
    query += ` ORDER BY p.is_best_seller DESC, p.created_at DESC`;
    break;

  case "price-asc":
    query += ` ORDER BY ${finalPriceExpr} ASC`;
    break;

  case "price-desc":
    query += ` ORDER BY ${finalPriceExpr} DESC`;
    break;

    case "discount":
    query += ` ORDER BY p.discount DESC`;
    break;

  default:
    query += ` ORDER BY p.created_at DESC`;
}

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

// export async function createProduct(product: CreateProductDto) {
//   const [result] = await db.query<ResultSetHeader>(
//     `
//       INSERT INTO products
//       (
//         product_code,
//         title,
//         slug,
//         description,
//         price,
//         discount,
//         stock,
//         thumbnail,
//         sizes,
//         colors,
//         status,
//         is_best_seller,
//         category_id
//       )

//       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
//     `,
//     [
//       product.product_code,
//       product.title,
//       product.slug,
//       product.description,
//       product.price,
//       product.discount,
//       product.stock,
//       product.thumbnail,
//       JSON.stringify(product.sizes),
//       JSON.stringify(product.colors),
//       product.status,
//       product.is_best_seller,
//       product.category_id,
//     ]
//   );

//   return result.insertId;
// }

export async function getProductBySlug(slug: string) {

  const [rows] = await db.query(
    `
      SELECT
        p.*,
        c.name AS category_name,
        c.slug AS category_slug
      FROM products p
      INNER JOIN categories c
        ON p.category_id = c.id
      WHERE p.slug = ?
      LIMIT 1
    `,
    [slug]
  );

  const product = (rows as Product[])[0];

  if (!product) {
    return null;
  }

  return {
    ...product,
    sizes: JSON.parse(product.sizes as unknown as string),
    colors: JSON.parse(product.colors as unknown as string),
  };
}


export async function searchProducts(
  query: string
): Promise<SearchProduct[]> {
  const keyword = query.trim();

  if (!keyword) {
    return [];
  }

  const search = `%${keyword}%`;

  const [rows] = await db.query<SearchProduct[]>(
    `
      SELECT
        p.id,
        p.title,
        p.slug,
        p.thumbnail,
        c.slug AS category_slug
       
      FROM products p

      INNER JOIN categories c
        ON c.id = p.category_id

      WHERE
            p.title LIKE ?
         OR p.slug LIKE ?
         OR c.name LIKE ?

      ORDER BY p.id DESC

      LIMIT 10
    `,
    [search, search, search]
  );

  return rows;
}