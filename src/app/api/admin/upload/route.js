import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    // 1. Session verification check
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== "authenticated") {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file was uploaded." },
        { status: 400 }
      );
    }

    // 2. Ensure public/uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 3. Generate unique filename to avoid duplicates
    const fileExtension = path.extname(file.name) || ".jpg";
    const uniqueName = `file_${Date.now()}_${Math.floor(Math.random() * 1000)}${fileExtension}`;
    const filePath = path.join(uploadDir, uniqueName);

    // 4. Convert File object to ArrayBuffer then write to disk
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.promises.writeFile(filePath, buffer);

    // 5. Return the public asset route path
    const fileUrl = `/uploads/${uniqueName}`;
    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Upload API Route Error:", error);
    return NextResponse.json(
      { error: `Internal server error occurred during file upload: ${error.message}. Stack: ${error.stack}` },
      { status: 500 }
    );
  }
}
