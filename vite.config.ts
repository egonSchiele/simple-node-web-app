import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api": "http://127.0.0.1:3000/",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist/frontend",
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "pages", "index.html"),
        signin: path.resolve(__dirname, "pages", "signin.html"),
        signup: path.resolve(__dirname, "pages", "signup.html"),
      },
    },
  },
});
