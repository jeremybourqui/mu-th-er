import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const movies = sqliteTable("movies", {
  id: integer("id").primaryKey({ autoIncrement: true}),
  original_title: text("original_title").notNull(),
});