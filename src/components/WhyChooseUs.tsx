"use client";

import { Box, Container, Typography, Card, CardContent, Chip, useTheme, Stack } from "@mui/material";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Code as CodeIcon,
    TrendingUp,
    Speed,
    AttachMoney,
    SupportAgent,
    BusinessCenter,
    ArrowForward,
} from "@mui/icons-material";
import { useBackground } from "@/context/BackgroundContext";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
    {
        title: "Full-Stack Expertise",
        description: "Our team masters both frontend and backend technologies, delivering complete solutions under one roof",
        icon: CodeIcon,
        features: ["Frontend Mastery", "Backend Excellence", "Full Lifecycle", "Tech Versatility"],
    },
    {
        title: "Scalable Solutions",
        description: "From startups to enterprises, our solutions grow with your business needs",
        icon: TrendingUp,
        features: ["Future-Proof", "Cloud Native", "Performance Optim", "Flexible Growth"],
    },
    {
        title: "Agile Development",
        description: "Fast iterations, regular updates, and flexibility to adapt to changing requirements",
        icon: Speed,
        features: ["Sprint Cycles", "Rapid Delivery", "Client Collab", "Dynamic Scope"],
    },
    {
        title: "Cost-Effective",
        description: "Competitive pricing without compromising on quality. Best ROI for your investment",
        icon: AttachMoney,
        features: ["Optimized Budget", "High Value", "Transparent Pricing", "Value Driven"],
    },
    {
        title: "Post-Launch Support",
        description: "We don't disappear after deployment. Continuous support and maintenance included",
        icon: SupportAgent,
        features: ["24/7 Monitoring", "Regular Updates", "Bug Fixing", "Growth Roadmap"],
    },
    {
        title: "Industry Experience",
        description: "Serving 100+ clients across e-commerce, healthcare, education, and finance sectors",
        icon: BusinessCenter,
        features: ["Multi-Sector", "Proven Track", "Expert Insight", "Strategic Partner"],
    },
];

