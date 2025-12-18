"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menu = [
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Blogs", path: "/blogs" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          background: "#fff",
          color: "#000",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          {/* LOGO */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 1,
              cursor: "pointer",
            }}
          >
            QuadraTech
          </Typography>

          {/* DESKTOP NAV */}
          <Box
            className="navbar"
            sx={{
              display: { lg: "flex", xs: "none" },
              alignItems: "center",
            }}
          >
            {menu.map((item) => {
              const active = pathname === item.path;

              return (
                <Box
                  key={item.path}
                  component={Link}
                  href={item.path}
                  sx={{
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    fontFamily: "Montserrat, sans-serif",
                    px: 1.5,
                    py: 1,
                    mx: 0.5,
                    borderRadius: "4px",
                    color: active
                      ? "rgba(0,0,0,0.9)"
                      : "rgba(0,0,0,0.6)",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                    cursor: "pointer",

                    "&:hover": {
                      background: "rgba(0,0,0,0.06)",
                      color: "rgba(0,0,0,0.9)",
                    },

                    "&:active": {
                      background: "rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {item.label}
                </Box>
              );
            })}
          </Box>

          {/* MOBILE HAMBURGER */}
          <IconButton
            sx={{ display: { lg: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260 }}>
          {menu.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              href={item.path}
              onClick={() => setOpen(false)}
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                py: 1.5,
                "&:hover": {
                  background: "rgba(0,0,0,0.06)",
                },
                "&:active": {
                  background: "rgba(0,0,0,0.1)",
                },
              }}
            >
              {item.label}
            </ListItemButton>
          ))}
        </Box>
      </Drawer>
    </>
  );
}
