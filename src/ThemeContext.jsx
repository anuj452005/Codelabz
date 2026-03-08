import React, { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ThemeProvider as LegacyThemeProvider } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getDesignTokens } from "./helpers/themes";

export const ThemeContext = createContext({
  mode: "light",
  toggleColorMode: () => {}
});

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const savedMode = localStorage.getItem("codelabz_theme_mode");
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("codelabz_theme_mode", newMode);
          return newMode;
        });
      }
    }),
    [mode]
  );

  const theme = useMemo(() => getDesignTokens(mode), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      {/* 
        MUI v5 requires providing theme to both material/styles and 
        styles/ThemeProvider if using legacy @mui/styles makeStyles 
      */}
      <LegacyThemeProvider theme={theme}>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MUIThemeProvider>
      </LegacyThemeProvider>
    </ThemeContext.Provider>
  );
};
