import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#111", color: "#fff", py: 4, textAlign: "center" }}>
      <Typography>
        © {new Date().getFullYear()} QuadraTech Services
      </Typography>
    </Box>
  );
}
