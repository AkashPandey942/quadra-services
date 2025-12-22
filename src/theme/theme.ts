import { createTheme, ThemeOptions } from "@mui/material/styles";

export const getThemeOptions = (primary: string, secondary: string): ThemeOptions => ({
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1100, xl: 1400 },
  },
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

const theme = createTheme(getThemeOptions("#6A1B9A", "#E91E63"));

export default theme;
