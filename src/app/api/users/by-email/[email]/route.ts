import { NextResponse } from "next/server";
import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request, {params }: {params: { email: string } }) {
  const { email } = await params;
  const user = db.select().from(users).where(eq(users.email, String(email))).run();
  return NextResponse.json(user);
}