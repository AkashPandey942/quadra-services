import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1100, xl: 1400 },
  },
  palette: {
    primary: { main: "#6A1B9A" },
    secondary: { main: "#E91E63" },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default theme;
