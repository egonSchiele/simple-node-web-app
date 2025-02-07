import { db } from "@/backend/db/index.js";
import compression from "compression";
import { parse, serialize } from "cookie";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { verifyIdToken } from "./lib/firebase.js";
import { isLoggedIn } from "./lib/middleware/auth.js";

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// compression
app.use(compression());

// allow CORS for local development only
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `http://localhost:${port}`);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

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

/* Build entrypoints */
const entrypoints = ["index.html", "about.html", "signin.html", "signup.html"];

entrypoints.forEach((entrypoint) => {
  app.get(`/${entrypoint}`, (req, res) =>
    res.sendFile(path.join(__dirname, `../frontend/pages/${entrypoint}`))
  );
});

/* Example of getting and setting cookies */
app.get("/setCookie", (req, res) => {
  res.setHeader("Set-Cookie", serialize("name", "value"));
  res.send("Cookie set");
});

app.get("/getCookie", (req, res) => {
  const cookies = req.cookies;
  console.log({ cookies });
  res.send("Cookies: " + JSON.stringify(cookies));
});

/* Database example */
app.get("/moods", async (req, res) => {
  const moods = await db.selectFrom("moods").selectAll().execute();
  res.json(moods);
});

/* Get a firebase token and set it as a cookie during signin or signup */
app.post("/verify-token", async (req, res) => {
  const decodeResult = await verifyIdToken(req.headers.authorization || "");
  if (decodeResult.success) {
    res.setHeader(
      "Set-Cookie",
      serialize("token", req.headers.authorization || "")
    );
  }
  res.json({ result: decodeResult.success });
});

app.get("/signout", async (req, res) => {
  res.setHeader("Set-Cookie", serialize("token", "", { maxAge: 0 }));
  res.redirect("/signin.html");
});

/* Example of a secured route */
app.get("/secured", isLoggedIn, async (req, res) => {
  res.json({ message: "This is a secured route", user: res.locals.user });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
