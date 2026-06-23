"use client";

import { useState } from "react";
export default function ClinicalCases({ clinicalCases = [] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const activeCase = clinicalCases[currentIdx] || { title: "Loading...", scenario: "Please wait while scenario loads.", question: "", options: [], explanation: "" };

  const handleOptionClick = (idx) => {
    if (selectedOpt !== null) return; // Prevent double answer selection
    setSelectedOpt(idx);
    setShowExplanation(true);
  };

  const handleNextCase = () => {
    setSelectedOpt(null);
    setShowExplanation(false);
    setCurrentIdx((prev) => (prev + 1) % (clinicalCases.length || 1));
  };

  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface" id="clinical-cases">
      <div className="max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold mb-3">
            Ward Rounds Simulation
          </div>
          <h2 className="font-display-lg text-3xl md:text-display-lg text-on-surface font-extrabold tracking-tight">
            Clinical Decision-Making Simulator
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mt-4">
            Test your knowledge of pharmacotherapy and medication reconciliation through real hospital pharmacy scenarios.
          </p>
        </div>

        {/* Case Board Layout */}
        <div className="max-w-3xl mx-auto bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6.5 md:p-8 clinical-shadow flex flex-col justify-between min-h-[460px]">
          
          <div className="space-y-6">
            {/* Header: Progress & Title */}
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
              <span className="font-label-md text-label-md text-primary font-bold">
                {activeCase.title}
              </span>
              <span className="text-label-sm font-label-sm px-3 py-1 bg-surface-container rounded-full text-on-surface-variant font-bold">
                Case {currentIdx + 1} of {clinicalCases.length}
              </span>
            </div>

            {/* Scenario Narrative */}
            <div className="p-5.5 bg-surface rounded-2xl border border-outline-variant/30">
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-bold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">assignment</span>
                Patient Profile & Admission Details
              </h4>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed font-medium">
                {activeCase.scenario}
              </p>
            </div>

            {/* Question Text */}
            <div className="space-y-3.5">
              <h5 className="font-headline-md text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">help</span>
                {activeCase.question}
              </h5>

              {/* Options Grid */}
              <div className="space-y-3">
                {activeCase.options.map((option, idx) => {
                  let optStyle = "border-outline-variant/40 hover:border-primary/40 bg-surface";
                  let badgeIcon = null;

                  if (selectedOpt !== null) {
                    if (idx === selectedOpt) {
                      optStyle = option.isCorrect
                        ? "border-secondary/60 bg-secondary/5 text-secondary"
                        : "border-error/60 bg-error/5 text-error";
                      badgeIcon = option.isCorrect ? "check_circle" : "cancel";
                    } else if (option.isCorrect) {
                      // Highlight correct answer if user got it wrong
                      optStyle = "border-secondary/30 bg-secondary/5 text-secondary opacity-80";
                      badgeIcon = "check_circle";
                    } else {
                      optStyle = "opacity-40 border-outline-variant/20 bg-surface";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      disabled={selectedOpt !== null}
                      className={`w-full p-4 rounded-xl border text-left font-body-sm text-body-sm transition-all flex items-start gap-3 justify-between cursor-pointer ${optStyle}`}
                    >
                      <span className="flex-1 font-medium leading-relaxed">{option.text}</span>
                      {badgeIcon && (
                        <span className="material-symbols-outlined text-xl flex-shrink-0 mt-0.5">
                          {badgeIcon}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Option Feedback */}
            {selectedOpt !== null && (
              <div className={`p-4 rounded-xl border ${activeCase.options[selectedOpt].isCorrect ? "bg-secondary/5 border-secondary/20 text-secondary" : "bg-error/5 border-error/20 text-error"} animate-[fadeIn_0.3s_ease-out]`}>
                <p className="font-body-sm text-body-sm font-semibold">
                  {activeCase.options[selectedOpt].feedback}
                </p>
              </div>
            )}

            {/* Scientific Explanation Block */}
            {showExplanation && (
              <div className="p-5.5 bg-primary-fixed text-on-primary-fixed-variant border border-primary/10 rounded-2xl animate-[fadeIn_0.4s_ease-out]">
                <h5 className="font-label-md text-label-md uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">science</span>
                  Pharmacological Rationale
                </h5>
                <p className="font-body-sm text-body-sm leading-relaxed opacity-95">
                  {activeCase.explanation}
                </p>
              </div>
            )}

          </div>

          {/* Action Row */}
          <div className="mt-8 pt-4 border-t border-outline-variant/20 flex justify-between items-center">
            <div className="flex gap-1.5">
              {clinicalCases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIdx(i);
                    setSelectedOpt(null);
                    setShowExplanation(false);
                  }}
                  className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                    i === currentIdx ? "bg-primary w-8" : "bg-outline-variant/40 hover:bg-outline-variant"
                  }`}
                  aria-label={`Go to case study ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextCase}
              className="bg-primary text-on-primary font-label-md text-label-md px-5 py-2.5 rounded-xl hover:bg-primary-container shadow-sm flex items-center gap-1.5 cursor-pointer font-semibold transition-colors"
            >
              Next Case
              <span className="material-symbols-outlined text-base font-semibold">arrow_forward</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
