

export interface LoginInput {
  phone: string;
  password: string;
}

export interface RegisterInput {
  full_name: string;
  phone: string;
  password: string;
}

export interface User {
  id: number;
  full_name: string;
  phone: string;
  email?: string | null;
  province?: string | null;
  city?: string | null;
  avatar?: string | null;
}

export interface AuthResponse {
  message: string;
  
}