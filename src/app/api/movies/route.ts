import { NextResponse } from "next/server";
import db from "@/db";
import { movies } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function POST(req: Request) {
  const { original_title } = await req.json();
  const newMovie = db.insert(movies).values({ original_title }).returning().get();
  return NextResponse.json(newMovie);
}

export async function GET(req: Request) {
  const allMovies = db.select().from(movies).all();
  return NextResponse.json(allMovies);
}

export async function DELETE(req: Request, {params }: {params: { id: string } }) {
  db.delete(movies).where(eq(movies.id, Number(params.id))).run();
  return NextResponse.json({ deleted: true });
}