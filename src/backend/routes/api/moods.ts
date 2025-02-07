import { db } from "@/backend/db/index.js";
import { Request, Response } from "express";

export const get = async (req: Request, res: Response) => {
  const moods = await db.selectFrom("moods").selectAll().execute();
  res.json(moods);
};
