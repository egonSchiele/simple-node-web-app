import { Request, Response } from "express";
import path from "path";
import { PAGESDIR } from "@/backend/lib/config.js";

export const get = (req: Request, res: Response) => {
  return res.sendFile(path.join(PAGESDIR, "index.html"));
};