export default function WhyChooseUs() {
    const theme = useTheme();
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const { currentTheme } = useBackground();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useLayoutEffect(() => {
        if (!triggerRef.current || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            const getScrollAmount = () => {
                const sectionWidth = sectionRef.current?.scrollWidth || 0;
                return -(sectionWidth - window.innerWidth + 150);
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: () => `+=${Math.abs(getScrollAmount()) + 1000}`,
                    scrub: 0.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Pause for the header
            tl.to({}, { duration: 1 });

            // Animate horizontal track
            tl.to(sectionRef.current, {
                x: getScrollAmount,
                ease: "none",
                duration: 2.5,
            });
        }, triggerRef);

        return () => ctx.revert();
    }, [isMobile]);

    return (
        <Box
            id="why-choose-us"
            ref={triggerRef}
            sx={{
                bgcolor: "#020617",
                overflow: "hidden",
                position: "relative",
                zIndex: 2,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                pt: { xs: 2, md: 3 }, // Shifted up as requested
            }}
        >
            {/* Background Decorative Elements */}
            <Box
                sx={{
                    position: "absolute",
                    top: "15%",
                    right: "-5%",
                    width: "45%",
                    height: "45%",
                    background: `radial-gradient(circle, ${currentTheme.secondary}22 0%, transparent 70%)`,
                    filter: "blur(120px)",
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "15%",
                    left: "-5%",
                    width: "45%",
                    height: "45%",
                    background: `radial-gradient(circle, ${currentTheme.primary}22 0%, transparent 70%)`,
                    filter: "blur(120px)",
                    zIndex: 0,
                }}
            />

            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, height: "auto", display: "flex", flexDirection: "column" }}>
                <Box ref={headerRef} sx={{ mb: { xs: 6, sm: 7, md: 3 }, textAlign: "left", pl: { xs: 2, sm: 3, md: 4 }, pr: { xs: 2, sm: 3 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            mb: 1.5,
                            color: "white",
                            fontSize: { xs: "clamp(1.8rem, 5vw, 3.5rem)", md: "3.5rem" },
                            lineHeight: 1.1,
                        }}
                    >
                        Why Businesses Trust <span style={{ color: currentTheme.primary }}>Quadra Services</span>
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "rgba(255, 255, 255, 0.5)",
                            maxWidth: 750,
                            fontWeight: 400,
                            fontSize: { xs: "clamp(0.9rem, 2.5vw, 1.1rem)", md: "1.1rem" },
                            lineHeight: 1.7,
                        }}
                    >
                        We provide reliable, cost-effective, and cutting-edge solutions to help your business stay ahead in the digital landscape.
                    </Typography>
                </Box>

                <Box
                    ref={sectionRef}
                    sx={{
                        display: "flex",
                        gap: { xs: 2.5, sm: 3, md: 6 },
                        position: "relative",
                        width: { xs: "100%", md: "fit-content" },
                        padding: { xs: "12px", sm: "16px", md: "20px" },
                        ml: { xs: 0, md: 4 },
                        pr: { xs: 2, md: 0 },
                        // Mobile: horizontal scroll with snap
                        overflowX: { xs: "auto", md: "visible" },
                        overflowY: "hidden",
                        scrollSnapType: { xs: "x mandatory", md: "none" },
                        WebkitOverflowScrolling: { xs: "touch", md: "auto" },
                        // Hide scrollbar
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    {benefits.map((benefit, index) => (
                        <Card
                            key={index}
                            sx={{
                                width: { xs: 280, sm: 320, md: 340 },
                                height: { xs: 380, sm: 400, md: 440 },
                                flexShrink: 0,
                                bgcolor: "rgba(30, 41, 59, 0.4)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: 6,
                                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                position: "relative",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                // Mobile scroll snap
                                scrollSnapAlign: { xs: "center", md: "none" },
                                scrollSnapStop: { xs: "always", md: "auto" },
                                // Desktop hover
                                "&:hover": {
                                    transform: { xs: "none", md: "translateY(-10px) scale(1.02)" },
                                    borderColor: { xs: "inherit", md: currentTheme.primary },
                                    bgcolor: { xs: "rgba(30, 41, 59, 0.4)", md: "rgba(30, 41, 59, 0.6)" },
                                    boxShadow: { xs: "none", md: `0 12px 25px -5px ${currentTheme.primary}33` },
                                    "& .icon-wrapper": {
                                        background: { xs: "inherit", md: currentTheme.primary },
                                        color: { xs: "inherit", md: "white" },
                                        transform: { xs: "none", md: "rotate(360deg) scale(1.1)" },
                                    },
                                    "& .bg-glow": {
                                        opacity: { xs: 0, md: 0.12 },
                                    }
                                },
                            }}
                        >
                            <Box
                                className="bg-glow"
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: `linear-gradient(135deg, ${currentTheme.primary} 0%, transparent 100%)`,
                                    opacity: 0,
                                    transition: "opacity 0.4s ease",
                                    zIndex: 0,
                                }}
                            />

                            <CardContent sx={{ p: { xs: 2.5, md: 4 }, height: "100%", display: "flex", flexDirection: "column", zIndex: 1 }}>
                                <Box
                                    className="icon-wrapper"
                                    sx={{
                                        width: { xs: 45, md: 60 },
                                        height: { xs: 45, md: 60 },
                                        borderRadius: 3.5,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        bgcolor: "rgba(255, 255, 255, 0.05)",
                                        color: currentTheme.primary,
                                        mb: { xs: 2, md: 3 },
                                        transition: "all 0.6s ease",
                                    }}
                                >
                                    <benefit.icon sx={{ fontSize: { xs: 24, md: 30 } }} />
                                </Box>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: "white",
                                        fontWeight: 800,
                                        mb: 1.2,
                                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                                        letterSpacing: "-0.01em",
                                    }}
                                >
                                    {benefit.title}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "rgba(255, 255, 255, 0.55)",
                                        mb: 2.5,
                                        lineHeight: 1.5,
                                        fontSize: { xs: "0.85rem", md: "0.95rem" },
                                        flexGrow: 1,
                                    }}
                                >
                                    {benefit.description}
                                </Typography>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 2.5 }}>
                                    {benefit.features.map((feature, idx) => (
                                        <Chip
                                            key={idx}
                                            label={feature}
                                            size="small"
                                            sx={{
                                                bgcolor: "rgba(255, 255, 255, 0.03)",
                                                color: "rgba(255, 255, 255, 0.7)",
                                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                                borderRadius: 2,
                                                fontWeight: 500,
                                                fontSize: "0.7rem",
                                                "&:hover": {
                                                    bgcolor: "rgba(255, 255, 255, 0.08)",
                                                }
                                            }}
                                        />
                                    ))}
                                </Box>

                                <Stack direction="row" alignItems="center" spacing={1} sx={{ color: currentTheme.primary, cursor: "pointer", fontWeight: 700, "&:hover": { "& .arrow": { transform: "translateX(4px)" } } }}>
                                    <Typography variant="button" sx={{ textTransform: 'none', fontSize: "0.85rem" }}>Learn More</Typography>
                                    <ArrowForward className="arrow" fontSize="small" sx={{ transition: "transform 0.3s ease" }} />
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>

            {/* Scroll Indicator */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    opacity: 0.3,
                }}
            >
                <Typography variant="caption" sx={{ color: "white", letterSpacing: 3, fontWeight: 600, fontSize: "0.65rem" }}>SCROLL TO EXPLORE</Typography>
                <Box sx={{ width: 1, height: 30, borderLeft: "1px solid white", opacity: 0.3 }} />
            </Box>
        </Box>
    );
}
