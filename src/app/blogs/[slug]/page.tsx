import { blogs } from "@/data/blogs";
import { Container, Typography } from "@mui/material";
import type { Blog } from "@/types";

export default async function BlogDetail({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = (await params) as { slug: string };
  const blog: Blog | undefined = blogs.find((b) => b.slug === resolvedParams.slug);
  if (!blog) return null;

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight="bold">
        {blog.title}
      </Typography>
      <Typography mt={3}>{blog.content}</Typography>
    </Container>
  );
}
