import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Tailwind Import
import "./styles/index.css";
import Router from "./Router";
import ThemeProvider from "./contexts/theme/ThemeProvider";
import CounterProvider from "./contexts/counter/CounterProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <CounterProvider>
        <Router />
      </CounterProvider>
    </ThemeProvider>
  </StrictMode>,
);
