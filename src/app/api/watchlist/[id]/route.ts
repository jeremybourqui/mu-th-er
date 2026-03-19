import { NextResponse } from "next/server";
import db from "@/db";
import { watchlist, movies } from "@/db/schema";
import { eq, and } from "drizzle-orm"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const userId = Number(id);
    const list = db
        .select({
            watchlistId: watchlist.id,
            movieOriginalTitle: movies.original_title,
        })
        .from(watchlist)
        .innerJoin(movies, eq(watchlist.movieId, movies.id))
        .where(eq(watchlist.userId, userId))
        .all();
    return NextResponse.json(list);
}