import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel } from "drizzle-orm";

export type Movie = InferSelectModel<typeof movies>;
export type User = InferSelectModel<typeof users>;

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const movies = sqliteTable("movies", {
  id: integer("id").primaryKey({ autoIncrement: true}),
  original_title: text("original_title").notNull(),
});