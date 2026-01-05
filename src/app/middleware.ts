import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const adminToken = req.cookies.get("admin_token");

  if (req.nextUrl.pathname.startsWith("/admin") && !adminToken) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}
