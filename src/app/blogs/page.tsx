"use client";

import { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Chip, Avatar, Stack, TextField, InputAdornment } from "@mui/material";
import { Search, CalendarToday, Visibility } from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useBackground } from "@/context/BackgroundContext";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MotionCard = motion(Card);

interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  createdAt: string;
  views: number;
}

export default function BlogsPage() {
  const { currentTheme } = useBackground();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [searchQuery, selectedCategory, blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs?status=published", { cache: "no-store" });
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
        setFilteredBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const filterBlogs = () => {
    let filtered = blogs;

    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    setFilteredBlogs(filtered);
  };

  const categories = Array.from(new Set(blogs.map(b => b.category)));

  return (
    <Box sx={{ bgcolor: "#020617", minHeight: "100vh", pt: { xs: 12, md: 15 }, pb: 8 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 2,
              fontSize: { xs: "2.5rem", md: "4rem" },
              background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Our Blog
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.7)", maxWidth: "700px", mx: "auto", mb: 4 }}>
            Insights, tutorials, and updates from our team
          </Typography>

          {/* Search */}
          <TextField
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              maxWidth: 500,
              "& .MuiInputBase-root": { bgcolor: "rgba(255, 255, 255, 0.05)", color: "white", borderRadius: 3 },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.1)" }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "rgba(255, 255, 255, 0.5)" }} />
                </InputAdornment>
              )
            }}
          />
        </Box>

        {/* Categories */}
        {categories.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
            <Chip
              label="All"
              onClick={() => setSelectedCategory(null)}
              sx={{
                bgcolor: !selectedCategory ? currentTheme.primary : "rgba(255, 255, 255, 0.05)",
                color: "white",
                fontWeight: 600,
                "&:hover": { bgcolor: currentTheme.primary }
              }}
            />
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  bgcolor: selectedCategory === cat ? currentTheme.primary : "rgba(255, 255, 255, 0.05)",
                  color: "white",
                  fontWeight: 600,
                  "&:hover": { bgcolor: currentTheme.primary }
                }}
              />
            ))}
          </Stack>
        )}

        {/* Blog Grid */}
        <Grid container spacing={3}>
          {filteredBlogs.map((blog, index) => (
            <Grid key={blog.slug} size={{ xs: 12, sm: 6, md: 4 }}>
              <Link href={`/blogs/${blog.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  sx={{
                    height: "100%",
                    bgcolor: "rgba(30, 41, 59, 0.4)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 4,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      borderColor: currentTheme.primary,
                      boxShadow: `0 20px 40px -10px ${currentTheme.primary}33`
                    }
                  }}
                >
                  {blog.featuredImage && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={blog.featuredImage}
                      alt={blog.title}
                      sx={{ objectFit: "cover" }}
                    />
                  )}

                  <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Chip
                      label={blog.category}
                      size="small"
                      sx={{
                        bgcolor: `${currentTheme.primary}22`,
                        color: currentTheme.primary,
                        border: `1px solid ${currentTheme.primary}44`,
                        fontWeight: 600,
                        mb: 2,
                        width: "fit-content"
                      }}
                    />

                    <Typography variant="h5" sx={{ fontWeight: 700, color: "white", mb: 1.5, lineHeight: 1.3 }}>
                      {blog.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 2, flexGrow: 1, lineHeight: 1.7 }}>
                      {blog.excerpt}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: "auto", pt: 2, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: currentTheme.primary, fontSize: "0.9rem" }}>
                          {blog.author[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="caption" sx={{ color: "white", fontWeight: 600, display: "block" }}>
                            {blog.author}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", display: "flex", alignItems: "center", gap: 0.5 }}>
                            <CalendarToday sx={{ fontSize: 12 }} />
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "rgba(255, 255, 255, 0.5)" }}>
                        <Visibility sx={{ fontSize: 16 }} />
                        <Typography variant="caption">{blog.views}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Link>
            </Grid>
          ))}
        </Grid>

        {filteredBlogs.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
              No blogs found
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
