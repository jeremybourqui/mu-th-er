import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import bcrypt from "bcryptjs"
import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Credentials({
        credentials: {
            email: {
                type: "email",
                label: "Email",
                placeholder: "johndoe@gmail.com",
            },
            password: {
                type: "password",
                label: "Password",
                placeholder: "*****",
            },
        },
        authorize: async (credentials) => {
            const { email, password } = await signInSchema.parseAsync(credentials);

            // 1. Find user by email only
            const result = db.select().from(users).where(eq(users.email, email)).all()
            const user = result[0] ?? null

            console.log("User found:", !!user)
            console.log("Has hash:", !!user?.passwordHash)

            if (!user || !user.passwordHash) return null;

            // 2. Compare password against stored hash
            const valid = await bcrypt.compare(password, user.passwordHash);
            console.log("Password valid:", valid)
            if (!valid) return null;

            return {
                ...user,
                // Convert numeric DB id to string for NextAuth (handles id type error)
                id: user.id.toString(),
            };
        },
    })
    ],
})

