import { getDb } from "@/lib/mongodb";
import { dbSeed } from "@/lib/dbSeed";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import About from "../components/About";
import Skills from "../components/Skills";
import DockingSimulator from "../components/DockingSimulator";
import ClinicalCases from "../components/ClinicalCases";
import Research from "../components/Research";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

// Serialization helper to map MongoDB object structures to JSON-safe props
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

export default async function Home() {
  // Ensure database collections are populated with initial data if empty
  await dbSeed();

  let personalInfoData = null;
  let skillsData = [];
  let researchProjectsData = [];
  let experienceTimelineData = [];
  let clinicalCasesData = [];

  try {
    const db = await getDb();

    // Query all portfolio collections in parallel
    const [personalInfoDoc, skillsDocs, researchDocs, timelineDocs, casesDocs] = await Promise.all([
      db.collection("personalInfo").findOne(),
      db.collection("skills").find().toArray(),
      db.collection("researchProjects").find().toArray(),
      db.collection("experienceTimeline").find().toArray(),
      db.collection("clinicalCases").find().toArray(),
    ]);

    // Serialize database cursor results to remove MongoDB _id types before passing to client components
    personalInfoData = serializeDoc(personalInfoDoc);
    skillsData = serializeArray(skillsDocs);
    researchProjectsData = serializeArray(researchDocs);
    experienceTimelineData = serializeArray(timelineDocs);
    clinicalCasesData = serializeArray(casesDocs);
  } catch (error) {
    console.error("Database connection or query failed. Falling back to local data source.", error);
    // In case of database failure, fall back to static local portfolioData import
    const fallback = await import("../data/portfolioData");
    personalInfoData = fallback.personalInfo;
    skillsData = fallback.skills;
    researchProjectsData = fallback.researchProjects;
    experienceTimelineData = fallback.experienceTimeline;
    clinicalCasesData = fallback.clinicalCases;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Header navbar */}
      <Navbar personalInfo={personalInfoData} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero personalInfo={personalInfoData} />

        {/* Bento grid highlights */}
        <Highlights />

        {/* Dynamic Bio profile & Academic Timeline */}
        <About personalInfo={personalInfoData} />

        {/* Searchable and Filterable Research Projects */}
        <Research researchProjects={researchProjectsData} />

        {/* Interactive biochemical simulator */}
        <DockingSimulator />

        {/* Clinical pharmacist round consult simulation */}
        <ClinicalCases clinicalCases={clinicalCasesData} />

        {/* Competencies details drawer */}
        <Skills skills={skillsData} />

        {/* Timeline rotation experience */}
        <Experience experienceTimeline={experienceTimelineData} />

        {/* Contact credentials card */}
        <Contact personalInfo={personalInfoData} />
      </main>

      {/* Footer credits and social hubs */}
      <Footer personalInfo={personalInfoData} />
    </div>
  );
}
