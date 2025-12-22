"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowRight,
    Bot,
    CloudCog,
    Coins,
    Globe,
    LucideIcon,
    Server,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Box, Typography, Stack, useTheme } from "@mui/material";
import ScrollingBackgroundText from "./ScrollingBackgroundText";
import { useBackground } from "@/context/BackgroundContext";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
    {
        id: "frontend",
        title: "FRONTEND",
        subtitle: "Digital Experience",
        description:
            "Crafting immersive digital journeys that captivate and convert. From high-performance landing pages to complex web applications, I build pixel-perfect interfaces that users love.",
        details: [
            "React / React Native",
            "Next.js / Remix",
            "Angular / Vue",
            "WordPress / Elementor",
        ],
        icon: Globe,
        color: "#06b6d4",
        gradient: "linear-gradient(to right, #06b6d4, #2563eb)",
    },
    {
        id: "backend",
        title: "BACKEND",
        subtitle: "System Architecture",
        description:
            "Designing robust, scalable server-side solutions that power your business logic. Secure APIs, efficient databases, and microservices architecture built for high availability.",
        details: [
            "Node.js / TypeScript",
            "Python / Go",
            "PHP / Laravel",
            "System Design",
        ],
        icon: Server,
        color: "#8B5CF6",
        gradient: "linear-gradient(to right, #8B5CF6, #9333ea)",
    },
    {
        id: "web3",
        title: "WEB3",
        subtitle: "Decentralized Future",
        description:
            "Pioneering the next generation of the internet. Smart contract development, DApp integration, and blockchain solutions that bring transparency and trust to your applications.",
        details: [
            "Blockchain / Crypto",
            "Smart Contracts",
            "DeFi Protocols",
            "DApps Architecture",
        ],
        icon: Coins,
        color: "#F59E0B",
        gradient: "linear-gradient(to right, #F59E0B, #ea580c)",
    },
    {
        id: "ai",
        title: "AI",
        subtitle: "Intelligent Solutions",
        description:
            "Integrating cutting-edge artificial intelligence to automate processes and create smarter applications. Leveraging LLMs and predictive models to unlock new possibilities.",
        details: [
            "LLM Integration",
            "OpenAI / Anthropic",
            "AI Agents",
            "Predictive Models",
        ],
        icon: Bot,
        color: "#EC4899",
        gradient: "linear-gradient(to right, #EC4899, #e11d48)",
    },
    {
        id: "devops",
        title: "DEVOPS",
        subtitle: "Cloud Infrastructure",
        description:
            "Automating the bridge between code and deployment. CI/CD pipelines, container orchestration, and cloud infrastructure management ensuring your software runs smoothly everywhere.",
        details: [
            "Docker / Kubernetes",
            "CI / CD Pipelines",
            "Agile Methodology",
            "Robot Framework",
        ],
        icon: CloudCog,
        color: "#10B981",
        gradient: "linear-gradient(to right, #10B981, #0d9488)",
    },
];

interface SkillCardProps {
    skill: typeof skillsData[0];
    index: number;
    isMobile: boolean;
}

