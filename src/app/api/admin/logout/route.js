import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout API Route Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred during logout." },
      { status: 500 }
    );
  }
}
