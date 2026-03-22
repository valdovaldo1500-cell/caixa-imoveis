import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const SEED_USERS = [
  { username: "isilva", password: "NoNot1!" },
  { username: "alex", password: "AlexMinhoca1!" },
];

export async function POST(request: Request) {
  // Bearer token auth — same SESSION_SECRET used as the token
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  const expected = process.env.SESSION_SECRET || "change-me-in-production";
  if (token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let created = 0;
  let updated = 0;

  for (const { username, password } of SEED_USERS) {
    const passwordHash = createHash("sha256").update(password).digest("hex");

    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (existing) {
      await db
        .update(users)
        .set({ passwordHash })
        .where(eq(users.username, username));
      updated++;
    } else {
      await db.insert(users).values({ username, passwordHash });
      created++;
    }
  }

  return NextResponse.json({ created, updated });
}
