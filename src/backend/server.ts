import entrypointsRouter from "@/backend/lib/router/entrypoints.js";
import compression from "compression";
import { parse } from "cookie";
import express from "express";
import { router } from "express-file-routing";
import path from "path";
import { ROOTDIR } from "@/backend/lib/config.js";
import loggerMiddleware from "@/backend/lib/middleware/logger.js";
import { processEnvFile } from "@/backend/lib/envFile.js";
processEnvFile();

const app = express();
const port = process.env.PORT || 3000;

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
app.use(loggerMiddleware);

// index.html, about.html, signin.html, signup.html, etc
app.use("/", entrypointsRouter);

// routes
app.use(
  "/",
  await router({
    directory: path.join(ROOTDIR, "backend", "routes"),
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
