import { sqliteTable, text, integer, unique } from "drizzle-orm/sqlite-core";
import { InferSelectModel } from "drizzle-orm";

export type Movie = InferSelectModel<typeof movies>;
export type User = InferSelectModel<typeof users>;
export type Watchlist = InferSelectModel<typeof watchlist>
export type WatchlistWithMovie = {
  watchlistId: number
  movieOriginalTitle: string
};

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("passwordHash")
});

export const movies = sqliteTable("movies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  original_title: text("original_title").notNull().unique(),
});

export const watchlist = sqliteTable("watchlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id, {onDelete: "cascade"}),
  movieId: integer("movie_id").notNull().references(() => movies.id, {onDelete: "cascade"}),},
(table) => [ unique().on(table.userId, table.movieId),]);

