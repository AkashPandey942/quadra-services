import { services } from "@/data/services";
import { Container, Typography } from "@mui/material";
import type { Service } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ServiceDetail({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = (await params) as { slug: string };
  const service: Service | undefined = services.find((s) => s.slug === resolvedParams.slug);
  if (!service) return null;

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" fontWeight="bold">
        {service.title}
      </Typography>
      <Typography mt={3}>{service.description}</Typography>
    </Container>
  );
}
