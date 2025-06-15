import { db } from "@/backend/db/index.js";
import { Request, Response } from "express";
import { isLoggedIn } from "@/backend/lib/middleware/auth.js";
import { success } from "@/common/types.js";
import { ApiMoodsResponseGet } from "@/common/apiTypes/moods.js";
export const get = [
  isLoggedIn,
  async (req: Request, res: Response): Promise<ApiMoodsResponseGet> => {
    const moods = await db
      .selectFrom("moods")
      .orderBy("created_at", "desc")
      .selectAll()
      .execute();
    return success(moods);
  },
];
