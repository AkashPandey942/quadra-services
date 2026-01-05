"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search, CalendarToday, Visibility } from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useBackground } from "@/context/BackgroundContext";

export const dynamic = "force-dynamic";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  /* ---------------- FETCH BLOGS (ONLY SIDE EFFECT) ---------------- */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs?status=published", {
          cache: "no-store",
        });
        const data = await response.json();

        if (data.success) {
          setBlogs(data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  /* ---------------- DERIVED DATA (NO useEffect) ---------------- */

  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(q) ||
          blog.excerpt.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (blog) => blog.category === selectedCategory
      );
    }

    return filtered;
  }, [blogs, searchQuery, selectedCategory]);

  const categories = useMemo(
    () => Array.from(new Set(blogs.map((b) => b.category))),
    [blogs]
  );

  /* ---------------- UI ---------------- */

  return (
    <Box sx={{ bgcolor: "#020617", minHeight: "100vh", pt: { xs: 12, md: 15 }, pb: 8 }}>
      <Container maxWidth="xl">

        {/* HEADER */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 2,
              fontSize: { xs: "2.5rem", md: "4rem" },
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Blog
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.7)",
              maxWidth: 700,
              mx: "auto",
              mb: 4,
            }}
          >
            Insights, tutorials, and updates from our team
          </Typography>

          {/* SEARCH */}
          <TextField
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              maxWidth: 500,
              "& .MuiInputBase-root": {
                bgcolor: "rgba(255,255,255,0.05)",
                color: "white",
                borderRadius: 3,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.1)",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "rgba(255,255,255,0.5)" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* CATEGORIES */}
        {categories.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 4, flexWrap: "wrap", gap: 1, justifyContent: "center" }}
          >
            <Chip
              label="All"
              onClick={() => setSelectedCategory(null)}
              sx={{
                bgcolor: !selectedCategory
                  ? currentTheme.primary
                  : "rgba(255,255,255,0.05)",
                color: "white",
                fontWeight: 600,
              }}
            />
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  bgcolor:
                    selectedCategory === cat
                      ? currentTheme.primary
                      : "rgba(255,255,255,0.05)",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>
        )}

        {/* BLOG GRID */}
        <Grid container spacing={3}>
          {filteredBlogs.map((blog, index) => (
            <Grid key={blog.slug} size={{ xs: 12, sm: 6, md: 4 }}>
              <Link href={`/blogs/${blog.slug}`} style={{ textDecoration: "none" }}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  sx={{
                    height: "100%",
                    bgcolor: "rgba(30,41,59,0.4)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 4,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      borderColor: currentTheme.primary,
                      boxShadow: `0 20px 40px -10px ${currentTheme.primary}33`,
                    },
                  }}
                >
                  {blog.featuredImage && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={blog.featuredImage}
                      alt={blog.title}
                    />
                  )}

                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Chip
                      label={blog.category}
                      size="small"
                      sx={{
                        mb: 2,
                        bgcolor: `${currentTheme.primary}22`,
                        color: currentTheme.primary,
                        fontWeight: 600,
                      }}
                    />

                    <Typography variant="h5" sx={{ color: "white", fontWeight: 700, mb: 1 }}>
                      {blog.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.6)", mb: 2 }}
                    >
                      {blog.excerpt}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: "auto" }}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Avatar sx={{ bgcolor: currentTheme.primary, width: 32, height: 32 }}>
                          {blog.author[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="caption" sx={{ color: "white" }}>
                            {blog.author}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "rgba(255,255,255,0.5)", display: "flex", gap: 0.5 }}
                          >
                            <CalendarToday sx={{ fontSize: 12 }} />
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Visibility sx={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }} />
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
                          {blog.views}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* EMPTY STATE */}
        {filteredBlogs.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
              No blogs found
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
