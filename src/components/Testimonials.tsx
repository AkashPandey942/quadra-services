import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

export default function Testimonials() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        What Clients Say
      </Typography>

      <Grid container spacing={3}>
        {["Great service!", "Highly professional team"].map((t, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card>
              <CardContent>
                <Typography>&quot;{t}&quot;</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
