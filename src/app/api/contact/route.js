import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All form fields (name, email, subject, message) are required." },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address syntax." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const messagesColl = db.collection("messages");

    const newMessage = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date(),
    };

    const result = await messagesColl.insertOne(newMessage);

    return NextResponse.json(
      { success: true, messageId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Contact Route Error:", error);
    return NextResponse.json(
      { error: "Failed to store contact submission on MongoDB database server." },
      { status: 500 }
    );
  }
}
