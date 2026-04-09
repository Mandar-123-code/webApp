import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: Number(process.env.PORT) || 4173,
    allowedHosts: ["store-feedback-platform.onrender.com"]
  },
  server: {
    host: true,
    port: Number(process.env.PORT) || 5173
  }
});