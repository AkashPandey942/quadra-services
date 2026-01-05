"use client";

import { Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { Business, Visibility, Group, CheckCircle, Rocket, TrendingUp, EmojiObjects, Handshake } from "@mui/icons-material";
import { motion } from "framer-motion";
import CTA from "@/components/CTA";
import { useBackground } from "@/context/BackgroundContext";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function AboutPage() {
  const { currentTheme } = useBackground();

  const values = [
    {
      icon: Business,
      title: "Business-First AI",
      description: "We prioritize practical, business-oriented AI solutions that deliver measurable results and drive real value for our clients."
    },
    {
      icon: Visibility,
      title: "Transparency",
      description: "We believe in open communication and clear processes, ensuring our clients understand how our AI solutions work and the impact they create."
    },
    {
      icon: Group,
      title: "Scalable Solutions",
      description: "Our AI platforms are designed to grow with your business, adapting to changing needs and scaling seamlessly as you expand."
    },
    {
      icon: CheckCircle,
      title: "Long-Term Partnerships",
      description: "We build lasting relationships with our clients, providing ongoing support and evolving our solutions to meet their long-term goals."
    }
  ];

  return (
    <Box sx={{ bgcolor: "#020617", minHeight: "100vh", pt: { xs: 12, md: 15 }, pb: 8 }}>
      {/* Hero Section */}
      <Container maxWidth="xl">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center", mb: { xs: 8, md: 12 }, position: "relative" }}
        >
          {/* Background Glow */}
          <Box
            sx={{
              position: "absolute",
              top: "-50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60%",
              height: "200%",
              background: `radial-gradient(circle, ${currentTheme.primary}22 0%, transparent 70%)`,
              filter: "blur(100px)",
              zIndex: 0,
              pointerEvents: "none"
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 3,
              fontSize: { xs: "2.5rem", md: "4rem" },
              background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
              zIndex: 1
            }}
          >
            About Apex Nexon
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "900px",
              mx: "auto",
              lineHeight: 1.8,
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              position: "relative",
              zIndex: 1
            }}
          >
            Empowering businesses with cutting-edge technology solutions to achieve operational excellence and sustainable growth.
          </Typography>
        </MotionBox>

        {/* Mission & Vision Section - Side by Side */}
        <Grid container spacing={4} sx={{ mb: { xs: 8, md: 12 } }}>
          {/* Mission */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionCard
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{
                height: "100%",
                bgcolor: "rgba(30, 41, 59, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 6,
                p: { xs: 3, md: 5 },
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s ease",
                "&:hover": {
                  borderColor: currentTheme.primary,
                  transform: "translateY(-10px) scale(1.02)",
                  boxShadow: `0 20px 40px -10px ${currentTheme.primary}33`,
                  bgcolor: "rgba(30, 41, 59, 0.6)",
                  "& .mission-icon": {
                    bgcolor: currentTheme.primary,
                    color: "white",
                    transform: "rotate(360deg) scale(1.1)"
                  }
                }
              }}
            >
              {/* Icon Background */}
              <Box
                sx={{
                  position: "absolute",
                  top: -30,
                  right: -30,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${currentTheme.primary}22 0%, transparent 70%)`,
                  filter: "blur(40px)"
                }}
              />

              <Box sx={{ display: "flex", alignItems: "center", mb: 3, position: "relative", zIndex: 1 }}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 4,
                    bgcolor: `${currentTheme.primary}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                    border: `2px solid ${currentTheme.primary}44`,
                    color: currentTheme.primary,
                    transition: "all 0.6s ease"
                  }}
                  className="mission-icon"
                >
                  <Rocket sx={{ fontSize: 35 }} />
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "white", fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
                  Our Mission
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1.8,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  mb: 2,
                  position: "relative",
                  zIndex: 1
                }}
              >
                At Apex Nexon, our mission is to harness the power of cutting-edge technology to drive operational efficiency across industries. We believe that by integrating intelligent systems into everyday business processes, we can help companies reduce costs, optimize workflows, and unlock new opportunities for innovation and growth.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.8,
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  position: "relative",
                  zIndex: 1
                }}
              >
                We are committed to delivering solutions that are not only cutting-edge but also practical, scalable, and aligned with real-world business needs.
              </Typography>
            </MotionCard>
          </Grid>

          {/* Vision */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionCard
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{
                height: "100%",
                bgcolor: "rgba(30, 41, 59, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 6,
                p: { xs: 3, md: 5 },
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s ease",
                "&:hover": {
                  borderColor: currentTheme.secondary,
                  transform: "translateY(-10px) scale(1.02)",
                  boxShadow: `0 20px 40px -10px ${currentTheme.secondary}33`,
                  bgcolor: "rgba(30, 41, 59, 0.6)",
                  "& .vision-icon": {
                    bgcolor: currentTheme.secondary,
                    color: "white",
                    transform: "rotate(360deg) scale(1.1)"
                  }
                }
              }}
            >
              {/* Icon Background */}
              <Box
                sx={{
                  position: "absolute",
                  top: -30,
                  right: -30,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${currentTheme.secondary}22 0%, transparent 70%)`,
                  filter: "blur(40px)"
                }}
              />

              <Box sx={{ display: "flex", alignItems: "center", mb: 3, position: "relative", zIndex: 1 }}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 4,
                    bgcolor: `${currentTheme.secondary}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                    border: `2px solid ${currentTheme.secondary}44`,
                    color: currentTheme.secondary,
                    transition: "all 0.6s ease"
                  }}
                  className="vision-icon"
                >
                  <EmojiObjects sx={{ fontSize: 35 }} />
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "white", fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
                  Our Vision
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1.8,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  mb: 2,
                  position: "relative",
                  zIndex: 1
                }}
              >
                We envision a future where intelligent systems seamlessly integrate with modern businesses, enabling them to operate more efficiently, make data-driven decisions, and stay ahead in an increasingly competitive landscape.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.8,
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  position: "relative",
                  zIndex: 1
                }}
              >
                By building robust, adaptable platforms, we aim to empower organizations of all sizes to leverage technology for long-term success and innovation.
              </Typography>
            </MotionCard>
          </Grid>
        </Grid>

        {/* Values Section */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ mb: { xs: 8, md: 12 } }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 6,
              textAlign: "center",
              color: "white",
              fontSize: { xs: "2rem", md: "3rem" }
            }}
          >
            Our <span style={{ color: currentTheme.primary }}>Core Values</span>
          </Typography>

          <Grid container spacing={3}>
            {values.map((value, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <MotionCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  sx={{
                    height: "100%",
                    bgcolor: "rgba(30, 41, 59, 0.4)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 4,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px) scale(1.02)",
                      borderColor: currentTheme.primary,
                      bgcolor: "rgba(30, 41, 59, 0.6)",
                      boxShadow: `0 15px 30px -10px ${currentTheme.primary}33`,
                      "& .value-icon": {
                        bgcolor: currentTheme.primary,
                        color: "white",
                        transform: "rotate(360deg) scale(1.1)"
                      }
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      className="value-icon"
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 3,
                        bgcolor: "rgba(255, 255, 255, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        color: currentTheme.primary,
                        transition: "all 0.5s ease",
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                      }}
                    >
                      <value.icon sx={{ fontSize: 30 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "white", mb: 1.5 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.7 }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </MotionBox>

        {/* Additional Sections in Cards */}
        <Grid container spacing={4} sx={{ mb: { xs: 8, md: 12 } }}>
          {/* Remote-First */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{
                height: "100%",
                bgcolor: "rgba(30, 41, 59, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 6,
                p: { xs: 3, md: 4 },
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: currentTheme.primary,
                  transform: "translateY(-5px)"
                }
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUp sx={{ fontSize: 40, color: currentTheme.primary, mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 800, color: "white" }}>
                  Remote-First Company
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8, mb: 2 }}>
                Apex Nexon operates as a fully remote-first organization, embracing the flexibility and diversity that remote work brings. This approach allows us to attract top talent from around the world and maintain a healthy work-life balance for our team.
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.8 }}>
                Our remote-first model enables us to deliver consistent, high-quality solutions while fostering an inclusive and collaborative environment that values individual contributions and collective success.
              </Typography>
            </MotionCard>
          </Grid>

          {/* Founder-Led */}
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              sx={{
                height: "100%",
                bgcolor: "rgba(30, 41, 59, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 6,
                p: { xs: 3, md: 4 },
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: currentTheme.secondary,
                  transform: "translateY(-5px)"
                }
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Handshake sx={{ fontSize: 40, color: currentTheme.secondary, mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 800, color: "white" }}>
                  Founder-Led & Expert-Driven
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8, mb: 2 }}>
                Founded and led by industry experts with deep experience in technology, software development, and business operations, Apex Nexon combines visionary leadership with hands-on expertise.
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.8 }}>
                Our team consists of seasoned professionals who bring diverse backgrounds in software engineering, data science, and business strategy, ensuring that every solution we deliver is both innovative and practical.
              </Typography>
            </MotionCard>
          </Grid>
        </Grid>

        {/* Our Story - Full Width */}
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
          {/* Background Pattern */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50%",
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
              zIndex: 1
            }}
          >
            Our <span style={{ color: currentTheme.primary }}>Story</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              lineHeight: 1.8,
              fontSize: { xs: "1rem", md: "1.1rem" },
              mb: 2,
              maxWidth: "900px",
              position: "relative",
              zIndex: 1
            }}
          >
            Apex Nexon was born from the recognition that many businesses struggle to harness the full potential of modern technology due to complex implementations and lack of expertise. Our founders, drawing from years of experience in software development and business operations, set out to bridge this gap.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              lineHeight: 1.8,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              maxWidth: "900px",
              position: "relative",
              zIndex: 1
            }}
          >
            Today, we continue to push the boundaries of what&apos;s possible with technology, helping businesses transform their operations and achieve new levels of efficiency and innovation.
          </Typography>
        </MotionCard>
      </Container>

      {/* CTA Section */}
      <CTA />
    </Box>
  );
}
