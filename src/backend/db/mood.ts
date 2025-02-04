import { db } from "@/backend/db/index.js";
import { Mood, MoodUpdate, NewMood } from "@/backend/db/types.js";

// Some example queries
export async function findMoodById(id: number) {
  return await db
    .selectFrom("moods")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findMoods(criteria: Partial<Mood>) {
  let query = db.selectFrom("moods");

  if (criteria.id) {
    query = query.where("id", "=", criteria.id);
  }

  if (criteria.note) {
    query = query.where("note", "=", criteria.note);
  }

  if (criteria.mood) {
    query = query.where("mood", "=", criteria.mood);
  }

  return await query.selectAll().execute();
}

export async function updateMood(id: number, updateWith: MoodUpdate) {
  await db.updateTable("moods").set(updateWith).where("id", "=", id).execute();
}

export async function createMood(mood: NewMood) {
  return await db
    .insertInto("moods")
    .values(mood)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteMood(id: number) {
  return await db
    .deleteFrom("moods")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
