import { Result } from "../types.js";
export type Mood = {
  created_at: Date;
  id: number;
  mood: "good" | "ok" | "bad";
  note: string | null;
};

export type ApiMoodsResponseGet = Result<Mood[]>;
