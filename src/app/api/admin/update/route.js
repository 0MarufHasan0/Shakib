import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    // 1. Session verification check
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== "authenticated") {
      return NextResponse.json(
        { error: "Unauthorized access. Please log in first." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, data } = body;

    if (!action || !data) {
      return NextResponse.json(
        { error: "Request body must contain both action and data fields." },
        { status: 400 }
      );
    }

    const db = await getDb();

    switch (action) {
      // Profile Info Mutations
      case "updateProfile": {
        // Strip out _id if present in data payload
        const updateData = { ...data };
        delete updateData._id;
        
        await db.collection("personalInfo").updateOne({}, { $set: updateData });
        return NextResponse.json({ success: true, message: "Profile info updated successfully." });
      }

      // Research Projects Mutations
      case "addProject": {
        const newProject = {
          ...data,
          createdAt: new Date(),
        };
        const result = await db.collection("researchProjects").insertOne(newProject);
        return NextResponse.json({ success: true, insertedId: result.insertedId });
      }

      case "deleteProject": {
        const id = data.id;
        let filter = {};
        if (ObjectId.isValid(id)) {
          filter = { _id: new ObjectId(id) };
        } else {
          filter = { id: id };
        }
        await db.collection("researchProjects").deleteOne(filter);
        return NextResponse.json({ success: true, message: "Project deleted successfully." });
      }

      // Timeline Experience Mutations
      case "addTimeline": {
        const newTimeline = {
          ...data,
          createdAt: new Date(),
        };
        const result = await db.collection("experienceTimeline").insertOne(newTimeline);
        return NextResponse.json({ success: true, insertedId: result.insertedId });
      }

      case "deleteTimeline": {
        const id = data.id;
        let filter = {};
        if (ObjectId.isValid(id)) {
          filter = { _id: new ObjectId(id) };
        } else {
          filter = { id: id };
        }
        await db.collection("experienceTimeline").deleteOne(filter);
        return NextResponse.json({ success: true, message: "Timeline entry deleted successfully." });
      }

      // Clinical Case Mutations
      case "addCase": {
        const newCase = {
          ...data,
          createdAt: new Date(),
        };
        const result = await db.collection("clinicalCases").insertOne(newCase);
        return NextResponse.json({ success: true, insertedId: result.insertedId });
      }

      case "deleteCase": {
        const id = data.id;
        let filter = {};
        if (ObjectId.isValid(id)) {
          filter = { _id: new ObjectId(id) };
        } else {
          filter = { id: id };
        }
        await db.collection("clinicalCases").deleteOne(filter);
        return NextResponse.json({ success: true, message: "Clinical case study deleted successfully." });
      }

      // Skills Category replacement
      case "updateSkills": {
        const skillsArray = data.skills;
        if (!Array.isArray(skillsArray)) {
          return NextResponse.json({ error: "Skills payload must be an array." }, { status: 400 });
        }
        // Replace current category documents with new schema list
        await db.collection("skills").deleteMany({});
        if (skillsArray.length > 0) {
          await db.collection("skills").insertMany(skillsArray);
        }
        return NextResponse.json({ success: true, message: "Skills updated successfully." });
      }

      default:
        return NextResponse.json(
          { error: `Requested mutation action '${action}' is not supported.` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Mutation API Route Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred while writing modifications to MongoDB." },
      { status: 500 }
    );
  }
}
