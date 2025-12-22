"use client";

import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneIcon from "@mui/icons-material/Phone";
import { useState, useEffect, useRef } from "react";
import { useBackground } from "@/context/BackgroundContext";
import { Sparkles, Rocket, Zap, Send } from "lucide-react";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

export default function CTA() {
    const [mounted, setMounted] = useState(false);
    const { currentTheme } = useBackground();
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the spotlight
    const springConfig = { damping: 25, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const spotlightBackground = useTransform(
        [smoothX, smoothY],
        ([x, y]) => `radial-gradient(circle 400px at ${x}px ${y}px, ${currentTheme.primary}15, transparent 80%)`
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <Box
            id="cta"
            sx={{
                py: { xs: 12, md: 20 },
                bgcolor: "#020617",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Background Layers */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            >
                {/* Fixed Ambient Glows */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "10%",
                        left: "5%",
                        width: "40%",
                        height: "40%",
                        background: `radial-gradient(circle, ${currentTheme.primary}11 0%, transparent 70%)`,
                        filter: "blur(100px)",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "10%",
                        right: "5%",
                        width: "40%",
                        height: "40%",
                        background: `radial-gradient(circle, ${currentTheme.secondary}11 0%, transparent 70%)`,
                        filter: "blur(100px)",
                    }}
                />

                {/* Animated Floating Tech Particles */}
                <AnimatePresence>
                    {mounted && [
                        { Icon: Rocket, top: "15%", left: "10%", delay: 0, scale: 0.8 },
                        { Icon: Zap, bottom: "20%", left: "15%", delay: 1, scale: 1.2 },
                        { Icon: Sparkles, top: "25%", right: "12%", delay: 2, scale: 0.9 },
                        { Icon: Send, bottom: "15%", right: "10%", delay: 3, scale: 1.1 },
                    ].map((item, idx) => (
                        <MotionBox
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: [0.2, 0.4, 0.2],
                                y: [0, -40, 0],
                                rotate: [0, 10, -10, 0],
                                scale: [item.scale, item.scale * 1.1, item.scale]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                delay: item.delay,
                                ease: "easeInOut"
                            }}
                            sx={{
                                position: "absolute",
                                top: item.top,
                                bottom: item.bottom,
                                left: item.left,
                                right: item.right,
                                color: currentTheme.primary,
                                filter: "drop-shadow(0 0 15px " + currentTheme.primary + "44)",
                                display: { xs: 'none', md: 'block' }
                            }}
                        >
                            <item.Icon size={40} strokeWidth={1.5} />
                        </MotionBox>
                    ))}
                </AnimatePresence>
            </Box>

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                <MotionBox
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    sx={{
                        position: "relative",
                        borderRadius: 10,
                        overflow: "hidden",
                        p: { xs: 6, md: 10 },
                        textAlign: "center",
                        bgcolor: "rgba(15, 23, 42, 0.3)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            borderRadius: "inherit",
                            padding: "1px",
                            background: `linear-gradient(135deg, rgba(255,255,255,0.1), transparent, ${currentTheme.primary}44)`,
                            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                            pointerEvents: "none",
                        }
                    }}
                >
                    {/* Modern Spotlight Effect */}
                    {mounted && (
                        <MotionBox
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: spotlightBackground,
                                pointerEvents: "none",
                                zIndex: 0,
                            }}
                        />
                    )}

                    <Box sx={{ position: "relative", zIndex: 1 }}>
                        <MotionBox
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 900,
                                    color: "white",
                                    fontSize: { xs: "2.5rem", md: "4.5rem" },
                                    lineHeight: 1.1,
                                    mb: 2,
                                    letterSpacing: "-0.02em",
                                    textShadow: "0 10px 30px rgba(0,0,0,0.5)",
                                }}
                            >
                                Let's Build Your <br />
                                <Box
                                    component="span"
                                    sx={{
                                        color: currentTheme.primary,
                                        position: "relative",
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: 10,
                                            left: 0,
                                            width: "100%",
                                            height: "8px",
                                            bgcolor: currentTheme.primary + "33",
                                            zIndex: -1,
                                            borderRadius: 2
                                        }
                                    }}
                                >
                                    Digital Legacy
                                </Box>
                            </Typography>
                        </MotionBox>

                        <MotionTypography
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            variant="h6"
                            sx={{
                                color: "rgba(255, 255, 255, 0.5)",
                                maxWidth: "750px",
                                mx: "auto",
                                mb: 6,
                                fontSize: { xs: "1rem", md: "1.25rem" },
                                fontWeight: 400,
                                lineHeight: 1.6,
                            }}
                        >
                            We combine cutting-edge AI, elite engineering, and visionary design to transform your ideas into market-leading digital products.
                        </MotionTypography>

                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={3}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <MotionButton
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    px: 6,
                                    py: 2.2,
                                    borderRadius: 3,
                                    bgcolor: currentTheme.primary,
                                    fontWeight: 800,
                                    fontSize: "1.1rem",
                                    textTransform: "none",
                                    boxShadow: `0 20px 40px -10px ${currentTheme.primary}66`,
                                    "&:hover": {
                                        bgcolor: currentTheme.primary,
                                        filter: "brightness(1.1)",
                                        boxShadow: `0 25px 50px -12px ${currentTheme.primary}88`,
                                    },
                                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                }}
                            >
                                Start Your Project
                            </MotionButton>

                            <MotionButton
                                whileHover={{ scale: 1.05, y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                                whileTap={{ scale: 0.98 }}
                                variant="outlined"
                                size="large"
                                startIcon={<PhoneIcon />}
                                sx={{
                                    px: 6,
                                    py: 2.2,
                                    borderRadius: 3,
                                    borderColor: "rgba(255, 255, 255, 0.15)",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: "1.1rem",
                                    textTransform: "none",
                                    backdropFilter: "blur(10px)",
                                    "&:hover": {
                                        borderColor: "white",
                                        borderWidth: 1,
                                    },
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Talk to an Expert
                            </MotionButton>
                        </Stack>
                    </Box>

                    {/* Bottom Decorative Line */}
                    <MotionBox
                        initial={{ width: 0 }}
                        whileInView={{ width: "30%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        sx={{
                            height: "2px",
                            bgcolor: currentTheme.primary,
                            mt: 8,
                            mx: "auto",
                            opacity: 0.5,
                            borderRadius: 1,
                            boxShadow: `0 0 20px ${currentTheme.primary}`
                        }}
                    />
                </MotionBox>
            </Container>
        </Box>
    );
}
