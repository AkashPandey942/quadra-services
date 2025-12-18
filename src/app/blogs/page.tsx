import { Container, Typography, Card, CardContent } from "@mui/material";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import type { Blog } from "@/types";

export default function BlogsPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight="bold" mb={4}>
        Blogs
      </Typography>

      {blogs.map((b: Blog) => (
        <Card key={b.slug} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">{b.title}</Typography>
            <Typography color="text.secondary">{b.excerpt}</Typography>
            <Link href={`/blogs/${b.slug}`}>Read More</Link>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
