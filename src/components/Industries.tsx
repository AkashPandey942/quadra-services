"use client";

import { Box, Container, Typography, Card, CardContent, Chip, useTheme, Stack } from "@mui/material";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ShoppingCart,
    LocalHospital,
    School,
    PrecisionManufacturing,
    Home,
    AccountBalance,
    LocalShipping,
    Hotel,
} from "@mui/icons-material";
import { useBackground } from "@/context/BackgroundContext";

gsap.registerPlugin(ScrollTrigger);

const industries = [
    {
        title: "E-commerce & Retail",
        icon: ShoppingCart,
        solutions: ["Online stores", "Inventory systems", "Payment integration", "CRM"],
    },
    {
        title: "Healthcare",
        icon: LocalHospital,
        solutions: ["Patient management", "Telemedicine", "Medical IoT", "HIPAA Compliance"],
    },
    {
        title: "Education",
        icon: School,
        solutions: ["LMS Portals", "Virtual classrooms", "Student portals", "Mobile learning"],
    },
    {
        title: "Manufacturing",
        icon: PrecisionManufacturing,
        solutions: ["IoT monitoring", "Production tracking", "Supply chain", "Quality control"],
    },
    {
        title: "Real Estate",
        icon: Home,
        solutions: ["Property listings", "Real Estate CRM", "Virtual tours", "Booking systems"],
    },
    {
        title: "Finance & Banking",
        icon: AccountBalance,
        solutions: ["Payment gateways", "Fintech apps", "Invest platforms", "Secure Transact"],
    },
    {
        title: "Logistics",
        icon: LocalShipping,
        solutions: ["Fleet management", "Route optim", "Real-time track", "Delivery apps"],
    },
    {
        title: "Hospitality",
        icon: Hotel,
        solutions: ["Booking engines", "Restaurant systems", "Hotel PMS", "Travel portals"],
    },
];

