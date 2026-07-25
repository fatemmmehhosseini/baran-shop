
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type JwtPayload = {
  id: number;
  phone: string;
};

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}