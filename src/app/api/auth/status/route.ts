import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, COOKIE_NAME } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;

  if (!session || !verifySession(session)) {
    return NextResponse.json({ authed: false });
  }

  return NextResponse.json({ authed: true });
}
