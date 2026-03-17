import { NextResponse } from "next/server";
import db from "@/db";
import { watchlist, movies } from "@/db/schema";
import { eq, and } from "drizzle-orm"

export async function POST(req: Request) {
    const { userId, movieId } = await req.json();
    const newEntry = db.insert(watchlist).values({ userId, movieId }).run();
    return NextResponse.json(newEntry)
}

export async function GET() {
  const list = db
    .select({
      watchlistId: watchlist.id,
      movieOriginalTitle: movies.original_title,
    })
    .from(watchlist)
    .innerJoin(movies, eq(watchlist.movieId, movies.id))
    .where(eq(watchlist.userId, 1))
    .all();
    return NextResponse.json(list);
}

export async function DELETE(req: Request) {
    const { watchlistId } = await req.json();
    const deletedEntry = db.delete(watchlist).where(eq(watchlist.id, watchlistId)).run();
    return NextResponse.json(deletedEntry);
}