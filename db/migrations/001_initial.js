import { Knex } from "knex";

/**
 * Migrates database schema to the next version.
 * @see https://knexjs.org/#Schema
 */
export async function up(db) {
  await db.schema.createTable("table", (table) => {
    table
    table.boolean("archived").notNullable().defaultTo(false);
    table.timestamps(false, true);
  });
}

export async function down(db) {
  await db.schema.dropTableIfExists("table");
}

export const configuration = { transaction: true };