export default function Industries() {
    const triggerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const { currentTheme } = useBackground();
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        if (!triggerRef.current) return;

        const ctx = gsap.context(() => {
            // Entrance Animation
            gsap.fromTo(
                cardsRef.current,
                {
                    opacity: 0,
                    y: 100,
                    rotateX: 45,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out",
        });

        // Animate chips with stagger on hover
        const chips = card.querySelectorAll(".reveal-chips .MuiChip-root");
        gsap.to(chips, {
            y: -4,
            duration: 0.3,
            stagger: 0.05,
            ease: "back.out(1.5)",
        });
    };

    const handleMouseLeave = (index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;

        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
        });

        // Reset chips position on mouse leave
        const chips = card.querySelectorAll(".reveal-chips .MuiChip-root");
        gsap.to(chips, {
            y: 0,
            duration: 0.5,
            stagger: -0.05,
            ease: "back.in(1.5)",
        });
    };

    return (
        <Box
            id="industries"
            ref={triggerRef}
            sx={{
                bgcolor: "#020617",
                py: { xs: 8, md: 10 },
                position: "relative",
                zIndex: 2,
                overflow: "hidden",
                perspective: "1500px", // Crucial for 3D effects
            }}
        >
            {/* Background Gradients */}
            <Box
                sx={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80%",
                    height: "60%",
                    background: `radial-gradient(circle, ${currentTheme.primary}11 0%, transparent 70%)`,
                    filter: "blur(120px)",
                    zIndex: 0,
                }}
            />

            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
                <Box sx={{ mb: { xs: 6, sm: 7, md: 8 }, textAlign: "left", pl: { xs: 2, sm: 3, md: 4 }, pr: { xs: 2, sm: 3 } }}>
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
                        Strategic Solutions for <span style={{ color: currentTheme.primary }}>Diverse Industries</span>
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "rgba(255, 255, 255, 0.5)",
                            maxWidth: 850,
                            fontWeight: 400,
                            fontSize: { xs: "clamp(0.9rem, 2.5vw, 1.15rem)", md: "1.15rem" },
                            lineHeight: 1.7,
                        }}
                    >
                        We leverage deep domain expertise to build transformative digital experiences tailored to the unique challenges of your sector.
                    </Typography>
                </Box>

                <Box
                    ref={gridRef}
                    sx={{
                        flexWrap: { xs: "nowrap", md: "wrap" },
                        gap: { xs: 2.5, sm: 3, md: 3.5 },
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
                        // Grid behavior on desktop
                        display: { xs: "flex", md: "grid" },
                        gridTemplateColumns: {
                            md: "repeat(4, 1fr)"
                        },
                    }}
                >
                    {industries.map((industry, index) => (
                        <Box
                            key={index}
                            ref={(el: HTMLDivElement | null) => { cardsRef.current[index] = el; }}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            style={{ transformStyle: "preserve-3d" }}
                            sx={{
                                // Mobile scroll snap
                                scrollSnapAlign: { xs: "center", md: "none" },
                                scrollSnapStop: { xs: "always", md: "auto" },
                                flexShrink: 0,
                                width: { xs: 280, sm: 300, md: "auto" },
                            }}
                        >
                            <Card
                                sx={{
                                    height: "100%",
                                    bgcolor: "rgba(30, 41, 59, 0.4)",
                                    backdropFilter: "blur(12px)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    borderRadius: 6,
                                    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                                    position: "relative",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    "&:hover": {
                                        borderColor: { xs: "inherit", md: currentTheme.primary },
                                        boxShadow: { xs: "none", md: `0 20px 40px -10px ${currentTheme.primary}44` },
                                        "& .reveal-chips": {
                                            transform: { xs: "translateY(0)", md: "translateY(0)" },
                                            opacity: { xs: 1, md: 1 },
                                        },
                                        "& .industry-icon": {
                                            color: { xs: "inherit", md: "white" },
                                            background: { xs: "inherit", md: currentTheme.primary },
                                            transform: { xs: "none", md: "translateZ(30px) scale(1.1)" },
                                        }
                                    },
                                }}
                            >
                                <CardContent sx={{ p: { xs: 3, sm: 3.5, md: 4 }, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Box
                                        className="industry-icon"
                                        sx={{
                                            width: { xs: 56, sm: 60, md: 65 },
                                            height: { xs: 56, sm: 60, md: 65 },
                                            borderRadius: 4,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bgcolor: "rgba(255, 255, 255, 0.05)",
                                            color: currentTheme.primary,
                                            mb: { xs: 2, md: 3 },
                                            transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                            transform: "translateZ(20px)",
                                        }}
                                    >
                                        <industry.icon sx={{ fontSize: { xs: 28, md: 32 } }} />
                                    </Box>

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "white",
                                            fontWeight: 800,
                                            mb: { xs: 1.5, md: 2 },
                                            fontSize: { xs: "clamp(1.05rem, 2.5vw, 1.25rem)", md: "1.25rem" },
                                            lineHeight: 1.3,
                                            transform: "translateZ(25px)",
                                        }}
                                    >
                                        {industry.title}
                                    </Typography>

                                    {/* Solutions Chips - Always Visible */}
                                    <Box
                                        className="reveal-chips"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: { xs: 0.8, md: 1 },
                                            width: "100%",
                                            transform: "translateY(0)",
                                            opacity: 1,
                                            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        {industry.solutions.map((solution, idx) => (
                                            <Chip
                                                key={idx}
                                                label={solution}
                                                size="small"
                                                sx={{
                                                    bgcolor: "rgba(255, 255, 255, 0.04)",
                                                    color: "rgba(255, 255, 255, 0.7)",
                                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                                    borderRadius: 1.5,
                                                    fontWeight: 500,
                                                    fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
                                                    transform: "translateZ(15px)",
                                                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                                    "&:hover": {
                                                        bgcolor: currentTheme.primary + "20",
                                                        color: "white",
                                                        borderColor: currentTheme.primary + "60",
                                                        transform: "translateZ(15px) scale(1.08) translateY(-2px)",
                                                        boxShadow: `0 8px 16px -4px ${currentTheme.primary}40`,
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
