import React from "react";
import Logo from "../assets/images/logo.png";
import { useTheme } from "@mui/material/styles";

function BrandName() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <>
      <img
        style={{
          width: "100px",
          cursor: "pointer",
          filter: isDark ? "brightness(0) invert(1)" : "none"
        }}
        src={Logo}
        alt="logo"
      />
    </>
  );
}

export default BrandName;
