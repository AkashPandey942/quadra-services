// src/lib/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cookies } from "next/headers";

/**
 * Helper that returns an object indicating whether the request is from an
 * authenticated admin (or any logged‑in user if you don’t have roles).
 */
export async function requireAuth() {
  // First check NextAuth session
  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    // If you store a role on the user document you can enforce admin here:
    // if ((session.user as any).role !== "admin") {
    //   return { authorized: false, message: "Forbidden" } as const;
    // }
    return { authorized: true, session } as const;
  }

  // Fallback: check for admin_token cookie (for admin panel auth)
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token");
  if (adminToken?.value) {
    return { authorized: true, session: null } as const;
  }

  return { authorized: false, message: "Unauthorized" } as const;
}
