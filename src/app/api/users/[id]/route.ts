import { NextResponse } from "next/server";
import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request, {params }: {params: { id: string } }) {
  const { id } = await params;
  db.delete(users).where(eq(users.id, Number(id))).run();
  return NextResponse.json({ deleted: true });
}