import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const policies = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://js.stripe.com",
  "style-src 'self' 'unsafe-inline'",
  "frame-src 'self' https://js.stripe.com",
  "connect-src 'self' http://localhost:8000",
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  html: {
    cspNonce: "__CSP_NONCE_PLACEHOLDER__",
  },
  server: {
    headers: {
      "content-security-policy": policies.join("; "),
    },
  },
});
