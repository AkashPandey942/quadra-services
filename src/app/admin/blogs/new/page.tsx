"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    AppBar,
    Toolbar,
    Paper,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Stack,
    IconButton,
    Card,
    CardMedia,
    CircularProgress
} from "@mui/material";
import { ArrowBack, Save, Visibility, CloudUpload, Image as ImageIcon } from "@mui/icons-material";
import Link from "next/link";

const CATEGORIES = ["Technology", "AI & Machine Learning", "Development", "Business", "Cloud Computing", "Data Science", "Cybersecurity"];

export default function NewBlogPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        author: "Admin",
        category: "Technology",
        tags: "",
        featuredImage: "",
        status: "draft"
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setFormData(prev => ({ ...prev, featuredImage: data.url }));
            } else {
                alert(data.message || 'Upload failed');
            }
        } catch (error) {
            alert('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (status: "draft" | "published") => {
        setLoading(true);
        try {
            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    status,
                    tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean)
                })
            });

            const data = await response.json();
            if (data.success) {
                router.push("/admin/blogs");
            } else {
                alert(data.message || "Error creating blog");
            }
        } catch (error) {
            alert("Error creating blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ bgcolor: "#020617", minHeight: "100vh" }}>
            {/* Header */}
            <AppBar position="static" sx={{ bgcolor: "rgba(30, 41, 59, 0.8)", backdropFilter: "blur(12px)" }}>
                <Toolbar>
                    <IconButton component={Link} href="/admin/blogs" sx={{ color: "white", mr: 2 }}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
                        Create New Blog Post
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<Save />}
                        onClick={() => handleSubmit("draft")}
                        disabled={loading}
                        sx={{ mr: 2, color: "white", borderColor: "rgba(255, 255, 255, 0.3)" }}
                    >
                        Save Draft
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Visibility />}
                        onClick={() => handleSubmit("published")}
                        disabled={loading}
                    >
                        Publish
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid container spacing={3}>
                    {/* Main Form */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper
                            sx={{
                                p: 4,
                                bgcolor: "rgba(30, 41, 59, 0.4)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(255, 255, 255, 0.08)"
                            }}
                        >
                            <Grid container spacing={3}>
                                {/* Title */}
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Blog Title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        sx={{
                                            "& .MuiInputBase-root": { color: "white", fontSize: "1.5rem", fontWeight: 700 },
                                            "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                                        }}
                                    />
                                </Grid>

                                {/* Excerpt */}
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Excerpt (Short Description)"
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        multiline
                                        rows={2}
                                        required
                                        sx={{
                                            "& .MuiInputBase-root": { color: "white" },
                                            "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                                        }}
                                    />
                                </Grid>

                                {/* Content */}
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Content (Markdown Supported)"
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        multiline
                                        rows={15}
                                        required
                                        placeholder="Write your blog content here. You can use markdown formatting..."
                                        sx={{
                                            "& .MuiInputBase-root": { color: "white", fontFamily: "monospace" },
                                            "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Sidebar */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={3}>
                            {/* Featured Image Upload */}
                            <Paper
                                sx={{
                                    p: 3,
                                    bgcolor: "rgba(30, 41, 59, 0.4)",
                                    backdropFilter: "blur(12px)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)"
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "white", mb: 2, fontWeight: 700 }}>
                                    Featured Image
                                </Typography>

                                {formData.featuredImage ? (
                                    <Card sx={{ mb: 2 }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={formData.featuredImage}
                                            alt="Featured"
                                        />
                                    </Card>
                                ) : (
                                    <Box
                                        sx={{
                                            height: 200,
                                            border: "2px dashed rgba(255, 255, 255, 0.2)",
                                            borderRadius: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mb: 2
                                        }}
                                    >
                                        <ImageIcon sx={{ fontSize: 60, color: "rgba(255, 255, 255, 0.3)" }} />
                                    </Box>
                                )}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    sx={{ color: "white", borderColor: "rgba(255, 255, 255, 0.3)", mb: 1 }}
                                >
                                    {uploading ? "Uploading..." : "Upload Image"}
                                </Button>

                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Or paste image URL"
                                    value={formData.featuredImage}
                                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                                    sx={{
                                        "& .MuiInputBase-root": { color: "white" },
                                        "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                                    }}
                                />
                            </Paper>

                            {/* Category and Author */}
                            <Paper
                                sx={{
                                    p: 3,
                                    bgcolor: "rgba(30, 41, 59, 0.4)",
                                    backdropFilter: "blur(12px)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)"
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "white", mb: 2, fontWeight: 700 }}>
                                    Post Details
                                </Typography>

                                <FormControl
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                        "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" },
                                        "& .MuiSelect-select": { color: "white" }
                                    }}
                                >
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        label="Category"
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    fullWidth
                                    label="Author Name"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    sx={{
                                        "& .MuiInputBase-root": { color: "white" },
                                        "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                                    }}
                                />
                            </Paper>

                            {/* Tags */}
                            <Paper
                                sx={{
                                    p: 3,
                                    bgcolor: "rgba(30, 41, 59, 0.4)",
                                    backdropFilter: "blur(12px)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)"
                                }}
                            >
                                <Typography variant="h6" sx={{ color: "white", mb: 2, fontWeight: 700 }}>
                                    Tags
                                </Typography>

                                <TextField
                                    fullWidth
                                    label="Tags (comma separated)"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="AI, Machine Learning, Python"
                                    sx={{
                                        mb: 2,
                                        "& .MuiInputBase-root": { color: "white" },
                                        "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                                    }}
                                />

                                {formData.tags && (
                                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                                        {formData.tags.split(",").map((tag, idx) => (
                                            <Chip
                                                key={idx}
                                                label={tag.trim()}
                                                size="small"
                                                sx={{
                                                    bgcolor: "rgba(255, 255, 255, 0.1)",
                                                    color: "white"
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                )}
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
