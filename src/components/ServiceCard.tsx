"use client";
import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Service } from "@/types";
import type { ElementType } from "react";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon as ElementType;
  return (
    <motion.div whileHover={{ y: -8 }}>
      <Link href={`/services/${service.slug}`}>
        <Card sx={{ height: "100%", cursor: "pointer" }}>
          <CardContent>
            <Icon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={2}>
              {service.title}
            </Typography>
            <Typography color="text.secondary">
              {service.description}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
