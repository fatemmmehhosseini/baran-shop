import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

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

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  
  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      verifyToken(token);
    } catch {
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