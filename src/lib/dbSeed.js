import { getDb } from "./mongodb";
import {
  personalInfo,
  skills,
  researchProjects,
  experienceTimeline,
  clinicalCases
} from "../data/portfolioData";

export async function dbSeed() {
  try {
    const db = await getDb();
    
    // 1. Seed Personal Info
    const personalInfoColl = db.collection("personalInfo");
    const personalCount = await personalInfoColl.countDocuments();
    if (personalCount === 0) {
      console.log("Database: Seeding personalInfo...");
      await personalInfoColl.insertOne(personalInfo);
    }

    // 2. Seed Skills
    const skillsColl = db.collection("skills");
    const skillsCount = await skillsColl.countDocuments();
    if (skillsCount === 0) {
      console.log("Database: Seeding skills...");
      await skillsColl.insertMany(skills);
    }

    // 3. Seed Research Projects
    const researchColl = db.collection("researchProjects");
    const researchCount = await researchColl.countDocuments();
    if (researchCount === 0) {
      console.log("Database: Seeding researchProjects...");
      await researchColl.insertMany(researchProjects);
    }

    // 4. Seed Experience Timeline
    const timelineColl = db.collection("experienceTimeline");
    const timelineCount = await timelineColl.countDocuments();
    if (timelineCount === 0) {
      console.log("Database: Seeding experienceTimeline...");
      await timelineColl.insertMany(experienceTimeline);
    }

    // 5. Seed Clinical Cases
    const casesColl = db.collection("clinicalCases");
    const casesCount = await casesColl.countDocuments();
    if (casesCount === 0) {
      console.log("Database: Seeding clinicalCases...");
      await casesColl.insertMany(clinicalCases);
    }

    console.log("Database: Seeding verification completed successfully.");
  } catch (error) {
    console.error("Database Seeding Error:", error);
  }
}
