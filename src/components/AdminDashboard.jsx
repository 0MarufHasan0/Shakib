"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard({
  personalInfo,
  skills = [],
  researchProjects = [],
  experienceTimeline = [],
  clinicalCases = [],
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // UI States initialized from database records
  const [profile, setProfile] = useState(personalInfo || {});
  const [projects, setProjects] = useState(researchProjects || []);
  const [timeline, setTimeline] = useState(experienceTimeline || []);
  const [skillsList, setSkillsList] = useState(skills || []);
  const [cases, setCases] = useState(clinicalCases || []);
  const [messages, setMessages] = useState([]);

  // Upload loading states
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingProjectImg, setUploadingProjectImg] = useState(false);

  // Form Inputs for Projects
  const [newProject, setNewProject] = useState({
    title: "",
    category: "Molecular Docking",
    status: "Current Project",
    icon: "science",
    image: "",
    description: "",
    methodology: "",
    clinicalRelevance: "",
    tagsInput: "",
  });

  // Form Inputs for Timeline
  const [newTimeline, setNewTimeline] = useState({
    role: "",
    facility: "",
    period: "",
    type: "hospital",
    detailsInput: "",
  });

  // Form Inputs for Skills
  const [newSkill, setNewSkill] = useState({
    category: "Pharmaceutical",
    name: "",
    description: "",
  });

  // Form Inputs for Clinical Cases
  const [newCase, setNewCase] = useState({
    title: "",
    scenario: "",
    question: "",
    opt1Text: "",
    opt1Feedback: "",
    opt2Text: "",
    opt2Feedback: "",
    opt3Text: "",
    opt3Feedback: "",
    correctIdx: "0",
    explanation: "",
  });

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const triggerNotification = (msg) => {
    setSuccessMsg(msg);
    setErrorMsg("");
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const triggerError = (msg) => {
    setErrorMsg(msg);
    setSuccessMsg("");
    setTimeout(() => setErrorMsg(""), 5000);
  };

  // Image Upload Handlers
  const handleProfileImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingProfile(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProfile((prev) => ({ ...prev, image: data.url }));
        triggerNotification("Profile image uploaded successfully. Remember to click Save Profile Details below.");
      } else {
        triggerError(data.error || "Failed to upload profile image.");
      }
    } catch (err) {
      console.error(err);
      triggerError("Profile image upload failed.");
    } finally {
      setUploadingProfile(false);
    }
  };

  const handleProjectImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingProjectImg(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNewProject((prev) => ({ ...prev, image: data.url }));
        triggerNotification("Project image uploaded successfully.");
      } else {
        triggerError(data.error || "Failed to upload project image.");
      }
    } catch (err) {
      console.error(err);
      triggerError("Project image upload failed.");
    } finally {
      setUploadingProjectImg(false);
    }
  };

  // 1. Profile handler
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateProfile", data: profile }),
      });
      if (res.ok) {
        triggerNotification("Profile details saved successfully.");
      } else {
        const data = await res.json();
        triggerError(data.error || "Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      triggerError("Connection failure.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Project handlers
  const handleAddProjectSubmit = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      triggerError("Title and description are required.");
      return;
    }

    setLoading(true);
    const tags = newProject.tagsInput
      ? newProject.tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const dataPayload = {
      title: newProject.title,
      category: newProject.category,
      status: newProject.status,
      icon: newProject.icon,
      image: newProject.image || "https://images.unsplash.com/photo-1579154261294-a153a848c135?auto=format&fit=crop&w=600&q=80",
      description: newProject.description,
      methodology: newProject.methodology,
      clinicalRelevance: newProject.clinicalRelevance,
      tags,
    };

    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "addProject", data: dataPayload }),
      });

      if (res.ok) {
        const result = await res.json();
        setProjects([{ ...dataPayload, _id: result.insertedId }, ...projects]);
        triggerNotification("New research project published.");
        setNewProject({
          title: "",
          category: "Molecular Docking",
          status: "Current Project",
          icon: "science",
          image: "",
          description: "",
          methodology: "",
          clinicalRelevance: "",
          tagsInput: "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Delete this research project?")) return;
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deleteProject", data: { id } }),
      });
      if (res.ok) {
        setProjects(projects.filter((p) => (p._id !== id && p.id !== id)));
        triggerNotification("Project removed successfully.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Skills mutations (State nesting replacement)
  const handleAddSkillSubmit = async (e) => {
    e.preventDefault();
    if (!newSkill.name || !newSkill.description) {
      triggerError("Skill name and description are required.");
      return;
    }

    setLoading(true);
    let updatedSkills = [...skillsList];
    const categoryIdx = updatedSkills.findIndex(
      (s) => s.category.toLowerCase().includes(newSkill.category.toLowerCase())
    );

    if (categoryIdx > -1) {
      // Push to existing category list
      updatedSkills[categoryIdx].items.push({
        name: newSkill.name,
        description: newSkill.description,
      });
    } else {
      // Add brand new category doc
      let icon = "school";
      if (newSkill.category === "Research & In Silico") icon = "biotech";
      if (newSkill.category === "Technical Tools") icon = "precision_manufacturing";
      if (newSkill.category === "Soft Skills") icon = "groups";

      updatedSkills.push({
        category: newSkill.category,
        icon,
        description: `${newSkill.category} competencies catalog.`,
        items: [{ name: newSkill.name, description: newSkill.description }],
      });
    }

    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateSkills", data: { skills: updatedSkills } }),
      });

      if (res.ok) {
        setSkillsList(updatedSkills);
        triggerNotification("New skill added successfully!");
        setNewSkill({ ...newSkill, name: "", description: "" });
      } else {
        const d = await res.json();
        triggerError(d.error || "Failed to update skills.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (catName, skillName) => {
    if (!confirm(`Delete skill "${skillName}"?`)) return;
    
    let updatedSkills = skillsList.map((cat) => {
      if (cat.category === catName) {
        return {
          ...cat,
          items: cat.items.filter((item) => item.name !== skillName),
        };
      }
      return cat;
    }).filter((cat) => cat.items.length > 0); // Clear categories if they have no items

    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateSkills", data: { skills: updatedSkills } }),
      });
      if (res.ok) {
        setSkillsList(updatedSkills);
        triggerNotification("Competency removed successfully.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Clinical Cases mutations
  const handleAddCaseSubmit = async (e) => {
    e.preventDefault();
    if (!newCase.title || !newCase.scenario || !newCase.question) {
      triggerError("Title, scenario, and question are required.");
      return;
    }

    setLoading(true);
    const caseData = {
      title: newCase.title,
      scenario: newCase.scenario,
      question: newCase.question,
      options: [
        { text: newCase.opt1Text, isCorrect: newCase.correctIdx === "0", feedback: newCase.opt1Feedback },
        { text: newCase.opt2Text, isCorrect: newCase.correctIdx === "1", feedback: newCase.opt2Feedback },
        { text: newCase.opt3Text, isCorrect: newCase.correctIdx === "2", feedback: newCase.opt3Feedback },
      ],
      explanation: newCase.explanation,
    };

    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "addCase", data: caseData }),
      });

      if (res.ok) {
        const result = await res.json();
        setCases([...cases, { ...caseData, _id: result.insertedId }]);
        triggerNotification("New clinical case study added!");
        setNewCase({
          title: "",
          scenario: "",
          question: "",
          opt1Text: "",
          opt1Feedback: "",
          opt2Text: "",
          opt2Feedback: "",
          opt3Text: "",
          opt3Feedback: "",
          correctIdx: "0",
          explanation: "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCase = async (id) => {
    if (!confirm("Delete this clinical case study?")) return;
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deleteCase", data: { id } }),
      });
      if (res.ok) {
        setCases(cases.filter((c) => (c._id !== id && c.id !== id)));
        triggerNotification("Clinical case deleted.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 5. Timeline Handlers
  const handleAddTimelineSubmit = async (e) => {
    e.preventDefault();
    if (!newTimeline.role || !newTimeline.facility) {
      triggerError("Role and facility are required.");
      return;
    }

    setLoading(true);
    const details = newTimeline.detailsInput
      ? newTimeline.detailsInput.split("\n").map((d) => d.trim()).filter(Boolean)
      : [];

    const dataPayload = {
      role: newTimeline.role,
      facility: newTimeline.facility,
      period: newTimeline.period,
      type: newTimeline.type,
      details,
    };

    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "addTimeline", data: dataPayload }),
      });

      if (res.ok) {
        const result = await res.json();
        setTimeline([{ ...dataPayload, _id: result.insertedId }, ...timeline]);
        triggerNotification("Timeline milestone saved.");
        setNewTimeline({
          role: "",
          facility: "",
          period: "",
          type: "hospital",
          detailsInput: "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTimeline = async (id) => {
    if (!confirm("Delete timeline item?")) return;
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deleteTimeline", data: { id } }),
      });
      if (res.ok) {
        setTimeline(timeline.filter((t) => (t._id !== id && t.id !== id)));
        triggerNotification("Timeline entry removed.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 6. Messages clearance
  const handleDeleteMessage = async (id) => {
    if (!confirm("Delete message inquiry?")) return;
    try {
      const res = await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMessages(messages.filter((m) => m._id !== id));
        triggerNotification("Visitor query deleted.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row relative">
      {/* Sidebar navigation panel */}
      <aside className="w-full lg:w-64 bg-surface-container-lowest border-r border-outline-variant/60 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-4">
            <span className="material-symbols-outlined text-primary text-3xl font-semibold">
              admin_panel_settings
            </span>
            <div>
              <h2 className="font-headline-md text-base font-bold text-on-surface leading-none">
                Admin Console
              </h2>
              <span className="text-[10px] text-primary uppercase font-bold tracking-widest block mt-1">
                Database Editor
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5">
            {[
              { id: "overview", label: "Console Home", icon: "dashboard" },
              { id: "profile", label: "Profile Info", icon: "person" },
              { id: "projects", label: "Research", icon: "biotech" },
              { id: "skills", label: "Competencies", icon: "military_tech" },
              { id: "cases", label: "Clinical Cases", icon: "assignment" },
              { id: "timeline", label: "Experience", icon: "history_edu" },
              { id: "messages", label: "Inbox Messages", icon: "inbox", badge: messages.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-4.5 py-3.5 rounded-xl font-label-md text-label-md uppercase tracking-wider font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                  {tab.label}
                </span>
                {tab.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab.id ? "bg-white text-primary" : "bg-primary text-white"}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-outline-variant/30 flex flex-col gap-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border border-error text-error py-3.5 rounded-xl font-label-md text-label-md uppercase tracking-wider font-bold hover:bg-error/5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Exit Console
          </button>
          <a
            href="/"
            className="w-full text-center bg-surface border border-outline text-on-surface-variant py-3 rounded-xl font-label-md text-label-md uppercase tracking-wider font-bold hover:bg-surface-container transition-all"
          >
            Public Site
          </a>
        </div>
      </aside>

      {/* Main dashboard view */}
      <main className="flex-1 p-margin-mobile md:p-margin-desktop overflow-y-auto max-w-4xl">
        {/* Floating Notification Alerts */}
        {successMsg && (
          <div className="mb-6 p-4 bg-secondary/5 border border-secondary/20 text-secondary rounded-2xl font-body-sm text-body-sm font-semibold flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]">
            <span className="material-symbols-outlined">check_circle</span>
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 bg-error/5 border border-error/20 text-error rounded-2xl font-body-sm text-body-sm font-semibold flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]">
            <span className="material-symbols-outlined">warning</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-8 clinical-shadow space-y-4">
              <h3 className="font-display-lg text-2xl font-extrabold text-on-surface">
                Assalamu Alaikum, {profile.name || "Shakib"}!
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Welcome back to your administration portal. This dashboard gives you direct control over your research publications, clinical cases, timelines, and skills catalogs without needing to write database queries.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { count: projects.length, label: "Research", icon: "biotech", color: "text-primary" },
                { count: skillsList.reduce((acc, cat) => acc + cat.items.length, 0), label: "Competencies", icon: "military_tech", color: "text-secondary" },
                { count: timeline.length, label: "Timeline items", icon: "history_edu", color: "text-primary" },
                { count: messages.length, label: "Inbox Messages", icon: "inbox", color: "text-secondary" },
              ].map((stat, idx) => (
                <div key={idx} className="p-5.5 bg-surface-container-lowest border border-outline-variant/50 rounded-2xl clinical-shadow flex flex-col gap-2">
                  <span className={`material-symbols-outlined ${stat.color} text-3xl`}>{stat.icon}</span>
                  <div>
                    <span className="block font-display-lg text-3xl font-extrabold text-on-surface">{stat.count}</span>
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mt-0.5">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick inbox summary */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6.5 clinical-shadow space-y-4">
              <h4 className="font-headline-md text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">mark_email_unread</span>
                Recent Messages ({messages.length})
              </h4>
              {messages.length > 0 ? (
                <div className="p-4.5 bg-surface rounded-2xl border border-outline-variant/20 flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="font-headline-md text-sm font-bold text-on-surface">{messages[0].subject}</p>
                      <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">From: {messages[0].name} ({messages[0].email})</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("messages")}
                      className="text-[11px] font-bold text-primary hover:underline"
                    >
                      Open Inbox
                    </button>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-2 leading-relaxed italic">
                    "{messages[0].message}"
                  </p>
                </div>
              ) : (
                <p className="font-body-sm text-body-sm text-on-surface-variant italic">No new inquiries available in your database inbox.</p>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE INFO */}
        {activeTab === "profile" && (
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 md:p-8 clinical-shadow space-y-6">
            <h3 className="font-headline-lg text-xl font-extrabold text-on-surface border-b border-outline-variant/20 pb-4">
              Edit Scholar Profile
            </h3>
            
            <form onSubmit={handleProfileSubmit} className="space-y-5">
              {/* Profile Image Upload Component */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4.5 bg-surface border border-outline-variant/30 rounded-2xl">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-outline-variant flex-shrink-0 bg-surface-container">
                  <img
                    src={profile.image || "/profile.jpg"}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                  {uploadingProfile && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white animate-spin text-lg">progress_activity</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="font-headline-md text-sm font-bold text-on-surface">Profile Portrait Photo</h4>
                  <p className="text-[11px] text-on-surface-variant">
                    Upload a high-quality professional portrait (JPG or PNG).
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
                    <label className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/5 rounded-xl font-label-md text-xs font-bold cursor-pointer transition-all">
                      <span className="material-symbols-outlined text-base">cloud_upload</span>
                      Choose Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileImageUpload}
                        disabled={uploadingProfile}
                      />
                    </label>
                    {profile.image && (
                      <button
                        type="button"
                        onClick={() => setProfile({ ...profile, image: "" })}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-outline text-on-surface-variant hover:bg-surface-container rounded-xl font-label-md text-xs font-bold cursor-pointer transition-all"
                      >
                        Reset to Default
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Full Name</label>
                  <input
                    type="text"
                    value={profile.name || ""}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Academic Degree</label>
                  <input
                    type="text"
                    value={profile.degree || ""}
                    onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                    className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Headline Title</label>
                  <input
                    type="text"
                    value={profile.title || ""}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Subtitle Focus</label>
                  <input
                    type="text"
                    value={profile.subtitle || ""}
                    onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
                    className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Scholar Biography</label>
                <textarea
                  rows={4}
                  value={profile.bio || ""}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-outline-variant/20 pt-5">
                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Public Email</label>
                  <input
                    type="text"
                    value={profile.email || ""}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">LinkedIn URL</label>
                  <input
                    type="text"
                    value={profile.linkedin || ""}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">ResearchGate URL</label>
                  <input
                    type="text"
                    value={profile.researchgate || ""}
                    onChange={(e) => setProfile({ ...profile, researchgate: e.target.value })}
                    className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3.5 rounded-xl hover:bg-primary-container font-bold shadow-md cursor-pointer"
                >
                  Save Profile Details
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: RESEARCH PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            {/* Form to Add New Project */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 md:p-8 clinical-shadow space-y-6">
              <h3 className="font-headline-lg text-xl font-extrabold text-on-surface border-b border-outline-variant/20 pb-4">
                Add Research Initiative
              </h3>
              
              <form onSubmit={handleAddProjectSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Project Title</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="e.g. Selective binding analysis against COX-2..."
                      className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                    >
                      <option value="Molecular Docking">Molecular Docking</option>
                      <option value="Oncology">Oncology</option>
                      <option value="Pharmacology">Pharmacology</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Status</label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                      className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                    >
                      <option value="Current Initiative">Current Initiative</option>
                      <option value="Active Exploration">Active Exploration</option>
                      <option value="Completed Project">Completed Project</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={newProject.tagsInput}
                      onChange={(e) => setNewProject({ ...newProject, tagsInput: e.target.value })}
                      placeholder="e.g. Oncology, Bio-informatics, ADMET"
                      className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>
                </div>

                {/* Project Image Selection / Upload */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4.5 bg-surface border border-outline-variant/30 rounded-2xl">
                  <div className="relative w-32 h-20 rounded-xl overflow-hidden border border-outline-variant flex-shrink-0 bg-surface-container">
                    {newProject.image ? (
                      <img
                        src={newProject.image}
                        alt="Project Card Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant/40 bg-surface-container">
                        <span className="material-symbols-outlined text-2xl">image</span>
                        <span className="text-[10px]">No Image</span>
                      </div>
                    )}
                    {uploadingProjectImg && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white animate-spin text-lg">progress_activity</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <h4 className="font-headline-md text-sm font-bold text-on-surface">Project Cover Image</h4>
                    <p className="text-[11px] text-on-surface-variant">
                      Upload a customized cover image for this research card, or leave empty for a default laboratory banner.
                    </p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
                      <label className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/5 rounded-xl font-label-md text-xs font-bold cursor-pointer transition-all">
                        <span className="material-symbols-outlined text-base">cloud_upload</span>
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProjectImageUpload}
                          disabled={uploadingProjectImg}
                        />
                      </label>
                      {newProject.image && (
                        <button
                          type="button"
                          onClick={() => setNewProject({ ...newProject, image: "" })}
                          className="inline-flex items-center gap-2 px-4 py-2 border border-outline text-on-surface-variant hover:bg-surface-container rounded-xl font-label-md text-xs font-bold cursor-pointer transition-all"
                        >
                          Clear Image
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Overview Description</label>
                  <textarea
                    rows={3}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Provide a general summary of the research study..."
                    className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Workflow Methodology</label>
                    <textarea
                      rows={3}
                      value={newProject.methodology}
                      onChange={(e) => setNewProject({ ...newProject, methodology: e.target.value })}
                      placeholder="Detail grid parameters, docking protocols, or software systems..."
                      className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Clinical Significance</label>
                    <textarea
                      rows={3}
                      value={newProject.clinicalRelevance}
                      onChange={(e) => setNewProject({ ...newProject, clinicalRelevance: e.target.value })}
                      placeholder="Explain how this research helps patient-centered therapy design..."
                      className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3.5 rounded-xl font-bold shadow-md cursor-pointer"
                  >
                    Add Research Project
                  </button>
                </div>
              </form>
            </div>

            {/* List of Projects */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 md:p-8 clinical-shadow space-y-6">
              <h3 className="font-headline-lg text-xl font-extrabold text-on-surface border-b border-outline-variant/20 pb-4">
                Manage Existing Projects ({projects.length})
              </h3>

              <div className="divide-y divide-outline-variant/20">
                {projects.map((p) => (
                  <div key={p._id || p.id} className="py-4.5 flex justify-between items-center gap-4">
                    <div>
                      <h4 className="font-headline-md text-base font-bold text-on-surface">{p.title}</h4>
                      <div className="flex gap-2 items-center mt-1">
                        <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full font-label-sm text-[10px] uppercase font-bold">
                          {p.category}
                        </span>
                        <span className="text-label-sm text-[11px] text-on-surface-variant font-medium">
                          {p.status}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteProject(p._id || p.id)}
                      className="p-2.5 border border-error/30 text-error hover:bg-error/5 rounded-xl cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg flex items-center justify-center">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SKILLS MANAGER */}
        {activeTab === "skills" && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            {/* Form to Add New Skill */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 md:p-8 clinical-shadow space-y-6">
              <h3 className="font-headline-lg text-xl font-extrabold text-on-surface border-b border-outline-variant/20 pb-4">
                Add Core Competency
              </h3>

              <form onSubmit={handleAddSkillSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Category</label>
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                      className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                    >
                      <option value="Pharmaceutical">Clinical & Pharmaceutical</option>
                      <option value="Research & In Silico">Research & In Silico</option>
                      <option value="Technical Tools">Technical Tools</option>
                      <option value="Soft Skills">Soft Skills</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Competency / Skill Name</label>
                    <input
                      type="text"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      placeholder="e.g. ADMET Prediction"
                      className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Description / Application</label>
                  <textarea
                    rows={3}
                    value={newSkill.description}
                    onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                    placeholder="Describe how this skill applies in pharmacy practice or structural modeling studies..."
                    className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                  />
                </div>

                <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3.5 rounded-xl font-bold shadow-md cursor-pointer"
                  >
                    Add Competency
                  </button>
                </div>
              </form>
            </div>

            {/* List of Skills grouped by Category */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 md:p-8 clinical-shadow space-y-6">
              <h3 className="font-headline-lg text-xl font-extrabold text-on-surface border-b border-outline-variant/20 pb-4">
                Manage Competencies Catalog
              </h3>

              <div className="space-y-6 divide-y divide-outline-variant/10">
                {skillsList.map((cat, idx) => (
                  <div key={idx} className={idx > 0 ? "pt-5 space-y-3" : "space-y-3"}>
                    <h4 className="font-headline-md text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                      {cat.category}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 mt-3">
                      {cat.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="p-4 bg-surface border border-outline-variant/30 rounded-2xl flex justify-between items-start gap-3 hover:border-primary/20 transition-all"
                        >
                          <div>
                            <span className="font-body-md text-sm font-bold text-on-surface block">{item.name}</span>
                            <span className="text-[12px] text-on-surface-variant mt-1 block leading-relaxed">{item.description}</span>
                          </div>

                          <button
                            onClick={() => handleDeleteSkill(cat.category, item.name)}
                            className="p-1.5 border border-error/20 text-error hover:bg-error/5 rounded-lg flex-shrink-0 cursor-pointer"
                            title="Delete Skill"
                          >
                            <span className="material-symbols-outlined text-base flex items-center justify-center">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CLINICAL CASES EDITOR */}
        {activeTab === "cases" && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            {/* Form to Add Case */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 md:p-8 clinical-shadow space-y-6">
              <h3 className="font-headline-lg text-xl font-extrabold text-on-surface border-b border-outline-variant/20 pb-4">
                Create Clinical Case Study
              </h3>

              <form onSubmit={handleAddCaseSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Case Title / Topic</label>
                  <input
                    type="text"
                    value={newCase.title}
                    onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                    placeholder="e.g. Case 4: Pediatric Antibiotic Dosage"
                    className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Patient Scenario / Clinical Vignette</label>
                  <textarea
                    rows={3}
                    value={newCase.scenario}
                    onChange={(e) => setNewCase({ ...newCase, scenario: e.target.value })}
                    placeholder="A 5-year-old child admitted with severe..."
                    className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Pharmacist Consultation Question</label>
                  <input
                    type="text"
                    value={newCase.question}
                    onChange={(e) => setNewCase({ ...newCase, question: e.target.value })}
                    placeholder="What recommendation should the pharmacist make?"
                    className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                  />
                </div>

                {/* Choices & Feedbacks */}
                <div className="space-y-4 border-t border-outline-variant/20 pt-4">
                  <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">Multiple Choice Options</h4>
                  
                  {/* Option 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4.5 bg-surface border border-outline-variant/30 rounded-2xl">
                    <div className="space-y-1.5">
                      <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Option 1 Text</label>
                      <input
                        type="text"
                        value={newCase.opt1Text}
                        onChange={(e) => setNewCase({ ...newCase, opt1Text: e.target.value })}
                        placeholder="Answer Option A"
                        className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container-lowest focus:outline-none text-on-surface"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Option 1 Feedback (displays on selection)</label>
                      <input
                        type="text"
                        value={newCase.opt1Feedback}
                        onChange={(e) => setNewCase({ ...newCase, opt1Feedback: e.target.value })}
                        placeholder="Explanation for this option..."
                        className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container-lowest focus:outline-none text-on-surface"
                      />
                    </div>
                  </div>

                  {/* Option 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4.5 bg-surface border border-outline-variant/30 rounded-2xl">
                    <div className="space-y-1.5">
                      <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Option 2 Text</label>
                      <input
                        type="text"
                        value={newCase.opt2Text}
                        onChange={(e) => setNewCase({ ...newCase, opt2Text: e.target.value })}
                        placeholder="Answer Option B"
                        className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container-lowest focus:outline-none text-on-surface"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Option 2 Feedback</label>
                      <input
                        type="text"
                        value={newCase.opt2Feedback}
                        onChange={(e) => setNewCase({ ...newCase, opt2Feedback: e.target.value })}
                        placeholder="Explanation for this option..."
                        className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container-lowest focus:outline-none text-on-surface"
                      />
                    </div>
                  </div>

                  {/* Option 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4.5 bg-surface border border-outline-variant/30 rounded-2xl">
                    <div className="space-y-1.5">
                      <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Option 3 Text</label>
                      <input
                        type="text"
                        value={newCase.opt3Text}
                        onChange={(e) => setNewCase({ ...newCase, opt3Text: e.target.value })}
                        placeholder="Answer Option C"
                        className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container-lowest focus:outline-none text-on-surface"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Option 3 Feedback</label>
                      <input
                        type="text"
                        value={newCase.opt3Feedback}
                        onChange={(e) => setNewCase({ ...newCase, opt3Feedback: e.target.value })}
                        placeholder="Explanation for this option..."
                        className="w-full p-3 border border-outline-variant rounded-lg bg-surface-container-lowest focus:outline-none text-on-surface"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div className="space-y-1.5">
                      <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Correct Option</label>
                      <select
                        value={newCase.correctIdx}
                        onChange={(e) => setNewCase({ ...newCase, correctIdx: e.target.value })}
                        className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none text-on-surface"
                      >
                        <option value="0">Option 1 is Correct</option>
                        <option value="1">Option 2 is Correct</option>
                        <option value="2">Option 3 is Correct</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Pharmacological Rationale</label>
                      <input
                        type="text"
                        value={newCase.explanation}
                        onChange={(e) => setNewCase({ ...newCase, explanation: e.target.value })}
                        placeholder="Scientific rationale explaining the drug kinetics..."
                        className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none text-on-surface"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3.5 rounded-xl font-bold shadow-md cursor-pointer"
                  >
                    Save Case Study
                  </button>
                </div>
              </form>
            </div>

            {/* List of cases */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 md:p-8 clinical-shadow space-y-6">
              <h3 className="font-headline-lg text-xl font-extrabold text-on-surface border-b border-outline-variant/20 pb-4">
                Manage Case Studies ({cases.length})
              </h3>

              <div className="divide-y divide-outline-variant/20">
                {cases.map((c) => (
                  <div key={c._id || c.id} className="py-4.5 flex justify-between items-center gap-4">
                    <div>
                      <h4 className="font-headline-md text-base font-bold text-on-surface">{c.title}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mt-0.5">{c.scenario}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteCase(c._id || c.id)}
                      className="p-2.5 border border-error/30 text-error hover:bg-error/5 rounded-xl cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg flex items-center justify-center">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: TIMELINE EXPERIENCE */}
        {activeTab === "timeline" && (
          <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 md:p-8 clinical-shadow space-y-6">
              <h3 className="font-headline-lg text-xl font-extrabold text-on-surface border-b border-outline-variant/20 pb-4">
                Add Timeline Milestone
              </h3>

              <form onSubmit={handleAddTimelineSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Rotation Role / Title</label>
                    <input
                      type="text"
                      value={newTimeline.role}
                      onChange={(e) => setNewTimeline({ ...newTimeline, role: e.target.value })}
                      placeholder="e.g. Clinical Pharmacy Trainee"
                      className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Institution / Facility</label>
                    <input
                      type="text"
                      value={newTimeline.facility}
                      onChange={(e) => setNewTimeline({ ...newTimeline, facility: e.target.value })}
                      placeholder="e.g. KYAU Teaching Hospital Wards"
                      className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Period / Year</label>
                    <input
                      type="text"
                      value={newTimeline.period}
                      onChange={(e) => setNewTimeline({ ...newTimeline, period: e.target.value })}
                      placeholder="e.g. Clinical Rotation"
                      className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Milestone Type</label>
                    <select
                      value={newTimeline.type}
                      onChange={(e) => setNewTimeline({ ...newTimeline, type: e.target.value })}
                      className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary text-on-surface"
                    >
                      <option value="hospital">Hospital Wards Practice</option>
                      <option value="dispensing">Pharmacy Dispensing operations</option>
                      <option value="academic">Advanced Academic studies</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Checked Achievements (One per line)</label>
                  <textarea
                    rows={4}
                    value={newTimeline.detailsInput}
                    onChange={(e) => setNewTimeline({ ...newTimeline, detailsInput: e.target.value })}
                    placeholder="Participated in ward rounds&#10;Conducted medication reconciliation..."
                    className="w-full p-3.5 border border-outline-variant rounded-xl bg-surface focus:outline-none focus:border-primary resize-none text-on-surface"
                  />
                </div>

                <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3.5 rounded-xl font-bold shadow-md cursor-pointer"
                  >
                    Save Timeline entry
                  </button>
                </div>
              </form>
            </div>

            {/* List of Timeline elements */}
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 md:p-8 clinical-shadow space-y-6">
              <h3 className="font-headline-lg text-xl font-extrabold text-on-surface border-b border-outline-variant/20 pb-4">
                Manage Timeline Entries ({timeline.length})
              </h3>

              <div className="divide-y divide-outline-variant/20">
                {timeline.map((t) => (
                  <div key={t._id || t.id} className="py-4.5 flex justify-between items-center gap-4">
                    <div>
                      <h4 className="font-headline-md text-base font-bold text-on-surface">{t.role}</h4>
                      <p className="text-label-sm text-[11px] text-on-surface-variant">{t.facility} | {t.period}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteTimeline(t._id || t.id)}
                      className="p-2.5 border border-error/30 text-error hover:bg-error/5 rounded-xl cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg flex items-center justify-center">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: VISITOR INBOX MESSAGES */}
        {activeTab === "messages" && (
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 md:p-8 clinical-shadow space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 flex-wrap gap-2">
              <h3 className="font-headline-lg text-xl font-extrabold text-on-surface">
                Visitor Inquiry Inbox ({messages.length})
              </h3>
              <button
                onClick={fetchMessages}
                className="p-2 border border-outline-variant hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm rounded-xl cursor-pointer flex items-center gap-1 font-semibold text-on-surface"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
                Refresh Inbox
              </button>
            </div>

            {messages.length > 0 ? (
              <div className="space-y-5.5">
                {messages.map((m) => (
                  <div
                    key={m._id}
                    className="p-5.5 bg-surface border border-outline-variant/30 rounded-2xl flex flex-col justify-between gap-4.5"
                  >
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div>
                        <h4 className="font-headline-md text-base font-bold text-on-surface leading-tight">
                          {m.subject}
                        </h4>
                        <p className="text-label-sm font-label-sm text-on-surface-variant font-medium mt-1">
                          From: <span className="text-primary font-bold">{m.name}</span> | <a href={`mailto:${m.email}`} className="underline hover:text-primary">{m.email}</a>
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-label-sm font-label-sm text-[10px] bg-outline-variant/35 px-2.5 py-0.5 rounded-full text-on-surface-variant">
                          {new Date(m.createdAt).toLocaleDateString()}
                        </span>
                        
                        <button
                          onClick={() => handleDeleteMessage(m._id)}
                          className="p-1.5 border border-error/30 text-error hover:bg-error/5 rounded-lg cursor-pointer flex items-center justify-center"
                          title="Clear Message"
                        >
                          <span className="material-symbols-outlined text-base flex items-center justify-center">delete</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-surface-container-lowest border border-outline-variant/15 rounded-xl">
                      <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-pre-wrap leading-relaxed">
                        {m.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-surface border border-outline-variant/30 rounded-2xl max-w-sm mx-auto p-8">
                <span className="material-symbols-outlined text-outline-variant text-5xl">mail_outline</span>
                <h4 className="font-headline-md text-base font-bold text-on-surface mt-4">Inbox is Empty</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Inquiries submitted via the portfolio contact form will display here.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
