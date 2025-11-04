import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("moods")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("mood", "text", (col) =>
      col.notNull().check(sql`mood IN ('good', 'ok', 'bad')`)
    )
    .addColumn("note", "text")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("deleted_at", "timestamp")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("moods").execute();
}
