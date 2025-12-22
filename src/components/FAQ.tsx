"use client";

import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Button, useTheme, Zoom } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { useBackground } from "@/context/BackgroundContext";

const faqs = [
    {
        question: "What is the typical project timeline?",
        answer: "Simple websites: 2-3 weeks. Complex applications: 2-4 months. We provide detailed timeline during consultation.",
    },
    {
        question: "Do you provide maintenance after project completion?",
        answer: "Yes, all projects include 3-6 months free maintenance. Extended support plans available.",
    },
    {
        question: "Can you work with our existing website/app?",
        answer: "Absolutely! We specialize in integrating with existing systems and modernizing legacy applications.",
    },
    {
        question: "What are your payment terms?",
        answer: "Typically 40% advance, 40% on milestone completion, 20% on delivery. Flexible terms for long-term contracts.",
    },
    {
        question: "Do you sign NDA?",
        answer: "Yes, we sign NDA and ensure complete confidentiality of your project.",
    },
    {
        question: "Can we hire developers on a monthly basis?",
        answer: "Yes, we offer flexible hiring models - hourly, monthly, or project-based.",
    },
    {
        question: "Do you provide source code?",
        answer: "Yes, complete source code with documentation is provided upon project completion.",
    },
    {
        question: "What if I need changes after the project is live?",
        answer: "Minor changes are covered in maintenance. Major feature additions can be discussed separately.",
    },
];

export default function FAQ() {
    const theme = useTheme();
    const { currentTheme } = useBackground();
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box
            id="faq"
            sx={{
                py: { xs: 8, md: 12 },
                bgcolor: "#020617",
                overflow: "hidden",
                position: "relative",
                zIndex: 2,
            }}
        >
            {/* Background Decorative Elements */}
            <Box
                sx={{
                    position: "absolute",
                    top: "10%",
                    right: "-5%",
                    width: "40%",
                    height: "40%",
                    background: `radial-gradient(circle, ${currentTheme.primary}11 0%, transparent 70%)`,
                    filter: "blur(120px)",
                    zIndex: 0,
                }}
            />

            <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
                {/* Header */}
                <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: "left", pl: { md: 2 } }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            mb: 1.5,
                            color: "white",
                            fontSize: { xs: "2.2rem", md: "3rem" },
                            lineHeight: 1.1,
                        }}
                    >
                        Expert Answers to <span style={{ color: currentTheme.primary }}>Common Questions</span>
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "rgba(255, 255, 255, 0.5)",
                            maxWidth: 700,
                            fontWeight: 400,
                            fontSize: { xs: "0.95rem", md: "1.05rem" },
                            lineHeight: 1.6,
                        }}
                    >
                        Find clear, concise answers to help you understand our process and what to expect when partnering with Quadra Services.
                    </Typography>
                </Box>

                {/* FAQ Accordions */}
                <Box>
                    {faqs.map((faq, index) => {
                        const panelId = `panel${index}`;
                        const isExpanded = expanded === panelId;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                <Accordion
                                    expanded={isExpanded}
                                    onChange={handleChange(panelId)}
                                    sx={{
                                        mb: 2,
                                        borderRadius: "16px !important",
                                        bgcolor: isExpanded ? "rgba(30, 41, 59, 0.6)" : "rgba(30, 41, 59, 0.3)",
                                        backdropFilter: "blur(12px)",
                                        border: "1px solid",
                                        borderColor: isExpanded ? currentTheme.primary : "rgba(255, 255, 255, 0.08)",
                                        boxShadow: isExpanded ? `0 8px 32px -10px ${currentTheme.primary}33` : "none",
                                        "&:before": { display: "none" },
                                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        overflow: "hidden",
                                    }}
                                    elevation={0}
                                >
                                    <AccordionSummary
                                        expandIcon={
                                            <ExpandMoreIcon
                                                sx={{
                                                    color: isExpanded ? currentTheme.primary : "rgba(255, 255, 255, 0.4)",
                                                    fontSize: 28,
                                                    transition: "color 0.4s ease",
                                                }}
                                            />
                                        }
                                        sx={{
                                            py: 1,
                                            px: { xs: 2.5, md: 4 },
                                            "& .MuiAccordionSummary-content": { my: 1.5 },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: { xs: "1rem", md: "1.15rem" },
                                                fontWeight: isExpanded ? 700 : 500,
                                                color: isExpanded ? "white" : "rgba(255, 255, 255, 0.8)",
                                                transition: "all 0.3s ease",
                                            }}
                                        >
                                            {faq.question}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        sx={{
                                            px: { xs: 2.5, md: 4 },
                                            pb: 4,
                                            pt: 0,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                lineHeight: 1.8,
                                                fontSize: { xs: "0.9rem", md: "1rem" },
                                                color: "rgba(255, 255, 255, 0.6)",
                                            }}
                                        >
                                            {faq.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </motion.div>
                        );
                    })}
                </Box>

                {/* Custom CTA */}
                <Box
                    sx={{
                        mt: 6,
                        p: { xs: 3, md: 6 },
                        borderRadius: 6,
                        bgcolor: "rgba(255, 255, 255, 0.02)",
                        border: "1px dashed rgba(255, 255, 255, 0.1)",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Typography variant="h5" sx={{ color: "white", fontWeight: 700, mb: 1.5 }}>
                        Still have questions?
                    </Typography>
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.5)", mb: 4, maxWidth: 450, mx: "auto" }}>
                        We're here to help you navigate your digital transformation journey with confidence.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            px: 4,
                            py: 1.8,
                            borderRadius: 3,
                            bgcolor: currentTheme.primary,
                            color: "white",
                            fontWeight: 700,
                            fontSize: "1rem",
                            textTransform: "none",
                            boxShadow: `0 10px 20px -5px ${currentTheme.primary}66`,
                            "&:hover": {
                                bgcolor: currentTheme.primary,
                                filter: "brightness(1.1)",
                                transform: "translateY(-3px)",
                                boxShadow: `0 15px 25px -5px ${currentTheme.primary}88`,
                            },
                            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        }}
                    >
                        Schedule a Consultation
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
