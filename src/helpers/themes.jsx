import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const getDesignTokens = (mode) =>
  responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        primary: {
          main: "#03AAFA",
          light: mode === "light" ? "#5CBFFF" : "#5CBFFF",
          dark: mode === "light" ? "#0288D1" : "#0277BD",
        },
        secondary: {
          main: mode === "light" ? "#f50057" : "#ff4081",
        },
        background: {
          default: mode === "light" ? "#f5f5f5" : "#121212",
          paper: mode === "light" ? "#ffffff" : "#1e1e1e",
        },
        text: {
          primary: mode === "light" ? "#333333" : "#ffffff",
          secondary: mode === "light" ? "#666666" : "#b3b3b3",
          disabled: mode === "light" ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.38)",
        },
        error: {
          main: mode === "light" ? "#d32f2f" : "#f44336",
        },
        warning: {
          main: mode === "light" ? "#ed6c02" : "#ff9800",
        },
        info: {
          main: mode === "light" ? "#0288d1" : "#29b6f6",
        },
        success: {
          main: mode === "light" ? "#2e7d32" : "#66bb6a",
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              transition: "background-color 0.3s ease, color 0.3s ease",
            },
          },
        },
      },
    })
  );

// Retaining for legacy compatibility if anything else uses it statically
export const basicTheme = responsiveFontSizes(
  createTheme({
    shadows: ["none"],
    palette: {
      primary: {
        main: "#455a64"
      }
    }
  })
);

export const theme = getDesignTokens("light");
