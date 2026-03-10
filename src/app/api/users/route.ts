import { NextResponse } from "next/server";
import db from "@/db";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  const { name, email } = await req.json();

  const newUser = db.insert(users).values({ name, email }).returning().get();

  return NextResponse.json(newUser);
}