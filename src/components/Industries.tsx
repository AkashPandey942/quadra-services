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
                <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: "left", pl: { md: 4 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            mb: 1.5,
                            color: "white",
                            fontSize: { xs: "2.2rem", md: "3.5rem" },
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
                            fontSize: { xs: "0.95rem", md: "1.15rem" },
                            lineHeight: 1.6,
                        }}
                    >
                        We leverage deep domain expertise to build transformative digital experiences tailored to the unique challenges of your sector.
                    </Typography>
                </Box>

                <Box
                    ref={gridRef}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(4, 1fr)"
                        },
                        gap: 3.5,
                        px: { md: 4 },
                    }}
                >
                    {industries.map((industry, index) => (
                        <Box
                            key={index}
                            ref={(el: HTMLDivElement | null) => { cardsRef.current[index] = el; }}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            style={{ transformStyle: "preserve-3d" }}
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
                                        borderColor: currentTheme.primary,
                                        boxShadow: `0 20px 40px -10px ${currentTheme.primary}44`,
                                        "& .reveal-chips": {
                                            transform: "translateY(0)",
                                            opacity: 1,
                                        },
                                        "& .industry-icon": {
                                            color: "white",
                                            background: currentTheme.primary,
                                            transform: "translateZ(30px) scale(1.1)",
                                        }
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 4, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Box
                                        className="industry-icon"
                                        sx={{
                                            width: 65,
                                            height: 65,
                                            borderRadius: 4,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bgcolor: "rgba(255, 255, 255, 0.05)",
                                            color: currentTheme.primary,
                                            mb: 3,
                                            transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                            transform: "translateZ(20px)",
                                        }}
                                    >
                                        <industry.icon sx={{ fontSize: 32 }} />
                                    </Box>

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "white",
                                            fontWeight: 800,
                                            mb: 2,
                                            fontSize: "1.25rem",
                                            transform: "translateZ(25px)",
                                        }}
                                    >
                                        {industry.title}
                                    </Typography>

                                    {/* Reveal Chips on Hover */}
                                    <Box
                                        className="reveal-chips"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1,
                                            width: "100%",
                                            transform: "translateY(20px)",
                                            opacity: 0,
                                            transition: "all 0.4s ease",
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
                                                    fontSize: "0.75rem",
                                                    transform: "translateZ(15px)",
                                                    "&:hover": {
                                                        bgcolor: "rgba(255, 255, 255, 0.12)",
                                                        color: "white",
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
