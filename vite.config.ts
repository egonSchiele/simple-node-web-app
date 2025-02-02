import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [tailwindcss()],

  build: {
    outDir: "dist/frontend",
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "pages", "index.html"),
        about: path.resolve(__dirname, "pages", "about.html"),
      },
    },
  },
});
