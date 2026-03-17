import { NextResponse } from "next/server";
import db from "@/db";
import { movies } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request, {params }: {params: { id: string } }) {
  const { id } = await params;
  db.delete(movies).where(eq(movies.id, Number(id))).run();
  return NextResponse.json({ deleted: true });
}
