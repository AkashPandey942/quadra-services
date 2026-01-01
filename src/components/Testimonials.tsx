"use client";

import { Box, Container, Typography, Card, CardContent, Avatar, Rating, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack } from "@mui/material";
import { motion } from "framer-motion";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { useBackground } from "@/context/BackgroundContext";

// Testimonial interface with MongoDB fields
// Testimonial interface with MongoDB fields
interface Testimonial {
  _id: string; // MongoDB uses _id
  name: string;
  role: string;
  company: string;
  testimonial: string;
  rating: number;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

export default function Testimonials() {
  const { currentTheme } = useBackground();
  const [approvedTestimonials, setApprovedTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    company: "",
    testimonial: "",
    rating: 5,
  });

  // Fetch approved testimonials from API on mount
  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials");
      if (response.ok) {
        const data = await response.json();
        setApprovedTestimonials(data);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Calculate average rating (only approved reviews)
  const averageRating = approvedTestimonials.length > 0
    ? approvedTestimonials.reduce((acc, t) => acc + t.rating, 0) / approvedTestimonials.length
    : 4.9;
  const totalReviews = 150 + approvedTestimonials.length;

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Handle dialog open/close
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewReview({
      name: "",
      role: "",
      company: "",
      testimonial: "",
      rating: 5,
    });
  };

