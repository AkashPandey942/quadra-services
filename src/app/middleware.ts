import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const admin = req.cookies.get("admin");

  if (req.nextUrl.pathname.startsWith("/admin") && !admin) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}
