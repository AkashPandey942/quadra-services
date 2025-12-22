"use client";

import { Box, Container, Typography, Card, CardContent, Chip, useTheme, Stack } from "@mui/material";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Code as CodeIcon,
    ShoppingCart,
    Smartphone,
    Business,
    SettingsSuggest,
    Group,
    Hub,
    DesignServices,
    SupportAgent,
    ArrowForward,
} from "@mui/icons-material";
import { useBackground } from "@/context/BackgroundContext";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Website Development",
        description: "Professional static and dynamic websites tailored to your business needs.",
        icon: CodeIcon,
        features: ["Static websites", "Dynamic websites (CMS)", "Responsive design", "SEO optimized"],
    },
    {
        title: "E-commerce Solutions",
        description: "Complete e-commerce platforms for small to medium businesses.",
        icon: ShoppingCart,
        features: ["Custom online stores", "Payment gateways", "Inventory management", "Multi-vendor marketplaces"],
    },
    {
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications for iOS and Android.",
        icon: Smartphone,
        features: ["Android apps", "iOS apps", "React Native / Flutter", "Progressive Web Apps"],
    },
    {
        title: "Enterprise Solutions",
        description: "Scalable enterprise-level applications and management systems.",
        icon: Business,
        features: ["ERP systems", "CRM solutions", "Custom software", "Cloud-based solutions"],
    },
    {
        title: "Business Automation",
        description: "Streamline operations with intelligent automation solutions.",
        icon: SettingsSuggest,
        features: ["Workflow automation", "Process digitization", "API integrations", "Chatbots & AI"],
    },
    {
        title: "Hire Dedicated Developers",
        description: "Skilled developers to extend your team on flexible terms.",
        icon: Group,
        features: ["Full-stack developers", "Frontend specialists", "Backend engineers", "Mobile developers"],
    },
    {
        title: "Website & Service Integration",
        description: "Seamlessly connect your existing platforms and services.",
        icon: Hub,
        features: ["Third-party APIs", "Legacy modernization", "Multi-platform sync", "Custom integrations"],
    },
    {
        title: "UI/UX Design",
        description: "Beautiful, user-friendly interfaces that drive engagement.",
        icon: DesignServices,
        features: ["Web design", "Mobile app design", "Wireframing", "Brand identity"],
    },
    {
        title: "Maintenance & Support",
        description: "Ongoing technical support and maintenance services.",
        icon: SupportAgent,
        features: ["24/7 support", "Bug fixes & updates", "Performance opt", "Security patches"],
    },
];

export default function Services() {
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
                let sectionWidth = sectionRef.current?.scrollWidth || 0;
                return -(sectionWidth - window.innerWidth + 150);
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: () => `+=${Math.abs(getScrollAmount()) + 1000}`, // Increased scroll distance for longer delay
                    scrub: 0.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Step 1: Extended pause for the header
            tl.to({}, { duration: 1 });

            // Step 2: Animate the horizontal track
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
            id="services"
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
                pt: { xs: 2, md: 3 }, // Significantly reduced top padding
            }}
        >
            {/* Background Decorative Elements */}
            <Box
                sx={{
                    position: "absolute",
                    top: "10%",
                    left: "-5%",
                    width: "40%",
                    height: "40%",
                    background: `radial-gradient(circle, ${currentTheme.primary}22 0%, transparent 70%)`,
                    filter: "blur(100px)",
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "10%",
                    right: "-5%",
                    width: "40%",
                    height: "40%",
                    background: `radial-gradient(circle, ${currentTheme.secondary}22 0%, transparent 70%)`,
                    filter: "blur(100px)",
                    zIndex: 0,
                }}
            />

            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, height: "auto", display: "flex", flexDirection: "column" }}>
                <Box ref={headerRef} sx={{ mb: { xs: 2, md: 3 }, textAlign: "left", pl: { md: 4 }, mt: { xs: 1, md: 0 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            mb: 1,
                            color: "white",
                            fontSize: { xs: "2.2rem", md: "3.5rem" }, // Slightly smaller header to reclaim space
                            lineHeight: 1.1,
                        }}
                    >
                        Our <span style={{ color: currentTheme.primary }}>Services</span>
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "rgba(255, 255, 255, 0.5)",
                            maxWidth: 750,
                            fontWeight: 400,
                            fontSize: { xs: "0.9rem", md: "1.1rem" },
                            lineHeight: 1.5,
                        }}
                    >
                        We merge creativity with technical excellence to build future-ready digital products that drive growth and innovation.
                    </Typography>
                </Box>

                <Box
                    ref={sectionRef}
                    sx={{
                        display: "flex",
                        gap: { xs: 3, md: 6 }, // Increased gap for more spacing
                        position: "relative",
                        width: "fit-content",
                        padding: { xs: "10px", md: "20px" },
                        ml: { xs: 2, md: 4 },
                    }}
                >
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            sx={{
                                width: { xs: 260, md: 340 }, // Further reduced card size
                                height: { xs: 360, md: 440 },
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
                                "&:hover": {
                                    transform: "translateY(-10px) scale(1.02)",
                                    borderColor: currentTheme.primary,
                                    bgcolor: "rgba(30, 41, 59, 0.6)",
                                    boxShadow: `0 12px 25px -5px ${currentTheme.primary}33`,
                                    "& .icon-wrapper": {
                                        background: currentTheme.primary,
                                        color: "white",
                                        transform: "rotate(360deg) scale(1.1)",
                                    },
                                    "& .bg-glow": {
                                        opacity: 0.12,
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
                                    <service.icon sx={{ fontSize: { xs: 24, md: 30 } }} />
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
                                    {service.title}
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
                                    {service.description}
                                </Typography>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 2.5 }}>
                                    {service.features.map((feature, idx) => (
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
