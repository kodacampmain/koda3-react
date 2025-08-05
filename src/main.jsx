import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Tailwind Import
import "./styles/index.css";
import Router from "./Router";
import ThemeProvider from "./contexts/theme/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </StrictMode>,
);
