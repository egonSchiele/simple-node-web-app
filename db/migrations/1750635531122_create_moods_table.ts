import type { Kysely } from "kysely";
import { sql } from "kysely";

const env = process.env.ENV || "development";
export async function up(db: Kysely<any>): Promise<void> {
  if (env === "production") {
    await upProd(db);
  } else {
    await upDev(db);
  }
}

export async function upProd(db: Kysely<any>): Promise<void> {
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

    .execute();
}

export async function upDev(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("moods")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("mood", "text", (col) => col.notNull())
    .addColumn("note", "text")
    .addColumn("created_at", "text", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("moods").execute();
}
