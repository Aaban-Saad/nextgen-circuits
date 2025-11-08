// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // TODO: Add authentication checks here
//   // Example:
//   // const token = request.cookies.get("auth-token");
//   // if (!token && request.nextUrl.pathname.startsWith("/admin")) {
//   //   return NextResponse.redirect(new URL("/login", request.url));
//   // }
//   // if (!token && request.nextUrl.pathname.startsWith("/user")) {
//   //   return NextResponse.redirect(new URL("/login", request.url));
//   // }

//   return NextResponse.next();
// }

// export const config = {
//   // matcher: ["/admin/:path*", "/user/:path*"],
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };



import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for public auth routes
  if (pathname.startsWith("/login")) {
    return NextResponse.next()
  }

  const supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    },
  )

  // Refresh token
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect to auth if not logged in
  if (!user && pathname.startsWith("/user")) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // Redirect to dashboard if already logged in and trying to access auth
  if (user && pathname === "/login") {
    const url = request.nextUrl.clone()
    url.pathname = "/user"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
