import { Container, Typography, Box } from "@mui/material";
import { services } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import type { Service } from "@/types";

export default function ServicesPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight="bold" mb={4}>
        Our Services
      </Typography>

      <Box component="section" sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
        {services.map((s: Service) => (
          <Box key={s.slug}>
            <ServiceCard service={s} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
