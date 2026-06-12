"use client";

import { useEffect } from "react";

/**
 * Last-resort error boundary. This catches errors thrown in the root layout
 * itself (or in the route-level error.jsx), where the normal layout — and its
 * CSS — is unavailable. It must render its own <html> and <body>, so styles
 * are inlined here rather than relying on Tailwind/globals.css.
 */
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en-NG">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          background: "#f9fafb",
          color: "#0E1B4D",
          padding: "1rem",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>⚠️</div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              margin: "0 0 0.5rem",
            }}
          >
            Something went wrong
          </h1>
          <p style={{ color: "#6b7280", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
            We hit an unexpected error. Please try again, or return to the
            homepage.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                background: "#dd1d84",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.75rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                background: "#fff",
                color: "#0E1B4D",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "0.75rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
