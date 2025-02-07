import { PAGESDIR } from "@/backend/lib/config.js";
import { Router } from "express";
import path from "path";

const entrypointsRouter = Router();

const entrypoints = ["index.html", "about.html", "signin.html", "signup.html"];

entrypoints.forEach((entrypoint) => {
  entrypointsRouter.get(`/${entrypoint}`, (req, res) =>
    res.sendFile(path.join(PAGESDIR, entrypoint))
  );
});

export default entrypointsRouter;
