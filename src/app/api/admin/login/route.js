import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password field is required." },
        { status: 400 }
      );
    }

    if (password === process.env.ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day session duration
        path: "/",
      });
      
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Incorrect password. Access denied." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login API Route Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred during login." },
      { status: 500 }
    );
  }
}
