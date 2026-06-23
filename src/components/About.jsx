"use client";

import { useState } from "react";
import { academicTimeline } from "../data/portfolioData";

export default function About({ personalInfo }) {
  const [activeTab, setActiveTab] = useState("profile");

  const interests = [
    {
      icon: "medical_services",
      title: "Breast Cancer Research",
      desc: "Investigating structure-based ligands against Estrogen Receptor Alpha (ER-α) and HER2 to identify high-efficacy natural inhibitors.",
      color: "text-primary",
    },
    {
      icon: "hub",
      title: "In Silico Discovery",
      desc: "Conducting high-throughput database screening, ligand docking, and pharmacokinetics (ADMET) modeling.",
      color: "text-secondary",
    },
    {
      icon: "microbiology",
      title: "Gut Microbiota",
      desc: "Simulating molecular conversions of dietary polyphenols by colon bacteria and analyzing active metabolite receptor bindings.",
      color: "text-primary",
    },
    {
      icon: "settings_input_component",
      title: "Molecular Docking",
      desc: "Using tools like AutoDock Vina and PyMOL to analyze receptor-ligand hydrogen bonding, binding energy, and steric poses.",
      color: "text-secondary",
    },
  ];

  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface" id="about">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Profile Left Sidebar */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-24 space-y-6">
            <div className="relative group max-w-sm mx-auto lg:mx-0">
              {/* Profile Image Frame */}
              <div className="absolute inset-0 bg-primary rounded-2xl transform rotate-3 scale-[1.02] opacity-20 group-hover:rotate-6 transition-transform duration-300"></div>
              <div className="aspect-square w-full rounded-2xl overflow-hidden border-2 border-outline-variant relative z-10 bg-surface-container shadow-md">
                <img
                  className="w-full h-full object-cover hover:scale-[1.02] transition-all duration-500"
                  src={personalInfo?.image || "/profile.jpg"}
                  alt="Md Shakib Al Hasan Professional Portrait"
                />
              </div>
            </div>

            <div className="flex items-center gap-stack-sm my-4">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-outline-variant/50"></div>
              <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-wider">
                The Pharmacist Profile
              </span>
              <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-outline-variant/50"></div>
            </div>

            <h3 className="font-headline-lg text-2xl md:text-headline-lg text-on-surface font-extrabold tracking-tight">
              Meticulous Pursuit of Knowledge
            </h3>
            
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {personalInfo?.bio || "As a dedicated B.Pharm student at Khwaja Yunus Ali University, I focus on integrating biological pathways and clinical pathology with state-of-the-art computational biophysics."}
            </p>
          </div>

          {/* Right Information Panels */}
          <div className="w-full lg:w-7/12 space-y-8">
            
            {/* Interactive Toggle Tabs */}
            <div className="flex border-b border-outline-variant/30 gap-6">
              <button
                onClick={() => setActiveTab("profile")}
                className={`pb-4 font-label-md text-label-md tracking-wider uppercase font-bold relative transition-colors cursor-pointer ${
                  activeTab === "profile" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Academic Foundation
                {activeTab === "profile" && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("interests")}
                className={`pb-4 font-label-md text-label-md tracking-wider uppercase font-bold relative transition-colors cursor-pointer ${
                  activeTab === "interests" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Research Focus Areas
                {activeTab === "interests" && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full"></span>
                )}
              </button>
            </div>

            {/* Tab: Academic Foundation */}
            {activeTab === "profile" && (
              <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                <div className="p-8 bg-surface-container-lowest border border-outline-variant/50 rounded-2xl clinical-shadow space-y-6">
                  <h4 className="font-headline-md text-xl text-primary font-bold flex items-center gap-2.5">
                    <span className="material-symbols-outlined">menu_book</span>
                    KYAU B.Pharm Training
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    My coursework combines intensive pharmacology lectures with laboratory research. I study biological mechanisms, molecular drug targets, and chemical interactions, developing a molecular-level understanding of therapeutics.
                  </p>
                  
                  <div className="space-y-3 border-t border-outline-variant/30 pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-outline-variant/10">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Affiliated Institution</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 sm:mt-0">Khwaja Yunus Ali University</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-outline-variant/10">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Degree Program</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 sm:mt-0">Bachelor of Pharmacy (B.Pharm)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-outline-variant/10">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Core Practice Focus</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 sm:mt-0">Clinical Pharmacy, Pharmacotherapy</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Research Focus</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 sm:mt-0">Computer-Aided Drug Discovery (CADD)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">Academic Journey</h5>
                  {academicTimeline.map((item, idx) => (
                    <div key={idx} className="p-5 bg-surface-container-low border border-outline-variant/30 rounded-xl flex items-start gap-4">
                      <div className="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-lg font-label-sm text-label-sm font-bold mt-0.5">
                        {item.year}
                      </div>
                      <div>
                        <h6 className="font-headline-md text-base font-bold text-on-surface">{item.title}</h6>
                        <p className="text-label-sm font-label-sm text-primary mb-1">{item.institution}</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Research Focus Areas */}
            {activeTab === "interests" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md animate-[fadeIn_0.3s_ease-out]">
                {interests.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-surface-container-lowest border border-outline-variant/50 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col gap-3 group"
                  >
                    <span className={`material-symbols-outlined ${item.color} text-3xl group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </span>
                    <h4 className="font-headline-md text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
