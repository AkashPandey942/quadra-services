"use client";

import { Box, Container, Typography, IconButton, Stack, Link as MuiLink, Divider } from "@mui/material";
import Link from "next/link";
import { useBackground } from "@/context/BackgroundContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const services = [
  "Social Media Marketing",
  "App Development",
  "SEO Optimization",
  "Cloud Solutions",
  "AI & Data Science",
  "Cyber Security",
];

const quickLinks = [
  { label: "About Us", path: "/about" },
  { label: "Our Projects", path: "/projects" },
  { label: "Latest Blogs", path: "/blogs" },
  { label: "Contact Us", path: "/contact" },
  { label: "Careers", path: "/careers" },
];

export default function Footer() {
  const { currentTheme } = useBackground();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#020617",
        color: "white",
        pt: { xs: 8, md: 10 },
        pb: 4,
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'grid', gap: 6, mb: 8, gridTemplateColumns: { xs: '1fr', md: '4fr 2.5fr 2.5fr 3fr' } }}>
          {/* Column 1: Brand & Social */}
          <Box>
            <Box
              component={Link}
              href="/"
              sx={{ display: "inline-flex", mb: 3 }}
            >
              <Box
                component="img"
                src="/images/ApexNexon.png"
                alt="Apex Nexon Logo"
                sx={{
                  height: 45,
                  width: "200px",
                  objectFit: "cover",
                  objectPosition: "left center",
                  filter: "brightness(1.1)",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                lineHeight: 1.8,
                mb: 4,
                maxWidth: 350,
              }}
            >
              Building digital excellence through precision and innovation. We empower businesses with cutting-edge technology solutions that drive growth and transformation in an ever-evolving world.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { icon: LinkedInIcon, link: "#" },
                { icon: TwitterIcon, link: "#" },
                { icon: InstagramIcon, link: "#" },
                { icon: FacebookIcon, link: "#" },
              ].map((social, idx) => (
                <IconButton
                  key={idx}
                  component="a"
                  href={social.link}
                  sx={{
                    color: "rgba(255, 255, 255, 0.4)",
                    bgcolor: "rgba(255, 255, 255, 0.03)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "white",
                      bgcolor: currentTheme.primary,
                      transform: "translateY(-4px)",
                      boxShadow: `0 8px 20px ${currentTheme.primary}44`,
                    },
                  }}
                >
                  <social.icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Box>

          {/* Column 2: Services */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, letterSpacing: 0.5 }}>
              Our Services
            </Typography>
            <Stack spacing={1.5}>
              {services.map((service, idx) => (
                <MuiLink
                  key={idx}
                  href="#"
                  underline="none"
                  sx={{
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: currentTheme.primary,
                      pl: 1,
                    },
                  }}
                >
                  {service}
                </MuiLink>
              ))}
            </Stack>
          </Box>

          {/* Column 3: Quick Links */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, letterSpacing: 0.5 }}>
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {quickLinks.map((link, idx) => (
                <MuiLink
                  key={idx}
                  component={Link}
                  href={link.path}
                  underline="none"
                  sx={{
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: currentTheme.primary,
                      pl: 1,
                    },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Box>

          {/* Column 4: Reach Us */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, letterSpacing: 0.5 }}>
              Reach Us
            </Typography>
            <Stack spacing={2.5}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <LocationOnIcon sx={{ color: currentTheme.primary, mt: 0.5 }} />
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)", lineHeight: 1.6 }}>
                  123 Tech Plaza, Digital Valley,<br />
                  Information Park, Bangalore - 560001
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <PhoneIcon sx={{ color: currentTheme.primary }} />
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                  +91 99999 99999
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <EmailIcon sx={{ color: currentTheme.primary }} />
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                  hello@apexnexon.com
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)", mb: 4 }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.3)" }}>
            © {new Date().getFullYear()} ApexNexon Technologies. All Rights Reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <MuiLink href="#" underline="none" sx={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "0.75rem", "&:hover": { color: "white" } }}>
              Privacy Policy
            </MuiLink>
            <MuiLink href="#" underline="none" sx={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "0.75rem", "&:hover": { color: "white" } }}>
              Terms of Service
            </MuiLink>
            <MuiLink href="#" underline="none" sx={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "0.75rem", "&:hover": { color: "white" } }}>
              Cookie Policy
            </MuiLink>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
