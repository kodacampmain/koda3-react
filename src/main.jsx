import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
// Tailwind Import
import "./styles/index.css";
import Router from "./Router";
import ThemeProvider from "./contexts/theme/ThemeProvider";
import CounterProvider from "./contexts/counter/CounterProvider";
import AuthProvider from "./contexts/auth/AuthProvider";
import TodoProvider from "./contexts/todo/todoProvider";

import reduxStore from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={reduxStore}>
      <ThemeProvider>
        <CounterProvider>
          <AuthProvider>
            <TodoProvider>
              <Router />
            </TodoProvider>
          </AuthProvider>
        </CounterProvider>
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>,
);
