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
import { useState, useEffect } from "react";
import Image from "next/image";

const menu = [
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Solutions", path: "/solutions" },
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
          background: "rgba(2, 6, 23, 0.8)",
          backdropFilter: "blur(12px)",
          color: "#fff",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          {/* LOGO */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src="/images/ApexNexon.png"
              alt="Apex Nexon Logo"
              sx={{
                height: { xs: 35, md: 45 },
                width: { xs: "160px", md: "200px" }, // Cropping to show "AN ApexNexon" part
                objectFit: "cover",
                objectPosition: "left center",
                cursor: "pointer",
                filter: "brightness(1.1)", // Pop on dark background
              }}
            />
          </Link>

          {/* CENTER BREADCRUMB - DESKTOP ONLY */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.03)",
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                }}
              >
                Home
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  mx: 1,
                  color: "divider",
                }}
              >
                /
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: "0.85rem",
                  letterSpacing: "0.5px",
                }}
              >
                Comprehensive Technology Services
              </Typography>
            </Box>
          </Box>

          {/* MOBILE SPACER - Push hamburger to right */}
          <Box sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }} />

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
                      ? "#fff"
                      : "rgba(255, 255, 255, 0.6)",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                    cursor: "pointer",

                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.06)",
                      color: "#fff",
                    },

                    "&:active": {
                      background: "rgba(255, 255, 255, 0.1)",
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
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            sx={{
              display: { lg: "none" },
              color: "white",
              minWidth: 44,
              minHeight: 44,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)"
              },
              "&:active": {
                bgcolor: "rgba(255, 255, 255, 0.15)"
              },
              "&:focus-visible": {
                outline: "2px solid #E91E63",
                outlineOffset: 2,
              }
            }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, bgcolor: "#020617", height: "100%" }}>
          {menu.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              href={item.path}
              onClick={() => setOpen(false)}
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                py: 1.75,
                px: 2,
                minHeight: 48,
                color: "rgba(255, 255, 255, 0.7)",
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "white",
                },
                "&:active": {
                  background: "rgba(255, 255, 255, 0.12)",
                  color: "white",
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
