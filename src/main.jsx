import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Tailwind Import
import "./styles/index.css";
import Router from "./Router";
import ThemeProvider from "./contexts/theme/ThemeProvider";
import CounterProvider from "./contexts/counter/CounterProvider";
import AuthProvider from "./contexts/auth/AuthProvider";
import TodoProvider from "./contexts/todo/todoProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <CounterProvider>
        <AuthProvider>
          <TodoProvider>
            <Router />
          </TodoProvider>
        </AuthProvider>
      </CounterProvider>
    </ThemeProvider>
  </StrictMode>,
);
