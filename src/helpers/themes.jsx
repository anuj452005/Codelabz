import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const getDesignTokens = (mode) =>
  responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        primary: {
          main: "#03AAFA",
        },
        background: {
          default: mode === "light" ? "#f5f5f5" : "#121212",
          paper: mode === "light" ? "#ffffff" : "#1e1e1e",
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
