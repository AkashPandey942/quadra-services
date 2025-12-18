import { Container, Grid, Typography } from "@mui/material";
import { services } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import type { Service } from "@/types";

export default function ServicesPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight="bold" mb={4}>
        Our Services
      </Typography>

      <Grid container spacing={4}>
        {services.map((s: Service) => (
          <Grid item xs={12} sm={6} md={3} key={s.slug}>
            <ServiceCard service={s} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
