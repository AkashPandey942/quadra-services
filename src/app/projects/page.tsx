import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

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

      <Grid container spacing={4}>
        {projects.map((p) => (
          <Grid size={{ xs: 12, md: 6 }} key={p.title}>
            <Card>
              <CardContent>
                <Typography fontWeight="bold">{p.title}</Typography>
                <Typography color="text.secondary">{p.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
