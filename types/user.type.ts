import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  full_name: string;
  email: string | null;
  phone: string;
  password: string;
  province: string | null;
  city: string | null;
  address: string | null;
  postal_code: string | null;
  is_active: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserDto {
  full_name: string;
  email?: string | null;
  phone: string;
  password: string;
}

export interface UpdateUserInput {
  full_name: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
}