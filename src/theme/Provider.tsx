"use client";

import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode, useState } from "react";
import createEmotionCache from "./emotionCache";
import theme from "./theme";

export default function Providers({ children }: { children: ReactNode }) {
  // one cache per browser session
  const [cache] = useState(() => createEmotionCache());

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
