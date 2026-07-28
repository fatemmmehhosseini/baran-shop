
import { LoginInput, RegisterInput, User } from "@/types/auth.type";


async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "خطایی رخ داده است" }));
    throw new Error(error.message || "عملیات ناموفق بود");
  }
  return response.json();
}

export const authService = {
  async login(data: LoginInput) {
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return handleResponse<{ message: string }>(res);
  },

  async register(data: RegisterInput) {
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return handleResponse<{ message: string }>(res);
  },

  async logout() {
    const res = await fetch(`/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("خروج ناموفق بود");
    return res.ok;
  },

  async getMe() {
    try {
      const res = await fetch(`/api/auth/me`, {
        method: "GET",
        credentials: "include",
        cache: "no-store"
      });
      
      if (!res.ok) return null;
      
      const data = await res.json();
      return data.user as User;
    } catch {
      return null;
    }
  },
};