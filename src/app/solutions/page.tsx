"use client";

import { Container, Typography, Box, Grid, Card, CardContent, Chip, Stack, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import {
    FitnessCenter,
    School,
    ShoppingCart,
    LocalHospital,
    Restaurant,
    Home,
    AccountBalance,
    Hotel,
    TrendingUp,
    Speed,
    AttachMoney,
    CheckCircle,
    ArrowForward,
    Star
} from "@mui/icons-material";
import CTA from "@/components/CTA";
import { useBackground } from "@/context/BackgroundContext";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const solutions = [
    {
        id: 1,
        title: "Gym & Fitness Management",
        icon: FitnessCenter,
        description: "Complete digital transformation for gyms and fitness centers with member management, automated billing, and AI-powered workout tracking.",
        features: ["Member Portal", "Automated Billing", "Workout Tracking", "Attendance System", "Nutrition Plans", "Mobile App"],
        results: "40% increase in member retention, 60% reduction in admin time",
        color: "#FF6B6B"
    },
    {
        id: 2,
        title: "School Management System",
        icon: School,
        description: "Comprehensive ERP for schools with student information system, online classes, fee management, and parent-teacher communication.",
        features: ["Student Portal", "Online Classes", "Fee Management", "Attendance Tracking", "Report Cards", "Parent App"],
        results: "50% faster administrative processes, 90% parent satisfaction",
        color: "#4ECDC4"
    },
    {
        id: 3,
        title: "E-commerce Platform",
        icon: ShoppingCart,
        description: "AI-powered e-commerce solutions with intelligent product recommendations, inventory management, and automated marketing.",
        features: ["Smart Recommendations", "Inventory AI", "Multi-vendor", "Payment Gateway", "Analytics Dashboard", "Mobile Commerce"],
        results: "3x increase in sales, 70% reduction in cart abandonment",
        color: "#95E1D3"
    },
    {
        id: 4,
        title: "Healthcare Management",
        icon: LocalHospital,
        description: "HIPAA-compliant healthcare systems with patient records, appointment scheduling, telemedicine, and billing automation.",
        features: ["Patient Portal", "Telemedicine", "EMR/EHR", "Appointment System", "Billing Automation", "Lab Integration"],
        results: "60% faster patient check-in, 99.9% data accuracy",
        color: "#F38181"
    },
    {
        id: 5,
        title: "Restaurant & Food Service",
        icon: Restaurant,
        description: "Complete restaurant management with online ordering, kitchen automation, inventory tracking, and delivery integration.",
        features: ["Online Ordering", "Kitchen Display", "Inventory Management", "Delivery Integration", "Table Booking", "POS System"],
        results: "45% increase in online orders, 35% cost savings",
        color: "#AA96DA"
    },
    {
        id: 6,
        title: "Real Estate Platform",
        icon: Home,
        description: "Smart property management with virtual tours, automated lead generation, CRM, and document management.",
        features: ["Virtual Tours", "Lead Management", "Property Listings", "Document Automation", "Client Portal", "Analytics"],
        results: "50% more qualified leads, 40% faster closings",
        color: "#FCBAD3"
    },
    {
        id: 7,
        title: "Banking & Finance",
        icon: AccountBalance,
        description: "Secure fintech solutions with AI fraud detection, automated compliance, digital banking, and investment platforms.",
        features: ["Fraud Detection", "Digital Banking", "Compliance Automation", "Investment Platform", "Mobile Banking", "Analytics"],
        results: "99.8% fraud prevention, 80% faster transactions",
        color: "#FFFFD2"
    },
    {
        id: 8,
        title: "Hotel Management",
        icon: Hotel,
        description: "End-to-end hotel management with booking engine, PMS, housekeeping automation, and guest experience platform.",
        features: ["Booking Engine", "PMS Integration", "Housekeeping", "Guest Portal", "Revenue Management", "Mobile Check-in"],
        results: "35% increase in direct bookings, 90% guest satisfaction",
        color: "#A8D8EA"
    }
];

const caseStudies = [
    {
        client: "FitZone Gym Chain",
        industry: "Fitness",
        challenge: "Managing 15 locations with manual processes, high member churn",
        solution: "Implemented AI-powered gym management system with mobile app",
        results: ["40% reduction in churn", "3x faster check-ins", "60% less admin work"],
        testimonial: "The system transformed our operations. Member satisfaction is at an all-time high!",
        avatar: "F"
    },
    {
        client: "Bright Future Academy",
        industry: "Education",
        challenge: "Paper-based processes, poor parent communication, manual fee collection",
        solution: "Deployed comprehensive school ERP with parent portal and online payments",
        results: ["90% parent engagement", "100% digital records", "50% faster fee collection"],
        testimonial: "Parents love the app! We've eliminated all paperwork and saved countless hours.",
        avatar: "B"
    },
    {
        client: "MediCare Hospital",
        industry: "Healthcare",
        challenge: "Long patient wait times, manual record keeping, billing errors",
        solution: "Integrated EMR system with automated billing and patient portal",
        results: ["60% faster check-in", "Zero billing errors", "95% patient satisfaction"],
        testimonial: "Our patients are happier, and our staff is more productive. It's a win-win!",
        avatar: "M"
    }
];

export default function SolutionsPage() {
    const { currentTheme } = useBackground();

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
                        Industry Solutions
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
                            mb: 2
                        }}
                    >
                        Tailored technology solutions for every industry
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "rgba(255, 255, 255, 0.5)",
                            maxWidth: "800px",
                            mx: "auto",
                            lineHeight: 1.7,
                            position: "relative",
                            zIndex: 1
                        }}
                    >
                        From gyms to schools, e-commerce to healthcare—we build custom solutions that solve real business problems
                    </Typography>
                </MotionBox>

                {/* Solutions Grid */}
                <Grid container spacing={3} sx={{ mb: { xs: 8, md: 12 } }}>
                    {solutions.map((solution, index) => (
                        <Grid key={solution.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <MotionCard
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                sx={{
                                    height: "100%",
                                    bgcolor: "rgba(30, 41, 59, 0.4)",
                                    backdropFilter: "blur(12px)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    borderRadius: 4,
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "translateY(-10px)",
                                        borderColor: solution.color,
                                        boxShadow: `0 20px 40px -10px ${solution.color}44`,
                                        "& .solution-icon": {
                                            bgcolor: solution.color,
                                            color: "white",
                                            transform: "scale(1.1) rotate(5deg)"
                                        }
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
                                    <Box
                                        className="solution-icon"
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 3,
                                            bgcolor: `${solution.color}22`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mb: 2,
                                            transition: "all 0.3s ease",
                                            border: `2px solid ${solution.color}44`
                                        }}
                                    >
                                        <solution.icon sx={{ fontSize: 30, color: solution.color }} />
                                    </Box>

                                    <Typography variant="h6" sx={{ fontWeight: 700, color: "white", mb: 1.5 }}>
                                        {solution.title}
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.7, mb: 2, flexGrow: 1 }}>
                                        {solution.description}
                                    </Typography>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 600, mb: 1, display: "block" }}>
                                            Key Features:
                                        </Typography>
                                        <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5 }}>
                                            {solution.features.slice(0, 3).map((feature, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={feature}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: "rgba(255, 255, 255, 0.05)",
                                                        color: "rgba(255, 255, 255, 0.7)",
                                                        fontSize: "0.65rem",
                                                        height: 20
                                                    }}
                                                />
                                            ))}
                                        </Stack>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            color: solution.color,
                                            fontWeight: 600,
                                            fontSize: "0.85rem",
                                            mt: "auto"
                                        }}
                                    >
                                        <Typography variant="caption" sx={{ color: solution.color, fontWeight: 700 }}>
                                            Learn More
                                        </Typography>
                                        <ArrowForward sx={{ fontSize: 16, ml: 0.5 }} />
                                    </Box>
                                </CardContent>
                            </MotionCard>
                        </Grid>
                    ))}
                </Grid>

                {/* CTA Section */}
                <Box sx={{ mb: { xs: 8, md: 12 } }}>
                    <CTA />
                </Box>

                {/* Case Studies Section */}
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
                            mb: 2,
                            textAlign: "center",
                            color: "white",
                            fontSize: { xs: "2rem", md: "3rem" }
                        }}
                    >
                        Success <span style={{ color: currentTheme.primary }}>Stories</span>
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "rgba(255, 255, 255, 0.6)",
                            textAlign: "center",
                            maxWidth: "700px",
                            mx: "auto",
                            mb: 6
                        }}
                    >
                        Real results from real businesses across different industries
                    </Typography>

                    <Grid container spacing={4}>
                        {caseStudies.map((study, index) => (
                            <Grid key={index} size={{ xs: 12, md: 4 }}>
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
                                        borderRadius: 6,
                                        p: 4,
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            borderColor: currentTheme.primary,
                                            transform: "translateY(-5px)"
                                        }
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                        <Avatar
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                bgcolor: currentTheme.primary,
                                                fontWeight: 700,
                                                fontSize: "1.5rem",
                                                mr: 2
                                            }}
                                        >
                                            {study.avatar}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
                                                {study.client}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                                                {study.industry}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" sx={{ color: currentTheme.primary, fontWeight: 700, textTransform: "uppercase" }}>
                                            Challenge
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.7, mb: 2 }}>
                                            {study.challenge}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" sx={{ color: currentTheme.secondary, fontWeight: 700, textTransform: "uppercase" }}>
                                            Solution
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.7, mb: 2 }}>
                                            {study.solution}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="caption" sx={{ color: "#22C55E", fontWeight: 700, textTransform: "uppercase", mb: 1, display: "block" }}>
                                            Results
                                        </Typography>
                                        {study.results.map((result, idx) => (
                                            <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                                                <CheckCircle sx={{ fontSize: 16, color: "#22C55E", mr: 1 }} />
                                                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                                                    {result}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>

                                    <Box
                                        sx={{
                                            mt: 3,
                                            pt: 3,
                                            borderTop: "1px solid rgba(255, 255, 255, 0.08)"
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", fontStyle: "italic", lineHeight: 1.7 }}>
                                            &quot;{study.testimonial}&quot;
                                        </Typography>
                                    </Box>
                                </MotionCard>
                            </Grid>
                        ))}
                    </Grid>
                </MotionBox>

                {/* Benefits Section */}
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
                        Why Choose Our <span style={{ color: currentTheme.primary }}>Solutions?</span>
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Box sx={{ textAlign: "center" }}>
                                <Speed sx={{ fontSize: 50, color: currentTheme.primary, mb: 2 }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: "white", mb: 1 }}>
                                    Fast Implementation
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.7 }}>
                                    Go live in 4-8 weeks with our proven deployment process
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Box sx={{ textAlign: "center" }}>
                                <AttachMoney sx={{ fontSize: 50, color: currentTheme.primary, mb: 2 }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: "white", mb: 1 }}>
                                    Cost-Effective
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.7 }}>
                                    Save 40-60% compared to traditional software solutions
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Box sx={{ textAlign: "center" }}>
                                <TrendingUp sx={{ fontSize: 50, color: currentTheme.primary, mb: 2 }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: "white", mb: 1 }}>
                                    Scalable
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.7 }}>
                                    Grow from 10 to 10,000 users without performance issues
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Box sx={{ textAlign: "center" }}>
                                <CheckCircle sx={{ fontSize: 50, color: currentTheme.primary, mb: 2 }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: "white", mb: 1 }}>
                                    24/7 Support
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.7 }}>
                                    Round-the-clock support to keep your business running
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
