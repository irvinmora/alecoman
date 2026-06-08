import { NextResponse } from "next/server";
import { validateCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  if (validateCredentials(username, password)) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: "Credenciales incorrectas" }, { status: 401 });
}
