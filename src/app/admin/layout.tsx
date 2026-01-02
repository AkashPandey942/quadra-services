"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext";

function AdminGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, logout } = useAdminAuth();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Prepare return URL including search params
        const urlParams = searchParams.toString();
        const fullPath = urlParams ? `${pathname}?${urlParams}` : pathname;

        // Allow login page access regardless of auth status
        if (pathname === "/admin/login") {
            return;
        }

        // Determine if strictly unauthenticated (fresh load/refresh)
        if (!isAuthenticated) {
            // Force logout server-side to ensure cookies don't persist locally cached access
            fetch("/api/auth/logout", { method: "POST" }).finally(() => {
                router.replace(`/admin/login?returnUrl=${encodeURIComponent(fullPath)}`);
            });
        }
    }, [isAuthenticated, pathname, router, searchParams]);

    // If on login page, render children (Login Form)
    // If authenticated, render children (Protected Admin Page)
    // If not authenticated (and not on login), render nothing (wait for redirect)
    if (pathname === "/admin/login" || isAuthenticated) {
        return <>{children}</>;
    }

    return null; // Render nothing while redirecting
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminAuthProvider>
            <AdminGuard>{children}</AdminGuard>
        </AdminAuthProvider>
    );
}
