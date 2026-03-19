import { NextResponse } from "next/server";
import db from "@/db";
import { movies } from "@/db/schema";

export async function POST(req: Request) {
  const { original_title } = await req.json();

  try {
    const newMovie = db.insert(movies).values({ original_title }).returning().get();
    return NextResponse.json(newMovie);
  } catch {
    return NextResponse.json(
      { error: "This movie already exists" },
      { status: 409 }
    );
  }
}

export async function GET() {
  const allMovies = db.select().from(movies).all();
  return NextResponse.json(allMovies);
}