import {
  ApiMoodResponseGet,
  ApiMoodsResponsePut,
  UpdateMoodSchema,
  ApiMoodsResponseDelete,
} from "@/common/apiTypes/moods.js";
import { failure, success } from "@/common/types.js";
import { db } from "@/backend/db/index.js";
import { isLoggedIn } from "@/backend/lib/middleware/auth.js";
import { Request, Response } from "express";

export const get = [
  isLoggedIn,
  async (req: Request, res: Response): Promise<ApiMoodResponseGet> => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return failure("Invalid mood ID");
    }

    const mood = await db
      .selectFrom("moods")
      .where("id", "=", id)
      .where("deleted_at", "is", null)
      .selectAll()
      .executeTakeFirst();

    if (!mood) {
      return failure("Mood not found");
    }

    return success(mood);
  },
];

export const getType = "ApiMoodResponseGet";

export const put = [
  isLoggedIn,
  async (req: Request, res: Response): Promise<ApiMoodsResponsePut> => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return failure("Invalid mood ID");
    }

    const validatedData = UpdateMoodSchema.safeParse(req.body);
    if (!validatedData.success) {
      console.error(validatedData.error.errors);
      return failure("Invalid input");
    }

    const updateData = validatedData.data;

    const updatedMood = await db
      .updateTable("moods")
      .set({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .where("id", "=", id)
      .where("deleted_at", "is", null)
      .returningAll()
      .executeTakeFirst();

    if (!updatedMood) {
      return failure("Mood not found");
    }

    return success(updatedMood);
  },
];

export const putType = "ApiMoodsResponsePut";

export const del = [
  isLoggedIn,
  async (req: Request, res: Response): Promise<ApiMoodsResponseDelete> => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return failure("Invalid mood ID");
    }

    const result = await db
      .updateTable("moods")
      .set({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .where("id", "=", id)
      .where("deleted_at", "is", null)
      .executeTakeFirst();

    if (result.numUpdatedRows === 0n) {
      return failure("Mood not found");
    }

    return success({ success: true });
  },
];

export const delType = "ApiMoodsResponseDelete";
