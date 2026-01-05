"use client";

import { Box, Container, Typography, Button, Stack, Grid, Tooltip } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CodeIcon from "@mui/icons-material/Code";
import Image from "next/image";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

// Planet Configuration Data
const solarSystem = [
  { id: 1, name: "Mercury (Budh)", color: "#B0B0B0", size: 8, distance: 70, duration: 10, startAngle: 0 },
  { id: 2, name: "Venus (Shukra)", color: "#E0C068", size: 10, distance: 90, duration: 15, startAngle: 120 },
  { id: 3, name: "Earth & Moon", color: "#2196F3", size: 12, distance: 110, duration: 20, startAngle: 240 },
  { id: 4, name: "Mars (Mangal)", color: "#F44336", size: 10, distance: 130, duration: 25, startAngle: 60 },
  { id: 5, name: "Jupiter (Brihaspati)", color: "#FF9800", size: 18, distance: 160, duration: 35, startAngle: 180 },
  { id: 6, name: "Saturn (Shani)", color: "#CDDC39", size: 14, distance: 190, duration: 45, hasRings: true, startAngle: 300 },
  { id: 7, name: "Uranus (Rahu)", color: "#00BCD4", size: 12, distance: 220, duration: 55, startAngle: 90 },
  { id: 8, name: "Neptune (Ketu)", color: "#3F51B5", size: 10, distance: 250, duration: 65, startAngle: 210 },
  { id: 9, name: "Pluto", color: "#90A4AE", size: 6, distance: 280, duration: 80, startAngle: 330 },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)",
        color: "#fff",
      }}
      role="banner"
      aria-labelledby="hero-heading"
    >
      {/* Background Deep Space Glows */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: 800,
          height: 800,
          background: "radial-gradient(circle, #290829, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.5,
        }}
      />

      <Container sx={{ position: "relative", zIndex: 1, py: 4 }}>
        <Grid container spacing={2} alignItems="center">
          {/* LEFT SIDE: Text Content */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3} maxWidth={650}>
              <MotionTypography
                variant="h2"
                fontWeight={800}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                  lineHeight: 1.1,
                  fontSize: { xs: "var(--font-size-2xl)", sm: "var(--font-size-3xl)", md: "3.5rem" },
                  mb: { xs: 1, md: 2 }
                }}
              >
                Where Intelligence <br />
                <Box component="span" sx={{ color: "#E91E63" }}>
                  Meets Automation
                </Box>
              </MotionTypography>

              <MotionTypography
                variant="h6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: { xs: "var(--font-size-base)", md: "1.1rem" },
                  maxWidth: "90%",
                  lineHeight: 1.6,
                }}
              >
                We build AI-driven software solutions that automate operations, scale businesses, and unlock digital growth.
              </MotionTypography>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1, mb: { xs: 2, md: 1 } }}>
                {[
                  { icon: <CodeIcon fontSize="small" />, label: "Dev" },
                  { icon: <SmartToyIcon fontSize="small" />, label: "AI" },
                  { icon: <DesignServicesIcon fontSize="small" />, label: "Design" },
                ].map((item, idx) => (
                  <MotionBox
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      px: 2,
                      py: 0.75,
                      borderRadius: 10,
                      bgcolor: "rgba(255,255,255,0.08)",
                      fontSize: "0.85rem",
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontWeight: 500,
                    }}
                  >
                    {item.icon} {item.label}
                  </MotionBox>
                ))}
              </Stack>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                sx={{ pt: 2 }}
              >
                <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2.5, sm: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      px: { xs: 3, sm: 3 },
                      py: { xs: 1.5, sm: "auto" },
                      minHeight: { xs: 48, sm: 52 },
                      background: "linear-gradient(90deg, #E91E63, #6A1B9A)",
                      borderRadius: 3,
                      textTransform: "none",
                      fontSize: { xs: "1rem", sm: "1.05rem" },
                      fontWeight: 700,
                      transition: "all 0.3s ease",
                      boxShadow: "0 10px 20px -5px rgba(233, 30, 99, 0.4)",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 15px 30px rgba(233, 30, 99, 0.5)",
                      },
                      "&:active": {
                        transform: "scale(0.97)",
                      },
                    }}
                  >
                    Get a Free Consultation
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      px: { xs: 3, sm: 3 },
                      py: { xs: 1.5, sm: "auto" },
                      minHeight: { xs: 48, sm: 52 },
                      color: "#fff",
                      borderColor: "rgba(255,255,255,0.25)",
                      borderRadius: 3,
                      textTransform: "none",
                      fontSize: { xs: "1rem", sm: "1.05rem" },
                      fontWeight: 700,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "#fff",
                        bgcolor: "rgba(255,255,255,0.1)",
                        transform: "translateY(-3px)",
                      },
                      "&:active": {
                        transform: "scale(0.97)",
                      },
                    }}
                  >
                    Talk to an Expert
                  </Button>
                </Stack>
              </MotionBox>
            </Stack>
          </Grid>

          {/* RIGHT SIDE: Navagraha Animation */}
          <Grid
            size={{ xs: 12, md: 7 }}
            sx={{
              display: "flex",
              justifyContent: "flex-end", // Align to right
              position: "relative",
              height: 600,

            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: "min(280px, 85vw)", md: 400 }, // Scaled down for mobile
                height: { xs: "min(280px, 85vw)", md: 400 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: { md: 0 },
                mt: { xs: 4, md: 10 } // Push down
              }}
            >
              {/* Sun (Surya) - The Core */}
              <MotionBox
                animate={{ scale: [1, 1.05, 1], filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  position: "absolute",
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 50px #FF9800",
                }}
                role="img"
                aria-label="Sun representing the center of our digital universe"
              >
                <Image
                  src="/sun.png"
                  alt="Sun - Center of our digital universe"
                  width={80}
                  height={80}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                  priority
                />
              </MotionBox>

              {/* Orbits and Planets */}
              {solarSystem.map((planet, index) => (
                <MotionBox
                  key={planet.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, rotate: [planet.startAngle, 360 + planet.startAngle] }}
                  transition={{
                    scale: { duration: 1 },
                    opacity: { duration: 1 },
                    rotate: {
                      duration: planet.duration,
                      repeat: Infinity,
                      ease: "linear"
                    },
                  }}
                  sx={{
                    position: "absolute",
                    width: planet.distance * 2,
                    height: planet.distance * 2,
                    borderRadius: "50%",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    "&:hover": {
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }
                  }}
                >
                  {/* The Planet Object */}
                  <Tooltip title={<Typography sx={{ fontSize: 14 }}>{planet.name}</Typography>} placement="top" arrow>
                    <MotionBox
                      whileHover={{ scale: 1.5 }}
                      sx={{
                        width: planet.size,
                        height: planet.size,
                        borderRadius: "50%",
                        bgcolor: planet.color,
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        boxShadow: `0 0 10px ${planet.color}`,
                        cursor: "pointer",
                        zIndex: 10 + index,
                      }}
                    >
                      {/* Saturn Ring */}
                      {planet.hasRings && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "180%",
                            height: "60%",
                            border: "2px solid rgba(255,255,255,0.6)",
                            borderRadius: "50%",
                            transform: "translate(-50%, -50%) rotate(-20deg)",
                          }}
                        />
                      )}
                    </MotionBox>
                  </Tooltip>
                </MotionBox>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
