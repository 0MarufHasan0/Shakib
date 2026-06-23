import { cookies } from "next/headers";
import { getDb } from "@/lib/mongodb";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

function serializeDoc(doc) {
  if (!doc) return null;
  const serialized = { ...doc };
  if (serialized._id) {
    serialized._id = serialized._id.toString();
  }
  return serialized;
}

function serializeArray(arr) {
  if (!arr) return [];
  return arr.map(serializeDoc);
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  // Validate admin authentication cookie
  if (!session || session.value !== "authenticated") {
    return <AdminLogin />;
  }

  let personalInfoData = {};
  let skillsData = [];
  let researchProjectsData = [];
  let experienceTimelineData = [];
  let clinicalCasesData = [];

  try {
    const db = await getDb();

    // Query collections in parallel to populate the dashboard forms
    const [personalInfoDoc, skillsDocs, researchDocs, timelineDocs, casesDocs] = await Promise.all([
      db.collection("personalInfo").findOne(),
      db.collection("skills").find().toArray(),
      db.collection("researchProjects").find().toArray(),
      db.collection("experienceTimeline").find().toArray(),
      db.collection("clinicalCases").find().toArray(),
    ]);

    personalInfoData = serializeDoc(personalInfoDoc) || {};
    skillsData = serializeArray(skillsDocs);
    researchProjectsData = serializeArray(researchDocs);
    experienceTimelineData = serializeArray(timelineDocs);
    clinicalCasesData = serializeArray(casesDocs);
  } catch (error) {
    console.error("Admin dashboard data fetch failed:", error);
  }

  return (
    <AdminDashboard
      personalInfo={personalInfoData}
      skills={skillsData}
      researchProjects={researchProjectsData}
      experienceTimeline={experienceTimelineData}
      clinicalCases={clinicalCasesData}
    />
  );
}
