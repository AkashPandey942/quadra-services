"use client";
import { Box, Typography } from "@mui/material";
import Facebook from "@mui/icons-material/Facebook";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import { useBackground } from "@/context/BackgroundContext";

export default function TopBar() {
  const { currentTheme, cycleTheme } = useBackground();
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
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Facebook fontSize="small" sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }} />
          <LinkedIn fontSize="small" sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }} />
          <Instagram fontSize="small" sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }} />
          <Twitter fontSize="small" sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }} />
        </Box>
        <Box
          onClick={cycleTheme}
          sx={{
            ml: 2,
            px: 1,
            py: 0.2,
            borderRadius: 1,
            bgcolor: "primary.main",
            cursor: "pointer",
            fontSize: "10px",
            fontWeight: "bold",
            "&:hover": { opacity: 0.8 },
            transition: "all 0.3s ease"
          }}
        >
          Theme: {currentTheme.name}
        </Box>
      </Box>

      <Typography fontSize={14}>
        info@quadratech.com | +91 99999 99999
      </Typography>
    </Box>
  );
}
