import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    outDir: "dist/frontend",
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "public", "index.html"),
        about: path.resolve(__dirname, "public", "about.html"),
      },
    },
  },
});
