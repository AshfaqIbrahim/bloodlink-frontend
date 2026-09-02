import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <App />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#FCFBF8",
              color: "#1C2321",
              border: "1px solid rgba(122, 47, 47, 0.15)",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#3F6B5C",
                secondary: "#FCFBF8",
              },
            },
            error: {
              iconTheme: {
                primary: "#7A2F2F",
                secondary: "#FCFBF8",
              },
            },
          }}
        />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);
