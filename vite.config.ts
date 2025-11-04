import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, "pages");
const htmlFiles = fs
  .readdirSync(pagesDir)
  .filter((file) => file.endsWith(".html"))
  .map((file) => path.resolve(pagesDir, file));

console.log("Vite found these HTML files:", htmlFiles);
const input = htmlFiles.reduce((acc, file) => {
  const name = path.basename(file, ".html");
  acc[name] = file;
  return acc;
}, {});

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
      input,
    },
  },
});
