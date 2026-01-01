"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    AppBar,
    Toolbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import {
    Add,
    Edit,
    Delete,
    Visibility,
    Logout,
    Article
} from "@mui/icons-material";
import Link from "next/link";

interface Blog {
    slug: string;
    title: string;
    category: string;
    status: string;
    createdAt: string;
    views: number;
}

export default function AdminBlogsPage() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialog, setDeleteDialog] = useState<string | null>(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch("/api/blogs");
            const data = await response.json();
            if (data.success) {
                setBlogs(data.blogs);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
    };

    const handleDelete = async (slug: string) => {
        try {
            const response = await fetch(`/api/blogs/${slug}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (data.success) {
                fetchBlogs();
                setDeleteDialog(null);
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const stats = {
        total: blogs.length,
        published: blogs.filter(b => b.status === "published").length,
        drafts: blogs.filter(b => b.status === "draft").length
    };

    return (
        <Box sx={{ bgcolor: "#020617", minHeight: "100vh" }}>
            {/* Header */}
            <AppBar position="static" sx={{ bgcolor: "rgba(30, 41, 59, 0.8)", backdropFilter: "blur(12px)" }}>
                <Toolbar>
                    <Article sx={{ mr: 2 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
                        Blog Management
                    </Typography>
                    <Button
                        color="inherit"
                        startIcon={<Logout />}
                        onClick={handleLogout}
                        sx={{ textTransform: "none" }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Stats */}
                <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                    <Paper sx={{ flex: 1, p: 3, bgcolor: "rgba(30, 41, 59, 0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "white" }}>{stats.total}</Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>Total Posts</Typography>
                    </Paper>
                    <Paper sx={{ flex: 1, p: 3, bgcolor: "rgba(30, 41, 59, 0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#22C55E" }}>{stats.published}</Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>Published</Typography>
                    </Paper>
                    <Paper sx={{ flex: 1, p: 3, bgcolor: "rgba(30, 41, 59, 0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "#F59E0B" }}>{stats.drafts}</Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>Drafts</Typography>
                    </Paper>
                </Box>

                {/* Actions */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "white" }}>
                        All Blog Posts
                    </Typography>
                    <Button
                        component={Link}
                        href="/admin/blogs/new"
                        variant="contained"
                        startIcon={<Add />}
                        sx={{ textTransform: "none", fontWeight: 600 }}
                    >
                        New Post
                    </Button>
                </Box>

                {/* Table */}
                <TableContainer
                    component={Paper}
                    sx={{
                        bgcolor: "rgba(30, 41, 59, 0.4)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.08)"
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "white", fontWeight: 700 }}>Title</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: 700 }}>Category</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: 700 }}>Status</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: 700 }}>Views</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: 700 }}>Date</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: 700 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {blogs.map((blog) => (
                                <TableRow key={blog.slug}>
                                    <TableCell sx={{ color: "white" }}>{blog.title}</TableCell>
                                    <TableCell sx={{ color: "rgba(255, 255, 255, 0.7)" }}>{blog.category}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={blog.status}
                                            size="small"
                                            sx={{
                                                bgcolor: blog.status === "published" ? "#22C55E22" : "#F59E0B22",
                                                color: blog.status === "published" ? "#22C55E" : "#F59E0B",
                                                border: `1px solid ${blog.status === "published" ? "#22C55E44" : "#F59E0B44"}`
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: "rgba(255, 255, 255, 0.7)" }}>{blog.views}</TableCell>
                                    <TableCell sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            component={Link}
                                            href={`/blogs/${blog.slug}`}
                                            target="_blank"
                                            size="small"
                                            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                                        >
                                            <Visibility fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            component={Link}
                                            href={`/admin/blogs/edit/${blog.slug}`}
                                            size="small"
                                            sx={{ color: "primary.main" }}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            sx={{ color: "#EF4444" }}
                                            onClick={() => setDeleteDialog(blog.slug)}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {blogs.length === 0 && !loading && (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                            No blog posts yet. Create your first post!
                        </Typography>
                    </Box>
                )}
            </Container>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!deleteDialog}
                onClose={() => setDeleteDialog(null)}
                PaperProps={{
                    sx: {
                        bgcolor: "#0f172a",
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                    }
                }}
            >
                <DialogTitle sx={{ color: "white" }}>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        Are you sure you want to delete this blog post? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(null)} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => deleteDialog && handleDelete(deleteDialog)}
                        variant="contained"
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
