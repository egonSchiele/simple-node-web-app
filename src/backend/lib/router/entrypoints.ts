import { Router } from "express";
import path from "path";
import { ROOTDIR } from "../config.js";

const entrypointsRouter = Router();

/* Build entrypoints */
const entrypoints = ["index.html", "about.html", "signin.html", "signup.html"];

entrypoints.forEach((entrypoint) => {
  entrypointsRouter.get(`/${entrypoint}`, (req, res) =>
    res.sendFile(path.join(ROOTDIR, `frontend/pages/${entrypoint}`))
  );
});

export default entrypointsRouter;
