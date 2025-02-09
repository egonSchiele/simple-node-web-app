import { db } from "@/backend/db/index.js";
import { Request, Response } from "express";
import { isLoggedIn } from "@/backend/lib/middleware/auth.js";

export const get = [
  isLoggedIn,
  async (req: Request, res: Response) => {
    const moods = await db
      .selectFrom("moods")
      .orderBy("created_at", "desc")
      .selectAll()
      .execute();
    res.json(moods);
  },
];
