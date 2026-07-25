import db from "@/lib/db";
import { Category} from "@/types/category.type";
import { RowDataPacket } from "mysql2";


export async function getCategoryBySlug(slug: string) {
  const [rows] = await db.query<RowDataPacket[]>(
    `
      SELECT id, name, slug
      FROM categories
      WHERE slug = ?
      LIMIT 1
    `,
    [slug]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0] as Category;
}

export async function getCategories() {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT id, name, slug 
     FROM categories 
     ORDER BY name ASC`
  );
  return rows as Category[];
}