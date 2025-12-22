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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

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

    // Check authentication
    useEffect(() => {
        const auth = sessionStorage.getItem("admin-authenticated");
        if (auth === "true") {
            setIsAuthenticated(true);
            loadReviews();
        }
    }, []);

    // Handle login
    const handleLogin = () => {
        if (password === "admin123") {
            sessionStorage.setItem("admin-authenticated", "true");
            setIsAuthenticated(true);
            loadReviews();
        } else {
            alert("Incorrect password!");
        }
    };

    // Handle logout
    const handleLogout = () => {
        sessionStorage.removeItem("admin-authenticated");
        setIsAuthenticated(false);
        setPassword("");
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

    // Login screen
    if (!isAuthenticated) {
        return (
            <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f5f5f5" }}>
                <Card sx={{ maxWidth: 400, width: "100%", p: 4 }}>
                    <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
                        Admin Login
                    </Typography>
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        sx={{ mb: 3 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <Typography variant="caption" color="text.secondary" mt={2} display="block" textAlign="center">
                        Default password: admin123
                    </Typography>
                </Card>
            </Box>
        );
    }

    // Admin dashboard
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Typography variant="h3" fontWeight="bold">
                        Review Management (DB)
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="outlined" onClick={loadReviews} disabled={loading}>
                            {loading ? "Loading..." : "Refresh"}
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                </Box>

                {/* Stats */}
                <Box sx={{ display: 'grid', gap: 3, mb: 4, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' } }}>
                    <Box>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" fontWeight="bold" color="warning.main">
                                    {allReviews.filter(r => r.status === 'pending').length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Pending Reviews
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" fontWeight="bold" color="success.main">
                                    {allReviews.filter(r => r.status === 'approved').length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Approved Reviews
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" fontWeight="bold" color="error.main">
                                    {allReviews.filter(r => r.status === 'rejected').length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Rejected Reviews
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>

                {/* Tabs */}
                <Card sx={{ mb: 3 }}>
                    <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
                        <Tab label={`All (${allReviews.length})`} />
                        <Tab label={`Pending (${allReviews.filter(r => r.status === 'pending').length})`} />
                        <Tab label={`Approved (${allReviews.filter(r => r.status === 'approved').length})`} />
                        <Tab label={`Rejected (${allReviews.filter(r => r.status === 'rejected').length})`} />
                    </Tabs>
                </Card>

                {/* Reviews List */}
                <Box sx={{ display: 'grid', gap: 3 }}>
                    {loading && allReviews.length === 0 ? (
                        <Box sx={{ textAlign: "center", py: 8 }}>
                            <Typography color="text.secondary">Loading reviews...</Typography>
                        </Box>
                    ) : filteredReviews.length === 0 ? (
                        <Box>
                            <Card>
                                <CardContent sx={{ textAlign: "center", py: 8 }}>
                                    <Typography variant="h6" color="text.secondary">
                                        No reviews found
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ) : (
                        filteredReviews.map((review) => (
                            <Box key={review._id}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                                            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                                <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
                                                    {getInitials(review.name)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="h6" fontWeight="bold">
                                                        {review.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {review.role}, {review.company}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Chip
                                                label={review.status.toUpperCase()}
                                                color={getStatusColor(review.status)}
                                                size="small"
                                            />
                                        </Box>

                                        <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />

                                        <Typography variant="body1" sx={{ mb: 2, fontStyle: "italic" }}>
                                            &ldquo;{review.testimonial}&rdquo;
                                        </Typography>

                                        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                                            Submitted: {new Date(review.submittedAt || review.date).toLocaleString()}
                                        </Typography>

                                        {/* Action Buttons */}
                                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                            {review.status !== 'approved' && (
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    startIcon={<CheckCircleIcon />}
                                                    onClick={() => handleApprove(review)}
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
                                                >
                                                    Reject
                                                </Button>
                                            )}
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<EditIcon />}
                                                onClick={() => handleEdit(review)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleDelete(review)}
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
                <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Edit Review</DialogTitle>
                    <DialogContent>
                        {editingReview && (
                            <Stack spacing={3} sx={{ mt: 2 }}>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    value={editingReview.name}
                                    onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })}
                                />
                                <TextField
                                    label="Role"
                                    fullWidth
                                    value={editingReview.role}
                                    onChange={(e) => setEditingReview({ ...editingReview, role: e.target.value })}
                                />
                                <TextField
                                    label="Company"
                                    fullWidth
                                    value={editingReview.company}
                                    onChange={(e) => setEditingReview({ ...editingReview, company: e.target.value })}
                                />
                                <TextField
                                    label="Review"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={editingReview.testimonial}
                                    onChange={(e) => setEditingReview({ ...editingReview, testimonial: e.target.value })}
                                />
                                <Box>
                                    <Typography variant="body2" gutterBottom>Rating</Typography>
                                    <Rating
                                        value={editingReview.rating}
                                        onChange={(e, value) => setEditingReview({ ...editingReview, rating: value || 5 })}
                                    />
                                </Box>
                            </Stack>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditDialog(false)}>Cancel</Button>
                        <Button onClick={handleSaveEdit} variant="contained">Save</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