function SkillCard({ skill, index, isMobile }: SkillCardProps) {
    const rangeStart = index * 0.2;
    const rangeEnd = (index + 1) * 0.2;

    const enterStart =
        index === 0
            ? isMobile
                ? -0.02
                : -0.05
            : isMobile
                ? rangeStart - 0.05
                : rangeStart - 0.1;
    const enterEnd =
        index === 0
            ? isMobile
                ? rangeStart + 0.05
                : rangeStart + 0.08
            : isMobile
                ? rangeStart + 0.03
                : rangeStart + 0.05;
    const exitStart = isMobile ? rangeEnd - 0.03 : rangeEnd - 0.05;
    const exitEnd = isMobile ? rangeEnd + 0.05 : rangeEnd + 0.05;

    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const linkRef = useRef<HTMLDivElement>(null);
    const circlesRef = useRef<HTMLDivElement>(null);

    const mousePos = useRef({ x: 0, y: 0 });
    const contentRotateX = useRef(0);
    const contentRotateY = useRef(0);

    const lerp = (start: number, end: number, t: number) =>
        start + (end - start) * t;

    const mapRange = (
        value: number,
        inMin: number,
        inMax: number,
        outMin: number,
        outMax: number
    ) => {
        if (value <= inMin) return outMin;
        if (value >= inMax) return outMax;
        const t = (value - inMin) / (inMax - inMin);
        return lerp(outMin, outMax, t);
    };

    const getValue = (progress: number, ranges: number[], values: number[]) => {
        if (progress <= ranges[0]) return values[0];
        if (progress >= ranges[ranges.length - 1]) return values[values.length - 1];

        for (let i = 0; i < ranges.length - 1; i++) {
            if (progress >= ranges[i] && progress <= ranges[i + 1]) {
                return mapRange(
                    progress,
                    ranges[i],
                    ranges[i + 1],
                    values[i],
                    values[i + 1]
                );
            }
        }
        return values[0];
    };

    useLayoutEffect(() => {
        if (!cardRef.current) return;

        const ctx = gsap.context(() => {
            const container = cardRef.current?.closest("section");
            if (!container) return;

            let targetRotateX = 0;
            let targetRotateY = 0;
            let rafId: number | null = null;

            const updateMouseRotation = () => {
                if (contentRef.current && !isMobile) {
                    contentRotateX.current = lerp(
                        contentRotateX.current,
                        targetRotateX,
                        0.1
                    );
                    contentRotateY.current = lerp(
                        contentRotateY.current,
                        targetRotateY,
                        0.1
                    );

                    gsap.set(contentRef.current, {
                        rotateX: contentRotateX.current,
                        rotateY: contentRotateY.current,
                    });
                }

                if (
                    Math.abs(contentRotateX.current - targetRotateX) > 0.01 ||
                    Math.abs(contentRotateY.current - targetRotateY) > 0.01
                ) {
                    rafId = requestAnimationFrame(updateMouseRotation);
                } else {
                    rafId = null;
                }
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (!cardRef.current || isMobile) return;

                if (!rafId) {
                    rafId = requestAnimationFrame(() => {
                        if (!cardRef.current) return;

                        const rect = cardRef.current.getBoundingClientRect();
                        const centerX = rect.left + rect.width / 2;
                        const centerY = rect.top + rect.height / 2;

                        mousePos.current = {
                            x: e.clientX - centerX,
                            y: e.clientY - centerY,
                        };

                        targetRotateX = mapRange(mousePos.current.y, -300, 300, 5, -5);
                        targetRotateY = mapRange(mousePos.current.x, -300, 300, -5, 5);

                        updateMouseRotation();
                        rafId = null;
                    });
                }
            };

            ScrollTrigger.create({
                trigger: container,
                start: "top bottom",
                end: "bottom-=300vh top",
                scrub: true,
                onUpdate: (self) => {
                    const p = self.progress;

                    const opacity = getValue(
                        p,
                        [enterStart, enterEnd, exitStart, exitEnd],
                        [0, 1, 1, 0]
                    );
                    const x = isMobile
                        ? 0
                        : getValue(
                            p,
                            [enterStart, enterEnd, exitStart, exitEnd],
                            [1920, 96, -96, -1920]
                        );
                    const y = isMobile
                        ? getValue(
                            p,
                            [enterStart, enterEnd, exitStart, exitEnd],
                            [100, 0, 0, -100]
                        )
                        : getValue(
                            p,
                            [enterStart, enterEnd, exitStart, exitEnd],
                            [540, 22, -22, -540]
                        );
                    const rotateY = isMobile
                        ? 0
                        : getValue(
                            p,
                            [enterStart, enterEnd, exitStart, exitEnd],
                            [45, 5, -5, -45]
                        );
                    const rotateZ = isMobile
                        ? 0
                        : getValue(
                            p,
                            [enterStart, enterEnd, exitStart, exitEnd],
                            [10, 2, -2, -10]
                        );
                    const z = isMobile
                        ? 0
                        : getValue(
                            p,
                            [enterStart, enterEnd, exitStart, exitEnd],
                            [-1200, 0, 100, -1200]
                        );
                    const scale = isMobile
                        ? getValue(
                            p,
                            [enterStart, enterEnd, exitStart, exitEnd],
                            [0.9, 1, 1, 0.9]
                        )
                        : getValue(
                            p,
                            [enterStart, enterEnd, exitStart, exitEnd],
                            [0.6, 1, 1.05, 0.6]
                        );

                    const contentParallaxX = isMobile
                        ? 0
                        : mapRange(p, enterStart, exitEnd, 100, -100);
                    const titleParallaxX = isMobile
                        ? 0
                        : mapRange(p, enterStart, exitEnd, 200, -200);

                    if (cardRef.current) {
                        gsap.set(cardRef.current, {
                            opacity,
                            x,
                            y,
                            rotateY,
                            rotateZ,
                            z,
                            scale,
                            transformPerspective: 1000,
                            zIndex: 10 - index,
                        });
                    }

                    if (badgeRef.current) {
                        gsap.set(badgeRef.current, {
                            x: contentParallaxX,
                            translateZ: 20,
                        });
                    }

                    if (titleRef.current) {
                        gsap.set(titleRef.current, {
                            x: titleParallaxX,
                            translateZ: 40,
                        });
                    }

                    if (paraRef.current) {
                        gsap.set(paraRef.current, {
                            x: contentParallaxX,
                            translateZ: 30,
                        });
                    }

                    if (detailsRef.current) {
                        gsap.set(detailsRef.current, {
                            x: contentParallaxX,
                            translateZ: 25,
                        });
                    }

                    if (linkRef.current) {
                        gsap.set(linkRef.current, {
                            x: contentParallaxX,
                            translateZ: 35,
                        });
                    }
                },
            });

            if (cardRef.current && !isMobile) {
                cardRef.current.addEventListener("mousemove", handleMouseMove, {
                    passive: true,
                });
            }

            return () => {
                if (cardRef.current) {
                    cardRef.current.removeEventListener("mousemove", handleMouseMove);
                }
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }
            };
        }, cardRef);

        return () => ctx.revert();
    }, [index, isMobile]);

    useEffect(() => {
        if (!badgeRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.fromTo(
                            badgeRef.current,
                            { opacity: 0, y: 20 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                delay: 0.2,
                                ease: "power2.out",
                            }
                        );
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(badgeRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!circlesRef.current) return;

        gsap.to(circlesRef.current, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none",
        });

        gsap.to(circlesRef.current, {
            keyframes: [{ scale: 1 }, { scale: 1.1 }, { scale: 1 }],
            duration: 4,
            repeat: -1,
            ease: "sine.inOut",
        });
    }, []);

    return (
        <Box
            ref={cardRef}
            sx={{
                position: "absolute",
                top: { xs: 128, md: "auto" },
                width: { xs: "85vw", sm: "90vw" },
                maxWidth: "1152px", // 1152px is 6xl in tailwind
                height: { xs: "70vh", sm: "70vh", md: "70vh" },
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                overflow: "visible",
                borderRadius: { xs: 4, sm: 6 },
                bgcolor: "#0D1117",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: 24,
                transformOrigin: "center",
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
            }}
        >
            <Box
                ref={contentRef}
                sx={{
                    flex: 1,
                    p: { xs: 3, sm: 4, md: 6, lg: 8, xl: 10 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 10,
                    transformStyle: "preserve-3d",
                }}
            >
                <Box
                    ref={badgeRef}
                    sx={{
                        display: "inline-flex",
                        alignSelf: "start",
                        alignItems: "center",
                        gap: 1.5,
                        px: { xs: 1.5, sm: 2 },
                        py: 1,
                        borderRadius: 10,
                        background: skill.gradient,
                        color: "white",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        fontWeight: "bold",
                        letterSpacing: "0.05em",
                        mb: { xs: 2, sm: 3 },
                        transformStyle: "preserve-3d",
                        "& .MuiSvgIcon-root": { fontSize: "1rem" },
                    }}
                >
                    <skill.icon size={16} />
                    {skill.subtitle}
                </Box>

                <Typography
                    ref={titleRef}
                    variant="h2"
                    sx={{
                        fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem", lg: "5.5rem", xl: "7rem" },
                        fontWeight: 900,
                        mb: { xs: 2, sm: 3, md: 4 },
                        letterSpacing: "-0.05em",
                        color: "white",
                        transformStyle: "preserve-3d",
                        lineHeight: 1,
                    }}
                >
                    {skill.title}
                </Typography>

                <Typography
                    ref={paraRef}
                    variant="body1"
                    sx={{
                        fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                        color: "rgba(156, 163, 175, 1)", // gray-400
                        lineHeight: 1.6,
                        mb: { xs: 3, sm: 4, md: 6 },
                        maxWidth: "672px",
                        transformStyle: "preserve-3d",
                    }}
                >
                    {skill.description}
                </Typography>

                <Box
                    ref={detailsRef}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 2,
                        mb: { xs: 3, sm: 4, md: 6 },
                        transformStyle: "preserve-3d",
                    }}
                >
                    {skill.details.map((detail, i) => (
                        <Stack
                            key={i}
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{ color: "rgba(209, 213, 219, 1)" }}
                        >
                            <Box
                                sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    background: skill.gradient,
                                    flexShrink: 0,
                                }}
                            />
                            <Typography variant="body2" sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                                {detail}
                            </Typography>
                        </Stack>
                    ))}
                </Box>

                <Box ref={linkRef} sx={{ transformStyle: "preserve-3d" }}>
                    <Link
                        href="#contact"
                        style={{ textDecoration: "none" }}
                    >
                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            sx={{
                                color: skill.color,
                                fontSize: { xs: "1rem", sm: "1.125rem" },
                                fontWeight: "bold",
                                transition: "all 0.3s ease",
                                "&:hover": { gap: 3 },
                                cursor: "pointer",
                            }}
                        >
                            <Typography variant="button" sx={{ textTransform: "none", fontWeight: "bold" }}>Start Project</Typography>
                            <ArrowRight size={24} />
                        </Stack>
                    </Link>
                </Box>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    position: "relative",
                    display: { xs: "none", lg: "block" },
                    overflow: "visible",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: skill.gradient,
                        opacity: 0.1,
                        borderRadius: { xs: 4, sm: 6 },
                        overflow: "hidden",
                    }}
                />

                <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Box
                        sx={{
                            position: "relative",
                            width: 384,
                            height: 384,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        <Box ref={circlesRef} sx={{ position: "absolute", inset: 0 }}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    border: "2px dashed rgba(255, 255, 255, 0.2)",
                                    borderRadius: "50%",
                                }}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: 48,
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: "50%",
                                }}
                            />
                        </Box>

                        <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <skill.icon
                                size={192}
                                color="white"
                                strokeWidth={1}
                                style={{ filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))" }}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to left, transparent, #0D1117)",
                    }}
                />
            </Box>
        </Box>
    );
}

