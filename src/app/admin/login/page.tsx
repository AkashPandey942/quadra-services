"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Card, CardContent, TextField, Button, Typography, Alert } from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";

export default function AdminLoginPage() {
    const router = useRouter();
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
                router.push("/admin/blogs");
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

                        <Box sx={{ mt: 3, p: 2, bgcolor: "rgba(255, 255, 255, 0.05)", borderRadius: 2 }}>
                            <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", display: "block" }}>
                                Default Credentials:
                            </Typography>
                            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", mt: 0.5 }}>
                                Email: admin@quadraservices.com
                            </Typography>
                            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                                Password: admin123
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
