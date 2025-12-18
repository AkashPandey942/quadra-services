import { Container, Typography, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";



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

      <Grid container spacing={4}>
        {founders.map((f) => (
          <Grid size={{ xs: 12, md: 3 }} key={f.name}>
            <Card>
              <CardContent>
                <Typography fontWeight="bold">{f.name}</Typography>
                <Typography color="text.secondary">{f.role}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
