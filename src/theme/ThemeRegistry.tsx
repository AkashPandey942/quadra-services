"use client";

import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState, useMemo } from "react";
import { getThemeOptions } from "./theme";
import { BackgroundProvider, useBackground } from "@/context/BackgroundContext";

// This implementation follows the official MUI guide for Next.js App Router
// https://mui.com/material-ui/guides/next-js-app-router/

function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useBackground();

  const theme = useMemo(() =>
    createTheme(getThemeOptions(currentTheme.primary, currentTheme.secondary)),
    [currentTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "mui" });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <BackgroundProvider>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </BackgroundProvider>
    </CacheProvider>
  );
}
