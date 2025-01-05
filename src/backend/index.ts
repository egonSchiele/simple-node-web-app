import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { add } from "../common/util.js";
import cors from "cors";
import compression from "compression";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(compression());
app.use(express.static("dist/frontend"));
app.use(cors({ origin: "http://localhost:3000" }));

// or
// app.use(cors());

app.use((req, res, next) => {
  next();
  console.log(`${req.method} ${req.url} -> ${res.statusCode}`);
});

app.use(express.json({ limit: "5mb" }));
app.use(
  express.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

app.get("/hi", (req, res) => {
  res.send(`Hello World! ${add(1, 2)}`);
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
