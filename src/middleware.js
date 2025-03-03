import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("adminToken")?.value || "";

    if (token === "") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      if (token) {
        return NextResponse.next();
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