function NavigationDot({ skill, index, containerRef }: { skill: typeof skillsData[0], index: number, containerRef: React.RefObject<HTMLElement | null> }) {
    const dotRef = useRef<HTMLDivElement>(null);
    const rangeStart = index * 0.2;
    const rangeEnd = index * 0.2 + 0.2;

    const lerp = (start: number, end: number, t: number) =>
        start + (end - start) * t;

    useEffect(() => {
        if (!dotRef.current || !containerRef.current) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom-=300vh top",
                scrub: true,
                onUpdate: (self) => {
                    if (!dotRef.current) return;

                    const p = self.progress;

                    const centerProgress = (rangeStart + rangeEnd) / 2;
                    const distanceFromCenter = Math.abs(p - centerProgress);
                    const maxDistance = (rangeEnd - rangeStart) / 2;

                    const mappedProgress = Math.max(
                        0,
                        Math.min(1, 1 - distanceFromCenter / maxDistance)
                    );

                    const easedProgress = Math.pow(mappedProgress, 0.7);

                    const scale = lerp(1, 1.5, easedProgress);

                    const skillColor = skill.color.startsWith("#") ? skill.color : "#FFFFFF";
                    const r1 = parseInt(skillColor.slice(1, 3), 16);
                    const g1 = parseInt(skillColor.slice(3, 5), 16);
                    const b1 = parseInt(skillColor.slice(5, 7), 16);

                    const r = Math.round(lerp(255, r1, easedProgress));
                    const g = Math.round(lerp(255, g1, easedProgress));
                    const b = Math.round(lerp(255, b1, easedProgress));
                    const a = lerp(0.2, 1, easedProgress);

                    const backgroundColor = `rgba(${r},${g},${b},${a})`;

                    gsap.set(dotRef.current, {
                        scale: scale,
                        backgroundColor: backgroundColor,
                    });
                },
            });
        }, dotRef);

        return () => ctx.revert();
    }, [index, skill.color]);

    return (
        <Box sx={{ position: "relative", "&:hover .label": { opacity: 1 } }}>
            <Box
                ref={dotRef}
                sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                }}
            />
            <Box
                className="label"
                sx={{
                    position: "absolute",
                    bottom: "100%",
                    mb: 2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    bgcolor: "black",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    fontSize: "10px",
                    fontFamily: "monospace",
                    whiteSpace: "nowrap",
                    color: "white",
                    pointerEvents: "none",
                }}
            >
                {skill.title}
            </Box>
        </Box>
    );
}

