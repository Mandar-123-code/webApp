import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,             
    port: Number(process.env.PORT) || 5173
  }
});