import { eq, and, ne, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import db from "@/db";
import { watchlist, movies, users } from "@/db/schema";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = Number(url.searchParams.get("userId"));

  const common = db
    .select({
      otherUserId: watchlist.userId,
      otherUserName: users.name,
      movieTitle: movies.original_title,
    })
    .from(watchlist)
    .innerJoin(movies, eq(watchlist.movieId, movies.id))
    .innerJoin(users, eq(watchlist.userId, users.id))
    .where(
      and(
        ne(watchlist.userId, userId),
        inArray(
          watchlist.movieId,
          db.select({ id: watchlist.movieId })
            .from(watchlist)
            .where(eq(watchlist.userId, userId))
        )
      )
    )
    .all();

  return NextResponse.json(common);
}