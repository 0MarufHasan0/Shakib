import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== "authenticated") {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const db = await getDb();
    const messages = await db
      .collection("messages")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Serialize ObjectId to plain strings
    const serializedMessages = messages.map((m) => ({
      ...m,
      _id: m._id.toString(),
      createdAt: m.createdAt instanceof Date ? m.createdAt.toISOString() : m.createdAt,
    }));

    return NextResponse.json({ success: true, messages: serializedMessages });
  } catch (error) {
    console.error("Messages GET API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error while retrieving inbox messages." },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== "authenticated") {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing message ID parameter." },
        { status: 400 }
      );
    }

    const db = await getDb();
    let filter = {};
    if (ObjectId.isValid(id)) {
      filter = { _id: new ObjectId(id) };
    } else {
      filter = { id: id };
    }

    await db.collection("messages").deleteOne(filter);
    
    return NextResponse.json({ success: true, message: "Inquiry deleted successfully." });
  } catch (error) {
    console.error("Messages DELETE API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error while deleting the inbox message." },
      { status: 500 }
    );
  }
}
