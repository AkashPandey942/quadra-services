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
        // Only apply GSAP animations on desktop (md and above)
        if (isMobile || !triggerRef.current || !sectionRef.current) return;

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

            tl.to({}, { duration: 1 });
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
                minHeight: { xs: "auto", md: "100vh" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                pt: { xs: 6, sm: 8, md: 3 },
                pb: { xs: 4, md: 8 },
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
                <Box ref={headerRef} sx={{ mb: { xs: 4, sm: 5, md: 3 }, textAlign: "left", pl: { xs: 2, sm: 3, md: 4 }, pr: { xs: 2, sm: 3 } }}>
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
                        Our <span style={{ color: currentTheme.primary }}>Services</span>
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "rgba(255, 255, 255, 0.5)",
                            maxWidth: 750,
                            fontWeight: 400,
                            fontSize: { xs: "clamp(0.9rem, 2.5vw, 1.1rem)", md: "1.1rem" },
                            lineHeight: 1.6,
                        }}
                    >
                        We merge creativity with technical excellence to build future-ready digital products that drive growth and innovation.
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
                        // Hide scrollbar on mobile
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    {services.map((service, index) => (
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

                            <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 }, height: "100%", display: "flex", flexDirection: "column", zIndex: 1 }}>
                                <Box
                                    className="icon-wrapper"
                                    sx={{
                                        width: { xs: 48, sm: 52, md: 60 },
                                        height: { xs: 48, sm: 52, md: 60 },
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
                                    <service.icon sx={{ fontSize: { xs: 26, sm: 28, md: 30 } }} />
                                </Box>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: "white",
                                        fontWeight: 800,
                                        mb: 1.2,
                                        fontSize: { xs: "clamp(1.1rem, 2.5vw, 1.5rem)", md: "1.5rem" },
                                        letterSpacing: "-0.01em",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {service.title}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "rgba(255, 255, 255, 0.55)",
                                        mb: 2.5,
                                        lineHeight: 1.6,
                                        fontSize: { xs: "clamp(0.8rem, 2vw, 0.95rem)", md: "0.95rem" },
                                        flexGrow: 1,
                                    }}
                                >
                                    {service.description}
                                </Typography>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 0.7, md: 0.8 }, mb: 2.5 }}>
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
                                                fontSize: "clamp(0.65rem, 1.5vw, 0.7rem)",
                                                "&:hover": {
                                                    bgcolor: "rgba(255, 255, 255, 0.08)",
                                                }
                                            }}
                                        />
                                    ))}
                                </Box>

                                <Stack direction="row" alignItems="center" spacing={1} sx={{ color: currentTheme.primary, cursor: "pointer", fontWeight: 700, fontSize: { xs: "0.8rem", md: "0.85rem" }, "&:hover": { "& .arrow": { transform: { xs: "none", md: "translateX(4px)" } } } }}>
                                    <Typography variant="button" sx={{ textTransform: 'none' }}>Learn More</Typography>
                                    <ArrowForward className="arrow" fontSize="small" sx={{ transition: "transform 0.3s ease", display: { xs: "none", md: "block" } }} />
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>

            {/* Scroll Indicator */}
            <Box
                sx={{
                    position: "relative",
                    mt: { xs: 3, md: 0 },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1.5,
                    opacity: 0.4,
                    fontSize: { xs: "0.7rem", md: "0.75rem" },
                }}
            >
                <Typography variant="caption" sx={{ color: "white", letterSpacing: 2, fontWeight: 600 }}>
                    {isMobile ? "SCROLL HORIZONTALLY" : "SCROLL TO EXPLORE"}
                </Typography>
            </Box>
        </Box>
    );
}