function ScrollingBackgroundTextWrapper({
    containerRef,
    children,
    className,
    style,
}: {
    containerRef: React.RefObject<HTMLElement | null>;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const scrollTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom-=400vh top",
            scrub: true,
            onUpdate: (self) => {
                setProgress(self.progress);
            },
        });

        return () => {
            scrollTrigger.kill();
        };
    }, [containerRef]);

    return (
        <ScrollingBackgroundText
            progress={progress}
            className={className}
            style={style}
        >
            {children}
        </ScrollingBackgroundText>
    );
}

export default function Technologies() {
    const containerRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const { currentTheme } = useBackground();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <Box
            component="section"
            id="technologies"
            ref={containerRef}
            sx={{ position: "relative", height: "800vh", width: "100%" }}
        >
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#000",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        bottom: { xs: 24, sm: 48 },
                        left: { xs: 16, sm: "50%" },
                        transform: { sm: "translateX(-50%)" },
                        zIndex: 50,
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 1.5, sm: 2 },
                        bgcolor: "rgba(0, 0, 0, 0.4)",
                        backdropFilter: "blur(12px)",
                        px: { xs: 2, sm: 3 },
                        py: { xs: 1, sm: 1.5 },
                        borderRadius: 10,
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        maxWidth: "calc(100vw - 2rem)",
                        overflowX: "auto",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {skillsData.map((skill, index) => (
                        <NavigationDot
                            key={skill.id}
                            skill={skill}
                            index={index}
                            containerRef={containerRef}
                        />
                    ))}
                </Box>

                <ScrollingBackgroundTextWrapper
                    containerRef={containerRef}
                    className="stroke-text"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        height: "100%",
                        lineHeight: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        whiteSpace: "nowrap",
                        fontSize: isMobile ? "15vh" : "30vw",
                        fontWeight: 900,
                        color: "transparent",
                        WebkitTextStroke: "2px rgba(255,255,255,0.08)",
                        userSelect: "none",
                        pointerEvents: "none",
                        left: 0,
                        opacity: isMobile ? 0.5 : 1,
                    }}
                >
                    CODE &bull; COFFEE &bull;{" "}
                    <Box component="span" sx={{ color: `${currentTheme.primary}1A`, WebkitTextStroke: "0px" }}>
                        INNOVATION
                    </Box>{" "}
                    &bull; CREATIVITY &bull;{" "}
                    <Box component="span" sx={{ color: `${currentTheme.primary}1A`, WebkitTextStroke: "0px" }}>
                        PASSION &bull;
                    </Box>{" "}
                </ScrollingBackgroundTextWrapper>

                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        perspective: "2000px",
                        overflow: "visible",
                    }}
                >
                    {skillsData.map((skill, index) => (
                        <SkillCard
                            key={skill.id}
                            skill={skill}
                            index={index}
                            isMobile={isMobile}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
