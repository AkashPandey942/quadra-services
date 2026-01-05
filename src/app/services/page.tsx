"use client";

import { Container, Typography, Box, Grid, Card, CardContent, Chip, Stack } from "@mui/material";
import { motion } from "framer-motion";
import {
  AutoAwesome,
  Code,
  Description,
  IntegrationInstructions,
  Devices,
  TrendingUp,
  Speed,
  AttachMoney,
  CheckCircle,
  ErrorOutline,
  LightbulbOutlined
} from "@mui/icons-material";
import CTA from "@/components/CTA";
import { useBackground } from "@/context/BackgroundContext";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const services = [
  {
    id: 1,
    title: "AI Automation & Intelligent Systems",
    icon: AutoAwesome,
    problem: "Manual, repetitive tasks drain productivity and increase operational costs. Teams spend hours on data entry, document processing, and routine decision-making.",
    solution: "We build custom AI-powered automation systems that handle repetitive workflows, intelligent data processing, and predictive analytics. Our solutions integrate seamlessly with your existing infrastructure.",
    benefit: "Reduce operational costs by up to 60%, free your team to focus on strategic work, and make faster, data-driven decisions with real-time insights.",
    tags: ["Machine Learning", "Process Automation", "Predictive Analytics", "NLP"]
  },
  {
    id: 2,
    title: "Custom SaaS & Backend Development",
    icon: Code,
    problem: "Off-the-shelf software doesn't fit your unique business processes. You need scalable, secure backend systems that grow with your business.",
    solution: "We architect and develop custom SaaS platforms and robust backend systems tailored to your exact requirements. Cloud-native, microservices-based, and built for scale.",
    benefit: "Get a competitive edge with software that matches your workflow perfectly. Scale effortlessly as you grow, with 99.9% uptime and enterprise-grade security.",
    tags: ["Cloud Architecture", "Microservices", "API Development", "Database Design"]
  },
  {
    id: 3,
    title: "OCR & Document Intelligence",
    icon: Description,
    problem: "Processing invoices, contracts, and documents manually is slow, error-prone, and expensive. Critical data is locked in unstructured formats.",
    solution: "Our AI-powered OCR and document intelligence solutions extract, classify, and validate data from any document type with 98%+ accuracy. Automated workflows handle everything from extraction to integration.",
    benefit: "Process documents 10x faster, eliminate manual data entry errors, and unlock valuable insights from your document archives with intelligent search and analytics.",
    tags: ["OCR", "Document AI", "Data Extraction", "Workflow Automation"]
  },
  {
    id: 4,
    title: "ERP / Odoo AI Integrations",
    icon: IntegrationInstructions,
    problem: "Your ERP system has data silos and lacks intelligent automation. Manual processes in inventory, sales, and operations slow down your business.",
    solution: "We enhance your Odoo/ERP with AI-driven modules for demand forecasting, intelligent inventory management, automated reporting, and smart workflows that learn from your data.",
    benefit: "Optimize inventory levels, predict demand accurately, automate routine ERP tasks, and get actionable insights that drive better business decisions.",
    tags: ["Odoo Customization", "ERP Integration", "AI Forecasting", "Smart Workflows"]
  },
  {
    id: 5,
    title: "Web & Mobile Apps (Supporting AI Systems)",
    icon: Devices,
    problem: "Your AI systems need intuitive interfaces. Users struggle with complex dashboards and lack mobile access to critical AI-powered insights.",
    solution: "We build beautiful, responsive web and mobile applications that make your AI systems accessible and easy to use. Real-time dashboards, mobile-first design, and seamless user experiences.",
    benefit: "Empower your team with anywhere access to AI insights. Increase adoption rates with intuitive interfaces and drive better outcomes with real-time, mobile-accessible data.",
    tags: ["React/Next.js", "React Native", "Progressive Web Apps", "Real-time Dashboards"]
  }
];

