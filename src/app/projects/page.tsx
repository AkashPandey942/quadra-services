import { Container, Typography, Box, Card, CardContent } from "@mui/material";

const projects = [
  { title: "E-Commerce Platform", desc: "Next.js + Payments" },
  { title: "Corporate Website", desc: "SEO Optimized Website" },
];

export default function ProjectsPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight="bold" mb={4}>
        Our Projects
      </Typography>

      <Box component="section" sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
        {projects.map((p) => (
          <Box key={p.title}>
            <Card>
              <CardContent>
                <Typography fontWeight="bold">{p.title}</Typography>
                <Typography color="text.secondary">{p.desc}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
