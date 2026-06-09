import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const policies = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://js.stripe.com",
  "style-src 'unsafe-inline'",
  "frame-src https://js.stripe.com",
  "connect-src 'self' http://localhost:8000",
  "frame-ancestors 'none'",
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   headers: {
  //     "content-security-policy": policies.join("; "),
  //   },
  // },
});
