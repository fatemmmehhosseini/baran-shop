import db from "@/lib/db";
import { ResultSetHeader } from "mysql2";
import { CreateUserDto, UpdateUserInput, User } from "@/types/user.type";




export async function findUserByEmail(email: string) {
  const [rows] = await db.query<User[]>(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  return rows[0] ?? null;
}



export async function findUserByPhone(phone: string) {
  const [rows] = await db.query<User[]>(
    "SELECT * FROM users WHERE phone = ? LIMIT 1",
    [phone]
  );

  return rows[0] ?? null;
}

export async function findUserById(id: number) {
  const [rows] = await db.query<User[]>(
    `
    SELECT *
    FROM users
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0] ?? null;
}


export async function createUser(data: CreateUserDto) {
  const [result] = await db.query<ResultSetHeader>(
    `
      INSERT INTO users
      (
        full_name,
        email,
        phone,
        password
      )
      VALUES (?, ?, ?, ?)
    `,
    [
      data.full_name,
      data.email ?? null,
      data.phone,
      data.password,
    ]
  );

  return result.insertId;
}



export async function getUserById(
  userId: number
): Promise<User | null> {
  const [rows] = await db.execute<User[]>(
    `
      SELECT
        id,
        full_name,
        phone,
        province,
        city,
        address,
        postal_code,
        is_active,
        created_at,
        updated_at
      FROM users
      WHERE id = ?
      LIMIT 1
    `,
    [userId]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}

export async function updateUser(
  userId: number,
  data: UpdateUserInput
): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    `
      UPDATE users
      SET
        full_name = ?,
        province = ?,
        city = ?,
        address = ?,
        postal_code = ?
      WHERE id = ?
    `,
    [
      data.full_name,
      data.province,
      data.city,
      data.address,
      data.postal_code,
      userId,
    ]
  );

  return result.affectedRows > 0;
}