
import { create } from "zustand";
import { User } from "@/types/auth.type";
import { authService } from "@/services/auth.service";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  logout: () => {
    set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false });

  },

  checkAuth: async () => {
    
    const user = await authService.getMe();
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },
}));

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
 console.log("token:",token)
  const protectedRoutes = [
    "/profile",
    "/checkout",
    "/orders",
  ];

  const authRoutes = [
    "/login",
    "/register",
  ];

  const pathname = request.nextUrl.pathname;
  console.log("path:",pathname)
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  
  if (isProtected) {
    if (!token) {
      console.log("NOtoken:")
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      verifyToken(token);
      console.log("tokenOK")
    } catch(e) {
      console.log("tokenERROR",e)
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  
  if (isAuthRoute && token) {
    try {
      verifyToken(token);

      return NextResponse.redirect(new URL("/", request.url));
    } catch {
      
    }
  }

  return NextResponse.next();
}
export const congig = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/login/:path*",
    "/register/:path*",
  ],
};