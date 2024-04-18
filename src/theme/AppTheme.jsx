import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import React from "react";
import { purpleTheme } from "./index";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
