import db from "@/lib/db";
import { products } from "@/data/products";

async function seed() {
  try {
    // console.log("شروع وارد کردن محصولات...");

    for (const product of products) {
      await db.query(
        `
        INSERT INTO products (
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    }

    // console.log("✅ همه محصولات وارد شدند.");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();