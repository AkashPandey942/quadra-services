"use client";

import { useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Chip,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Rating,
    Stack,
    Tabs,
    Tab,
    Avatar,
    IconButton,
    AppBar,
    Toolbar,
    Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Testimonial {
    _id: string; // MongoDB uses _id
    name: string;
    role: string;
    company: string;
    testimonial: string;
    rating: number;
    date: string;
    status: 'approved' | 'pending' | 'rejected';
    submittedAt?: string;
}

export default function AdminReviewsPage() {
    const [allReviews, setAllReviews] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const [editDialog, setEditDialog] = useState(false);
    const [editingReview, setEditingReview] = useState<Testimonial | null>(null);

    // Load all reviews from API
    const loadReviews = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/admin/testimonials");
            if (response.ok) {
                const data = await response.json();
                setAllReviews(data);
            }
        } catch (error) {
            console.error("Error loading reviews:", error);
            alert("Failed to load reviews from database.");
        } finally {
            setLoading(false);
        }
    };

    // Load reviews on mount
    useEffect(() => {
        loadReviews();
    }, []);

    // Handle logout using API
    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/admin/login";
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // Update review (Approve/Reject/Edit)
    const updateReview = async (id: string, updateData: Partial<Testimonial>) => {
        try {
            const response = await fetch("/api/admin/testimonials", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...updateData }),
            });

            if (response.ok) {
                loadReviews();
                return true;
            } else {
                const data = await response.json();
                alert(`Error: ${data.error}`);
                return false;
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Failed to update review.");
            return false;
        }
    };

    // Approve review
    const handleApprove = async (review: Testimonial) => {
        if (await updateReview(review._id, { status: 'approved' })) {
            alert("✅ Review approved!");
        }
    };

    // Reject review
    const handleReject = async (review: Testimonial) => {
        if (await updateReview(review._id, { status: 'rejected' })) {
            alert("❌ Review rejected!");
        }
    };

    // Delete review permanently
    const handleDelete = async (review: Testimonial) => {
        if (!confirm("Are you sure you want to permanently delete this review?")) return;

        try {
            const response = await fetch(`/api/admin/testimonials?id=${review._id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                loadReviews();
                alert("🗑️ Review deleted!");
            } else {
                alert("Failed to delete review.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete review.");
        }
    };

    // Open edit dialog
    const handleEdit = (review: Testimonial) => {
        setEditingReview(review);
        setEditDialog(true);
    };

    // Save edited review
    const handleSaveEdit = async () => {
        if (!editingReview) return;

        const { _id, ...data } = editingReview;
        if (await updateReview(_id, data)) {
            setEditDialog(false);
            setEditingReview(null);
            alert("✅ Review updated!");
        }
    };

    // Filter reviews by tab
    const getFilteredReviews = () => {
        switch (currentTab) {
            case 0: return allReviews; // All
            case 1: return allReviews.filter(r => r.status === 'pending'); // Pending
            case 2: return allReviews.filter(r => r.status === 'approved'); // Approved
            case 3: return allReviews.filter(r => r.status === 'rejected'); // Rejected
            default: return allReviews;
        }
    };

    const filteredReviews = getFilteredReviews();

    // Get status color
    const getStatusColor = (status: Testimonial['status']): 'success' | 'warning' | 'error' | 'default' => {
        switch (status) {
            case 'approved': return 'success';
            case 'pending': return 'warning';
            case 'rejected': return 'error';
            default: return 'default';
        }
    };

    // Get initials
    const getInitials = (name: string) => {
        return name.split(" ").map(n => n[0]).join("").toUpperCase();
    };

    // Admin dashboard
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#020617" }}>
            {/* Header */}
            {/* Header */}
            <AppBar position="static" sx={{ bgcolor: "rgba(30, 41, 59, 0.8)", backdropFilter: "blur(12px)" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: "white" }}>
                        Review Management
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            color="inherit"
                            onClick={loadReviews}
                            disabled={loading}
                            sx={{ textTransform: "none", color: "white" }}
                        >
                            {loading ? "Loading..." : "Refresh"}
                        </Button>
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            sx={{ textTransform: "none", color: "white" }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Stats */}
                <Box sx={{ display: 'grid', gap: 3, mb: 4, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' } }}>
                    <Paper sx={{ p: 3, bgcolor: "rgba(30, 41, 59, 0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 2 }}>
                        <Typography variant="h4" fontWeight="bold" sx={{ color: "#F59E0B" }}>
                            {allReviews.filter(r => r.status === 'pending').length}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                            Pending Reviews
                        </Typography>
                    </Paper>
                    <Paper sx={{ p: 3, bgcolor: "rgba(30, 41, 59, 0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 2 }}>
                        <Typography variant="h4" fontWeight="bold" sx={{ color: "#22C55E" }}>
                            {allReviews.filter(r => r.status === 'approved').length}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                            Approved Reviews
                        </Typography>
                    </Paper>
                    <Paper sx={{ p: 3, bgcolor: "rgba(30, 41, 59, 0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 2 }}>
                        <Typography variant="h4" fontWeight="bold" sx={{ color: "#EF4444" }}>
                            {allReviews.filter(r => r.status === 'rejected').length}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                            Rejected Reviews
                        </Typography>
                    </Paper>
                </Box>

                {/* Tabs */}
                <Paper sx={{ mb: 3, bgcolor: "rgba(30, 41, 59, 0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 2 }}>
                    <Tabs
                        value={currentTab}
                        onChange={(e, v) => setCurrentTab(v)}
                        sx={{
                            "& .MuiTab-root": { color: "rgba(255, 255, 255, 0.6)" },
                            "& .Mui-selected": { color: "white !important" },
                            "& .MuiTabs-indicator": { bgcolor: "primary.main" }
                        }}
                    >
                        <Tab label={`All (${allReviews.length})`} />
                        <Tab label={`Pending (${allReviews.filter(r => r.status === 'pending').length})`} />
                        <Tab label={`Approved (${allReviews.filter(r => r.status === 'approved').length})`} />
                        <Tab label={`Rejected (${allReviews.filter(r => r.status === 'rejected').length})`} />
                    </Tabs>
                </Paper>

                {/* Reviews List */}
                <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' } }}>
                    {loading && allReviews.length === 0 ? (
                        <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 8 }}>
                            <Typography sx={{ color: "rgba(255, 255, 255, 0.5)" }}>Loading reviews...</Typography>
                        </Box>
                    ) : filteredReviews.length === 0 ? (
                        <Box sx={{ gridColumn: "1 / -1" }}>
                            <Paper sx={{ p: 8, textAlign: "center", bgcolor: "rgba(30, 41, 59, 0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: 2 }}>
                                <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                                    No reviews found
                                </Typography>
                            </Paper>
                        </Box>
                    ) : (
                        filteredReviews.map((review) => (
                            <Box key={review._id}>
                                <Card sx={{
                                    height: "100%",
                                    bgcolor: "rgba(30, 41, 59, 0.4)",
                                    backdropFilter: "blur(12px)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    borderRadius: 2,
                                    color: "white"
                                }}>
                                    <CardContent>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                                <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48, border: "2px solid rgba(255,255,255,0.1)" }}>
                                                    {getInitials(review.name)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="h6" fontWeight="bold">
                                                        {review.name}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                                                        {review.role}, {review.company}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Chip
                                                label={review.status.toUpperCase()}
                                                size="small"
                                                sx={{
                                                    fontWeight: 600,
                                                    bgcolor: review.status === 'approved' ? 'rgba(34, 197, 94, 0.2)' : review.status === 'rejected' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                                                    color: review.status === 'approved' ? '#4ade80' : review.status === 'rejected' ? '#f87171' : '#fbbf24',
                                                    border: `1px solid ${review.status === 'approved' ? 'rgba(34, 197, 94, 0.3)' : review.status === 'rejected' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                                                }}
                                            />
                                        </Box>

                                        <Rating
                                            value={review.rating}
                                            readOnly
                                            size="small"
                                            sx={{ mb: 2, "& .MuiRating-iconEmpty": { color: "rgba(255,255,255,0.3)" } }}
                                        />

                                        <Typography variant="body1" sx={{ mb: 2, fontStyle: "italic", color: "rgba(255, 255, 255, 0.8)", minHeight: "60px" }}>
                                            &ldquo;{review.testimonial}&rdquo;
                                        </Typography>

                                        <Typography variant="caption" sx={{ display: "block", mb: 3, color: "rgba(255, 255, 255, 0.4)" }}>
                                            Submitted: {new Date(review.submittedAt || review.date).toLocaleString()}
                                        </Typography>

                                        {/* Action Buttons */}
                                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", pt: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                                            {review.status !== 'approved' && (
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    startIcon={<CheckCircleIcon />}
                                                    onClick={() => handleApprove(review)}
                                                    sx={{ textTransform: "none", fontWeight: 600 }}
                                                >
                                                    Approve
                                                </Button>
                                            )}
                                            {review.status !== 'rejected' && (
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    startIcon={<CancelIcon />}
                                                    onClick={() => handleReject(review)}
                                                    sx={{ textTransform: "none", fontWeight: 600 }}
                                                >
                                                    Reject
                                                </Button>
                                            )}
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<EditIcon />}
                                                onClick={() => handleEdit(review)}
                                                sx={{
                                                    textTransform: "none",
                                                    borderColor: "rgba(255,255,255,0.2)",
                                                    color: "rgba(255,255,255,0.8)",
                                                    "&:hover": { borderColor: "rgba(255,255,255,0.4)", bgcolor: "rgba(255,255,255,0.05)" }
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleDelete(review)}
                                                sx={{ textTransform: "none" }}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))
                    )}
                </Box>

                {/* Edit Dialog */}
                <Dialog
                    open={editDialog}
                    onClose={() => setEditDialog(false)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            bgcolor: "#0f172a",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            color: "white"
                        }
                    }}
                >
                    <DialogTitle sx={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Edit Review</DialogTitle>
                    <DialogContent sx={{ mt: 2 }}>
                        {editingReview && (
                            <Stack spacing={3} sx={{ mt: 1 }}>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    value={editingReview.name}
                                    onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })}
                                    sx={{
                                        "& .MuiInputBase-root": { color: "white" },
                                        "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                                    }}
                                />
                                <TextField
                                    label="Role"
                                    fullWidth
                                    value={editingReview.role}
                                    onChange={(e) => setEditingReview({ ...editingReview, role: e.target.value })}
                                    sx={{
                                        "& .MuiInputBase-root": { color: "white" },
                                        "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                                    }}
                                />
                                <TextField
                                    label="Company"
                                    fullWidth
                                    value={editingReview.company}
                                    onChange={(e) => setEditingReview({ ...editingReview, company: e.target.value })}
                                    sx={{
                                        "& .MuiInputBase-root": { color: "white" },
                                        "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                                    }}
                                />
                                <TextField
                                    label="Review"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={editingReview.testimonial}
                                    onChange={(e) => setEditingReview({ ...editingReview, testimonial: e.target.value })}
                                    sx={{
                                        "& .MuiInputBase-root": { color: "white" },
                                        "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.2)" }
                                    }}
                                />
                                <Box>
                                    <Typography variant="body2" gutterBottom sx={{ color: "rgba(255,255,255,0.7)" }}>Rating</Typography>
                                    <Rating
                                        value={editingReview.rating}
                                        onChange={(e, value) => setEditingReview({ ...editingReview, rating: value || 5 })}
                                        sx={{ "& .MuiRating-iconEmpty": { color: "rgba(255,255,255,0.3)" } }}
                                    />
                                </Box>
                            </Stack>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", p: 2 }}>
                        <Button onClick={() => setEditDialog(false)} sx={{ color: "rgba(255,255,255,0.6)" }}>Cancel</Button>
                        <Button onClick={handleSaveEdit} variant="contained">Save</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
