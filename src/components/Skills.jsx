"use client";

import { useState, useEffect } from "react";

export default function Skills({ skills = [] }) {
  // Fallbacks if database is loading
  const firstCategory = skills[0] || { category: "Clinical Pharmacy", items: [{ name: "Pharmacotherapy", description: "Designing drug regimens." }] };
  const firstSkill = firstCategory.items[0] || { name: "Pharmacotherapy", description: "Designing drug regimens." };

  const [selectedSkill, setSelectedSkill] = useState(firstSkill);
  const [activeCategory, setActiveCategory] = useState(firstCategory.category);

  useEffect(() => {
    if (skills.length > 0) {
      setActiveCategory(skills[0].category);
      setSelectedSkill(skills[0].items[0]);
    }
  }, [skills]);

  return (
    <section className="py-20 bg-surface-container-low/50 px-margin-mobile md:px-margin-desktop" id="skills">
      <div className="max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display-lg text-3xl md:text-display-lg text-on-surface font-extrabold tracking-tight">
            Core Competencies
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mt-4">
            A comprehensive catalog of pharmaceutical sciences, computational tools, and clinical methodologies.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Categories & Items Grid */}
          <div className="w-full lg:w-8/12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((category, catIdx) => (
              <div
                key={catIdx}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  activeCategory === category.category
                    ? "bg-surface-container-lowest border-primary/40 shadow-md"
                    : "bg-surface-container-lowest/60 border-outline-variant/30 hover:border-outline-variant/60"
                }`}
                onMouseEnter={() => setActiveCategory(category.category)}
              >
                <div className="flex items-center gap-2.5 mb-4 border-b border-outline-variant/20 pb-3">
                  <span className="material-symbols-outlined text-primary text-2xl font-semibold">
                    {category.icon}
                  </span>
                  <h3 className="font-headline-md text-base font-bold text-on-surface uppercase tracking-wider">
                    {category.category}
                  </h3>
                </div>
                
                <p className="text-label-sm font-label-sm text-on-surface-variant mb-4 min-h-[32px]">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {category.items.map((skillItem, itemIdx) => (
                    <button
                      key={itemIdx}
                      onClick={() => setSelectedSkill(skillItem)}
                      className={`px-3.5 py-1.5 rounded-full text-label-sm font-label-sm transition-all flex items-center gap-1 cursor-pointer font-medium ${
                        selectedSkill.name === skillItem.name
                          ? "bg-primary text-on-primary shadow-sm scale-[1.03]"
                          : "bg-surface border border-outline-variant/40 text-on-surface hover:border-primary/40"
                      }`}
                    >
                      {skillItem.name}
                      {selectedSkill.name === skillItem.name && (
                        <span className="material-symbols-outlined text-[10px] leading-none">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Skill Detail Drawer Panel */}
          <div className="w-full lg:w-4/12 lg:sticky lg:top-24">
            <div className="p-8 bg-gradient-to-br from-primary-container to-primary text-white rounded-3xl shadow-xl relative overflow-hidden flex flex-col gap-6">
              
              {/* Background circular decorations */}
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/5 pointer-events-none"></div>
              <div className="absolute -left-12 -bottom-12 w-32 h-32 rounded-full bg-white/5 pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <span className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider font-semibold">
                  Competency Details
                </span>
                <span className="material-symbols-outlined text-on-primary-container text-2xl">
                  info
                </span>
              </div>

              <div className="space-y-4 min-h-[160px] relative z-10">
                <h4 className="font-headline-lg text-2xl font-extrabold text-white tracking-tight">
                  {selectedSkill.name}
                </h4>
                
                <p className="font-body-md text-body-md text-white/90 leading-relaxed">
                  {selectedSkill.description}
                </p>
              </div>

              <div className="border-t border-white/20 pt-4 mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-ping"></span>
                  <span className="text-[11px] font-semibold text-white/70 uppercase tracking-widest">
                    Active selection
                  </span>
                </div>
                <span className="material-symbols-outlined text-white/60">
                  arrow_circle_right
                </span>
              </div>
              
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
