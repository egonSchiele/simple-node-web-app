import { z } from "zod";
import { Result } from "../types.js";
import { Mood } from "../../backend/db/types.js";

export const CreateMoodSchema = z.object({
  mood: z.enum(["good", "ok", "bad"]),
  note: z.string().nullable().optional(),
});

export const UpdateMoodSchema = z.object({
  mood: z.enum(["good", "ok", "bad"]).optional(),
  note: z.string().nullable().optional(),
});

export type CreateMoodRequest = z.infer<typeof CreateMoodSchema>;
export type UpdateMoodRequest = z.infer<typeof UpdateMoodSchema>;

export type ApiMoodsResponseGet = Result<Mood[]>;
export type ApiMoodResponseGet = Result<Mood>;
export type ApiMoodsResponsePost = Result<Mood>;
export type ApiMoodsResponsePut = Result<Mood>;
export type ApiMoodsResponseDelete = Result<{ success: boolean }>;
