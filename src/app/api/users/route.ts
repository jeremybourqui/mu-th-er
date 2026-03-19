import { NextResponse } from "next/server";
import db from "@/db";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  const { name, email } = await req.json();

  try {
    const newUser = db.insert(users).values({ name, email }).returning().get();
    return NextResponse.json(newUser);
  } catch (error: any) {
    if (error.message.includes("users.name")) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }
    if (error.message.includes("users.email")) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const allUsers = db.select().from(users).all();
  return NextResponse.json(allUsers);
}