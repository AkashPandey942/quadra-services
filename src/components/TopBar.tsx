"use client";
import { Box, Typography } from "@mui/material";
import Facebook from "@mui/icons-material/Facebook";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";

export default function TopBar() {
  return (
    <Box
      sx={{
        display: { xl: "flex", lg: "none", md: "none", sm: "none", xs: "none" },
        justifyContent: "space-between",
        px: 4,
        py: 1,
        bgcolor: "#111",
        color: "#fff",
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Facebook fontSize="small" />
        <LinkedIn fontSize="small" />
        <Instagram fontSize="small" />
        <Twitter fontSize="small" />
      </Box>

      <Typography fontSize={14}>
        info@quadratech.com | +91 99999 99999
      </Typography>
    </Box>
  );
}
