"use client";

import { useState } from "react";
export default function Research({ researchProjects = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ["All", "Molecular Docking", "Oncology", "Pharmacology"];

  const filteredProjects = researchProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop overflow-hidden bg-surface-container-low/30" id="research">
      <div className="max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold mb-3">
              Research Portfolio
            </div>
            <h2 className="font-display-lg text-3xl md:text-display-lg text-on-surface font-extrabold tracking-tight">
              Research Initiatives
            </h2>
            <div className="h-1.5 w-24 bg-primary mt-4 rounded-full"></div>
          </div>

          {/* Search bar input */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Search research or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-outline-variant bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-xl focus:border-primary focus:outline-none transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4.5 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider font-bold transition-all cursor-pointer ${
                selectedCategory === category
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:border-outline-variant/60"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid of Projects */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className="group bg-surface-container-lowest border border-outline-variant/50 rounded-2xl overflow-hidden clinical-shadow hover:border-primary transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  {/* Project Image banner */}
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={project.image}
                      alt={project.title}
                    />
                    <span className="absolute top-4 right-4 px-3.5 py-1 bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant/30 rounded-full font-label-sm text-[10px] uppercase font-bold text-primary shadow-sm">
                      {project.status}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6.5 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {project.icon}
                      </span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="font-headline-md text-[17px] font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer labels */}
                <div className="px-6.5 pb-6 pt-4 border-t border-outline-variant/10 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-surface text-on-surface-variant border border-outline-variant/20 rounded font-label-sm text-[10px] uppercase font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[12px] font-bold text-primary flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                    View Methodology Details <span className="material-symbols-outlined text-sm">east</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-8 clinical-shadow max-w-md mx-auto">
            <span className="material-symbols-outlined text-outline-variant text-5xl">
              search_off
            </span>
            <h3 className="font-headline-md text-base font-bold text-on-surface mt-4">
              No Initiatives Found
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Try adjusting your keyword query or switching filter category tags.
            </p>
          </div>
        )}

      </div>

      {/* Dynamic Detail Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-xs flex items-center justify-center p-margin-mobile overflow-y-auto"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="w-full max-w-2xl bg-surface rounded-3xl overflow-hidden shadow-2xl relative flex flex-col animate-[scaleIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="h-44 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10"></div>
              <img
                className="w-full h-full object-cover"
                src={activeModalProject.image}
                alt={activeModalProject.title}
              />
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 z-20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              <div className="absolute bottom-4 left-6 right-6 z-20">
                <span className="px-3 py-1 bg-primary text-on-primary font-label-sm text-[10px] uppercase font-bold rounded-full border border-primary/20">
                  {activeModalProject.status}
                </span>
                <h3 className="font-headline-lg text-lg sm:text-xl font-bold text-white mt-2 leading-tight">
                  {activeModalProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              
              <div className="flex flex-wrap gap-4 items-center text-label-sm font-label-sm text-on-surface-variant border-b border-outline-variant/30 pb-4">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-base">folder</span>
                  Category: <span className="font-bold text-on-surface">{activeModalProject.category}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-base">tag</span>
                  Methodology: <span className="font-bold text-on-surface">In Silico</span>
                </span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                  Overview
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {activeModalProject.description}
                </p>
              </div>

              {/* Research Methodology */}
              <div className="p-5 bg-surface-container-low border border-outline-variant/30 rounded-2xl space-y-2">
                <h4 className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">biotech</span>
                  Simulation Workflow & Methods
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {activeModalProject.methodology}
                </p>
              </div>

              {/* Clinical Significance */}
              <div className="p-5 bg-primary-fixed text-on-primary-fixed-variant border border-primary/10 rounded-2xl space-y-2">
                <h4 className="font-label-md text-label-md uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">clinical_notes</span>
                  Clinical & Pharmacological Relevance
                </h4>
                <p className="font-body-sm text-body-sm leading-relaxed opacity-95">
                  {activeModalProject.clinicalRelevance}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-8 py-4 border-t border-outline-variant/30 bg-surface-container-lowest flex justify-end">
              <button
                onClick={() => setActiveModalProject(null)}
                className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-xl hover:bg-primary-container font-semibold transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
