import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { add } from "../common/util.js";
import cors from "cors";
import compression from "compression";
import { parse, serialize } from "cookie";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// compression, cors
app.use(compression());
app.use(cors({ origin: "http://localhost:3000" }));
// or app.use(cors());

// serve static files from the frontend folder
app.use(express.static("dist/frontend"));

// parse cookies
app.use((req, res, next) => {
  req.cookies = parse(req.headers.cookie || "");
  next();
});

// parse application/json into JSON
app.use(express.json({ limit: "5mb" }));

// parse application/x-www-form-urlencoded into JSON
app.use(
  express.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

// log each request
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - start;
    console.log(
      `${req.method} ${req.url} -> ${res.statusCode} ${responseTime}ms`
    );
  });

  next();
});

app.get("/setCookie", (req, res) => {
  res.setHeader("Set-Cookie", serialize("name", "value"));
  res.send("Cookie set");
});

app.get("/getCookie", (req, res) => {
  const cookies = req.cookies;
  res.send("Cookies: " + JSON.stringify(cookies));
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
