import db from "@/lib/db";
import { ResultSetHeader } from "mysql2";
import { CreateUserDto, User } from "@/types/user.type";




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