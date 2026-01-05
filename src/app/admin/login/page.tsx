"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Container, Card, CardContent, TextField, Button, Typography, Alert } from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get("returnUrl") || "/admin/blogs";
    const { login } = useAdminAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                login(); // Set client-side auth state
                router.push(returnUrl);
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#020617",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 8
            }}
        >
            <Container maxWidth="sm">
                <Card
                    sx={{
                        bgcolor: "rgba(30, 41, 59, 0.4)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: 4
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ textAlign: "center", mb: 4 }}>
                            <LoginIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
                            <Typography variant="h4" sx={{ fontWeight: 700, color: "white", mb: 1 }}>
                                Admin Login
                            </Typography>
                            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                                Sign in to manage blog posts
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleLogin}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="off"
                                sx={{
                                    mb: 2,
                                    "& .MuiInputBase-root": { color: "white" },
                                    "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                sx={{
                                    mb: 3,
                                    "& .MuiInputBase-root": { color: "white" },
                                    "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    py: 1.5,
                                    fontWeight: 600,
                                    textTransform: "none"
                                }}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </form>

                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
