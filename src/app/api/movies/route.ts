import { NextResponse } from "next/server";
import db from "@/db";
import { movies } from "@/db/schema";

export async function POST(req: Request) {
  const { original_title } = await req.json();
  const newMovie = db.insert(movies).values({ original_title }).returning().get();
  return NextResponse.json(newMovie);
}

export async function GET() {
  const allMovies = db.select().from(movies).all();
  return NextResponse.json(allMovies);
}