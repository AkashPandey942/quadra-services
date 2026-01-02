"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminAuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    // Default to FALSE on every mount (refresh/initial load)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        // Also call API to clear cookie
        fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
    };

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext);
    if (context === undefined) {
        throw new Error("useAdminAuth must be used within an AdminAuthProvider");
    }
    return context;
}
