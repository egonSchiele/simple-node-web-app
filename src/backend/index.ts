import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { add2 } from "../common/add.js";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("dist/frontend"));

app.get("/hi", (req, res) => {
  res.send(`Hello World! ${add2(1, 2)}`);
});

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/pages/index.html"));
});

app.get("/about.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/pages/about.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