export default function ServicesPage() {
  const { currentTheme } = useBackground();

  return (
    <Box sx={{ bgcolor: "#020617", minHeight: "100vh", pt: { xs: 12, md: 15 }, pb: 8 }}>
      {/* Hero Section */}
      <Container maxWidth="xl">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center", mb: { xs: 6, md: 8 }, position: "relative" }}
        >
          {/* Background Glow */}
          <Box
            sx={{
              position: "absolute",
              top: "-50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "70%",
              height: "200%",
              background: `radial-gradient(circle, ${currentTheme.primary}22 0%, transparent 70%)`,
              filter: "blur(120px)",
              zIndex: 0,
              pointerEvents: "none"
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 3,
              fontSize: { xs: "2.5rem", md: "4.5rem" },
              background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
              zIndex: 1
            }}
          >
            AI-Driven Services
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "1000px",
              mx: "auto",
              lineHeight: 1.8,
              fontSize: { xs: "1.1rem", md: "1.4rem" },
              position: "relative",
              zIndex: 1,
              mb: 4
            }}
          >
            Transform your business with intelligent automation and custom technology solutions
          </Typography>

          {/* Stats */}
          <Grid container spacing={3} sx={{ maxWidth: "900px", mx: "auto", position: "relative", zIndex: 1 }}>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 900, color: currentTheme.primary, mb: 0.5 }}>
                  60%
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                  Cost Reduction
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 900, color: currentTheme.secondary, mb: 0.5 }}>
                  10x
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                  Faster Processing
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 900, color: currentTheme.primary, mb: 0.5 }}>
                  98%
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                  Accuracy Rate
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 900, color: currentTheme.secondary, mb: 0.5 }}>
                  24/7
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                  Automation
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </MotionBox>

        {/* AI-Driven Services Intro */}
        <MotionCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{
            bgcolor: "rgba(30, 41, 59, 0.4)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 6,
            p: { xs: 3, md: 6 },
            mb: { xs: 8, md: 12 },
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "40%",
              height: "100%",
              background: `linear-gradient(135deg, ${currentTheme.primary}11 0%, transparent 100%)`,
              pointerEvents: "none"
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              mb: 3,
              color: "white",
              position: "relative",
              zIndex: 1,
              fontSize: { xs: "1.8rem", md: "2.5rem" }
            }}
          >
            Why Choose <span style={{ color: currentTheme.primary }}>AI-Powered Solutions?</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              lineHeight: 1.8,
              fontSize: { xs: "1rem", md: "1.15rem" },
              mb: 3,
              position: "relative",
              zIndex: 1
            }}
          >
            In today&apos;s competitive landscape, businesses need more than just software—they need intelligent systems that learn, adapt, and optimize. Our AI-driven approach combines cutting-edge technology with deep business understanding to deliver solutions that don&apos;t just automate tasks, but transform how you operate.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              lineHeight: 1.8,
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              position: "relative",
              zIndex: 1
            }}
          >
            From intelligent document processing to predictive analytics, our services are designed to give you a competitive edge, reduce costs, and unlock new opportunities for growth.
          </Typography>
        </MotionCard>

        {/* Service Cards */}
        {services.map((service, index) => (
          <Box key={service.id}>
            <MotionCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{
                bgcolor: "rgba(30, 41, 59, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 6,
                p: { xs: 3, md: 5 },
                mb: { xs: 6, md: 8 },
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: currentTheme.primary,
                  transform: "translateY(-10px) scale(1.02)",
                  boxShadow: `0 20px 40px -10px ${currentTheme.primary}33`,
                  bgcolor: "rgba(30, 41, 59, 0.6)",
                  "& .service-icon": {
                    bgcolor: currentTheme.primary,
                    color: "white",
                    transform: "rotate(360deg) scale(1.1)"
                  }
                }
              }}
            >
              {/* Background Pattern */}
              <Box
                sx={{
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${currentTheme.primary}22 0%, transparent 70%)`,
                  filter: "blur(60px)",
                  pointerEvents: "none"
                }}
              />

              {/* Icon and Title */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 3, position: "relative", zIndex: 1, flexWrap: "wrap", gap: 2 }}>
                <Box
                  sx={{
                    width: { xs: 60, md: 80 },
                    height: { xs: 60, md: 80 },
                    borderRadius: 4,
                    bgcolor: `${currentTheme.primary}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `2px solid ${currentTheme.primary}44`,
                    color: currentTheme.primary,
                    flexShrink: 0,
                    transition: "all 0.6s ease"
                  }}
                  className="service-icon"
                >
                  <service.icon sx={{ fontSize: { xs: 35, md: 45 } }} />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: "white",
                    fontSize: { xs: "1.5rem", md: "2.2rem" },
                    flex: 1,
                    minWidth: { xs: "100%", sm: "auto" }
                  }}
                >
                  {service.title}
                </Typography>
              </Box>

              {/* Tags */}
              <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: "wrap", gap: 1, position: "relative", zIndex: 1 }}>
                {service.tags.map((tag, idx) => (
                  <Chip
                    key={idx}
                    label={tag}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      color: currentTheme.primary,
                      border: `1px solid ${currentTheme.primary}44`,
                      fontWeight: 600,
                      fontSize: "0.75rem"
                    }}
                  />
                ))}
              </Stack>

              {/* Problem, Solution, Benefit */}
              <Grid container spacing={3} sx={{ position: "relative", zIndex: 1 }}>
                {/* Problem */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      bgcolor: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      height: "100%"
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <ErrorOutline sx={{ color: "#EF4444", mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#EF4444" }}>
                        The Problem
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.7 }}>
                      {service.problem}
                    </Typography>
                  </Box>
                </Grid>

                {/* Solution */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      bgcolor: `${currentTheme.primary}11`,
                      border: `1px solid ${currentTheme.primary}33`,
                      height: "100%"
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <LightbulbOutlined sx={{ color: currentTheme.primary, mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: currentTheme.primary }}>
                        Our Solution
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.7 }}>
                      {service.solution}
                    </Typography>
                  </Box>
                </Grid>

                {/* Benefit */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      bgcolor: "rgba(34, 197, 94, 0.1)",
                      border: "1px solid rgba(34, 197, 94, 0.3)",
                      height: "100%"
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <TrendingUp sx={{ color: "#22C55E", mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#22C55E" }}>
                        Business Benefit
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.7 }}>
                      {service.benefit}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </MotionCard>

            {/* CTA after every 2 services */}
            {(index + 1) % 2 === 0 && index !== services.length - 1 && (
              <Box sx={{ mb: { xs: 6, md: 8 } }}>
                <CTA />
              </Box>
            )}
          </Box>
        ))}

        {/* Additional Content - Why Work With Us */}
        <MotionCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{
            bgcolor: "rgba(30, 41, 59, 0.4)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 6,
            p: { xs: 3, md: 6 },
            mb: { xs: 8, md: 12 }
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              mb: 4,
              color: "white",
              textAlign: "center",
              fontSize: { xs: "1.8rem", md: "2.5rem" }
            }}
          >
            Why Work <span style={{ color: currentTheme.primary }}>With Us?</span>
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: "center" }}>
                <Speed sx={{ fontSize: 50, color: currentTheme.primary, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: "white", mb: 1 }}>
                  Rapid Deployment
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.7 }}>
                  Get your AI solutions up and running in weeks, not months. We use agile methodologies to deliver value quickly.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: "center" }}>
                <AttachMoney sx={{ fontSize: 50, color: currentTheme.primary, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: "white", mb: 1 }}>
                  Proven ROI
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.7 }}>
                  Our clients see measurable results within 3-6 months. We focus on solutions that deliver real business value.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: "center" }}>
                <CheckCircle sx={{ fontSize: 50, color: currentTheme.primary, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: "white", mb: 1 }}>
                  End-to-End Support
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.7 }}>
                  From initial consultation to post-deployment support, we&apos;re with you every step of the way.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </MotionCard>
      </Container>

      {/* Final CTA */}
      <CTA />
    </Box>
  );
}