  // Handle form submission via API
  const handleSubmitReview = async () => {
    if (!newReview.name || !newReview.role || !newReview.company || !newReview.testimonial) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        alert("✅ Thank you for your review!\n\nYour review is pending approval and will be visible on our website once approved by our team.");
        handleCloseDialog();
      } else {
        const data = await response.json();
        alert(`❌ Error: ${data.error || "Failed to submit testimonial"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <Box
      id="testimonials"
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
          top: "20%",
          left: "-10%",
          width: "50%",
          height: "50%",
          background: `radial-gradient(circle, ${currentTheme.secondary}11 0%, transparent 70%)`,
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: "left", pl: { md: 4 } }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 900,
              mb: 1.5,
              color: "white",
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              lineHeight: 1.1,
            }}
          >
            Real Stories from <span style={{ color: currentTheme.primary }}>Our Partners</span>
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Rating
                value={averageRating}
                precision={0.1}
                readOnly
                size="large"
                sx={{ color: currentTheme.primary }}
                aria-label={`Average rating: ${averageRating.toFixed(1)} out of 5 stars`}
              />
              <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
                {averageRating.toFixed(1)}/5
              </Typography>
            </Box>
            <Chip
              label={`${totalReviews}+ Happy Clients`}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.05)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontWeight: 600
              }}
              aria-label={`${totalReviews} happy clients`}
            />
          </Stack>

          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            aria-label="Open dialog to share your experience and testimonial"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              bgcolor: currentTheme.primary,
              color: "white",
              fontWeight: 700,
              fontSize: "0.95rem",
              textTransform: "none",
              boxShadow: `0 10px 20px -5px ${currentTheme.primary}66`,
              "&:hover": {
                bgcolor: currentTheme.primary,
                filter: "brightness(1.1)",
                transform: "translateY(-3px)",
                boxShadow: `0 15px 25px -5px ${currentTheme.primary}88`,
              },
              "&:focus-visible": {
                outline: "2px solid #E91E63",
                outlineOffset: 2,
              },
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
          >
            Share Your Experience
          </Button>
        </Box>

        {/* Testimonial Cards */}
        <Box component="section" sx={{ display: "grid", gap: { xs: 3, sm: 3.5, md: 4 }, px: { xs: 2, sm: 2, md: 4 }, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)" } }}>
          {loading ? (
            <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 8 }}>
              <Typography sx={{ color: "rgba(255, 255, 255, 0.5)" }}>Loading reviews...</Typography>
            </Box>
          ) : approvedTestimonials.length === 0 ? (
            <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 8 }}>
              <Typography sx={{ color: "rgba(255, 255, 255, 0.5)" }}>No reviews found.</Typography>
            </Box>
          ) : (
            approvedTestimonials.map((testimonial, index) => (
              <Box key={testimonial._id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ height: "100%" }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      bgcolor: "rgba(30, 41, 59, 0.4)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: 6,
                      overflow: "visible",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "&:hover": {
                        transform: { xs: "none", md: "translateY(-10px)" },
                        borderColor: currentTheme.primary,
                        boxShadow: { xs: "none", md: `0 20px 40px -10px ${currentTheme.primary}33` },
                        "& .quote-icon": {
                          bgcolor: { xs: "rgba(255, 255, 255, 0.05)", md: currentTheme.primary },
                          transform: { xs: "none", md: "scale(1.1) rotate(15deg)" },
                        }
                      },
                    }}
                    elevation={0}
                  >
                    {/* Quote Icon */}
                    <Box
                      className="quote-icon"
                      sx={{
                        position: "absolute",
                        top: -15,
                        right: 30,
                        width: 50,
                        height: 50,
                        borderRadius: "15px",
                        bgcolor: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.4s ease",
                        zIndex: 2,
                      }}
                    >
                      <FormatQuoteIcon sx={{ color: "white", fontSize: 28 }} />
                    </Box>

                    <CardContent sx={{ p: { xs: 3, md: 5 }, flexGrow: 1 }}>
                      <Rating
                        value={testimonial.rating}
                        readOnly
                        sx={{ mb: 2.5, color: currentTheme.primary }}
                      />

                      <Typography
                        variant="body1"
                        sx={{
                          mb: 4,
                          lineHeight: 1.8,
                          color: "rgba(255, 255, 255, 0.7)",
                          fontSize: { xs: "0.95rem", md: "1.1rem" },
                          fontStyle: "italic",
                        }}
                      >
                        {testimonial.testimonial}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 'auto' }}>
                        <Avatar
                          sx={{
                            bgcolor: currentTheme.primary,
                            color: "white",
                            width: 60,
                            height: 60,
                            fontWeight: 700,
                            border: "2px solid rgba(255, 255, 255, 0.1)",
                            fontSize: "1.2rem",
                          }}
                        >
                          {getInitials(testimonial.name)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ color: "white", fontWeight: 800 }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 500 }}>
                            {testimonial.role} @ {testimonial.company}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))
          )}
        </Box>

        {/* Add Review Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          aria-labelledby="testimonial-dialog-title"
          aria-describedby="testimonial-dialog-description"
          PaperProps={{
            sx: {
              bgcolor: "#0f172a",
              backgroundImage: "none",
              borderRadius: 6,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: `0 24px 48px -12px rgba(0,0,0,0.5)`,
              maxHeight: { xs: "90vh", sm: "auto" },
              margin: { xs: 2, sm: "auto" },
            }
          }}
        >
          <DialogTitle
            id="testimonial-dialog-title"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.5rem", sm: "1.75rem" },
              color: "white",
              pt: 4,
              px: 4
            }}
          >
            Share Your Experience
          </DialogTitle>
          <DialogContent sx={{ px: 4 }}>
            <Typography
              id="testimonial-dialog-description"
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                mb: 4,
                fontSize: { xs: "0.9rem", sm: "1rem" }
              }}
            >
              Your feedback helps us build better solutions for the community.
            </Typography>
            <Stack spacing={3}>
              <TextField
                label="Your Name"
                fullWidth
                variant="filled"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
                aria-required="true"
                sx={{
                  "& .MuiFilledInput-root": { bgcolor: "rgba(255, 255, 255, 0.03)", color: "white" },
                  "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.4)" },
                  "& .MuiFilledInput-root.Mui-focused": {
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                  }
                }}
              />
              <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" } }}>
                <Box>
                  <TextField
                    label="Role"
                    fullWidth
                    variant="filled"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    required
                    aria-required="true"
                    sx={{
                      "& .MuiFilledInput-root": { bgcolor: "rgba(255, 255, 255, 0.03)", color: "white" },
                      "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.4)" },
                      "& .MuiFilledInput-root.Mui-focused": {
                        bgcolor: "rgba(255, 255, 255, 0.05)",
                      }
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    label="Company"
                    fullWidth
                    variant="filled"
                    value={newReview.company}
                    onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                    required
                    aria-required="true"
                    sx={{
                      "& .MuiFilledInput-root": { bgcolor: "rgba(255, 255, 255, 0.03)", color: "white" },
                      "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.4)" },
                      "& .MuiFilledInput-root.Mui-focused": {
                        bgcolor: "rgba(255, 255, 255, 0.05)",
                      }
                    }}
                  />
                </Box>
              </Box>
              <TextField
                label="Your Testimonial"
                fullWidth
                multiline
                rows={4}
                variant="filled"
                value={newReview.testimonial}
                onChange={(e) => setNewReview({ ...newReview, testimonial: e.target.value })}
                required
                aria-required="true"
                sx={{
                  "& .MuiFilledInput-root": { bgcolor: "rgba(255, 255, 255, 0.03)", color: "white" },
                  "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.4)" },
                  "& .MuiFilledInput-root.Mui-focused": {
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                  }
                }}
              />
              <Box>
                <Typography sx={{ color: "rgba(255, 255, 255, 0.6)", mb: 1, fontWeight: 600 }}>Rating</Typography>
                <Rating
                  value={newReview.rating}
                  onChange={(e, value) => setNewReview({ ...newReview, rating: value || 5 })}
                  size="large"
                  sx={{ color: currentTheme.primary }}
                  aria-label="Select your rating out of 5 stars"
                />
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 4, gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <Button
              onClick={handleCloseDialog}
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                fontWeight: 600,
                textTransform: 'none',
                order: { xs: 2, sm: 1 },
                width: { xs: "100%", sm: "auto" }
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              variant="contained"
              sx={{
                px: 4,
                borderRadius: 2,
                bgcolor: currentTheme.primary,
                fontWeight: 700,
                textTransform: 'none',
                "&:hover": { bgcolor: currentTheme.primary, filter: "brightness(1.1)" },
                "&:focus-visible": {
                  outline: "2px solid #E91E63",
                  outlineOffset: 2,
                },
                order: { xs: 1, sm: 2 },
                width: { xs: "100%", sm: "auto" }
              }}
            >
              Submit Review
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
