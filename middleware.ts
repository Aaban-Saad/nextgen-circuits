import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // TODO: Add authentication checks here
  // Example:
  // const token = request.cookies.get("auth-token");
  // if (!token && request.nextUrl.pathname.startsWith("/admin")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // if (!token && request.nextUrl.pathname.startsWith("/user")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
