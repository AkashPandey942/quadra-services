import { Container, Typography, Card, CardContent, Box } from "@mui/material";



const founders = [
  { name: "Founder 1", role: "Web Developer" },
  { name: "Founder 2", role: "Mobile App Developer" },
  { name: "Founder 3", role: "UI/UX Designer" },
  { name: "Founder 4", role: "Digital Marketer" },
];

export default function AboutPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        About QuadraTech
      </Typography>

      <Typography color="text.secondary" mb={5}>
        QuadraTech is a digital agency founded by 4 experts delivering scalable
        digital solutions for startups and enterprises.
      </Typography>

      <Box
        component="section"
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(4, 1fr)" },
        }}
      >
        {founders.map((f) => (
          <Box key={f.name}>
            <Card>
              <CardContent>
                <Typography fontWeight="bold">{f.name}</Typography>
                <Typography color="text.secondary">{f.role}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
