import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;


  const protectedRoutes = ["/profile", "/checkout", "/orders"];


  const authRoutes = ["/login", "/register"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );


  if (isProtected && !token) {
    
      return NextResponse.redirect(new URL("/login", request.url));

   
  }


  if (isAuthRoute && token) {
      return NextResponse.redirect(new URL("/", request.url));
    
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/checkout/:path*", "/orders/:path*", "/login", "/register"],
};