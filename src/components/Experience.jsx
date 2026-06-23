"use client";

import { useState, useEffect } from "react";

export default function Experience({ experienceTimeline = [] }) {
  const [expandedId, setExpandedId] = useState("rotation-1");

  useEffect(() => {
    if (experienceTimeline.length > 0) {
      setExpandedId(experienceTimeline[0].id || experienceTimeline[0]._id);
    }
  }, [experienceTimeline]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-variant/10" id="experience">
      <div className="max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold mb-3">
            Career Timeline
          </div>
          <h2 className="font-display-lg text-3xl md:text-display-lg text-on-surface font-extrabold tracking-tight">
            Professional Experience &amp; Training
          </h2>
          <div className="h-1.5 w-24 bg-primary mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Vertical Timeline */}
          <div className="lg:col-span-7 space-y-6 relative border-l-2 border-primary/20 pl-6 md:pl-10 ml-4 md:ml-6 py-4">
            
            {experienceTimeline.map((item) => {
              const isExpanded = expandedId === item.id;
              
              let markerStyle = "bg-surface border-2 border-primary/40 text-primary";
              let cardStyle = "bg-surface-container-lowest border-outline-variant/40 hover:border-primary/40";
              
              if (isExpanded) {
                markerStyle = "bg-primary text-on-primary ring-4 ring-primary-fixed scale-110";
                cardStyle = "bg-surface-container-lowest border-primary/40 shadow-md";
              }

              return (
                <div key={item.id} className="relative group">
                  
                  {/* Timeline Marker Bullet */}
                  <div className={`absolute -left-[45px] md:-left-[61px] top-1.5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 font-bold z-10 ${markerStyle}`}>
                    <span className="material-symbols-outlined text-lg">
                      {item.type === "hospital" && "local_hospital"}
                      {item.type === "dispensing" && "pill"}
                      {item.type === "academic" && "biotech"}
                    </span>
                  </div>

                  {/* Experience Card */}
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className={`p-6 rounded-2xl border transition-all duration-300 transform cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div>
                        <span className="font-label-sm text-[10px] uppercase font-bold text-primary tracking-wider">
                          {item.period}
                        </span>
                        <h3 className="font-headline-md text-[17px] font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">
                          {item.role}
                        </h3>
                        <p className="text-label-sm font-label-sm text-on-surface-variant font-medium mt-0.5">
                          {item.facility}
                        </p>
                      </div>
                      
                      <span className="material-symbols-outlined text-outline-variant transition-transform duration-300 group-hover:text-primary">
                        {isExpanded ? "expand_less" : "expand_more"}
                      </span>
                    </div>

                    {/* Expandable Checklist Details */}
                    {isExpanded && (
                      <div className="mt-5 pt-4 border-t border-outline-variant/20 space-y-3.5 animate-[fadeIn_0.3s_ease-out]">
                        {item.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                            <span className="material-symbols-outlined text-secondary text-lg mt-0.5 flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                              check_circle
                            </span>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              );
            })}

          </div>

          {/* Side Career Goal Quote Board */}
          <div className="lg:col-span-5">
            <div className="p-8 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              
              {/* Massive background quote mark */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.07] pointer-events-none select-none">
                <span className="material-symbols-outlined text-[150px] leading-none">format_quote</span>
              </div>

              <div className="space-y-4">
                <span className="font-label-md text-label-md uppercase tracking-widest text-on-primary-container font-extrabold block">
                  Career Aspiration
                </span>
                <blockquote className="font-display-lg text-lg sm:text-[23px] font-medium leading-relaxed italic text-white">
                  &ldquo;My goal is to work at the intersection of clinical pharmacy, pharmacotherapy, and bioinformatics. I want to leverage computational molecular modeling to identify natural therapeutics, bridging drug discovery and clinical care.&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 border-t border-white/20 pt-6 flex items-center gap-4">
                <div className="w-12 h-1 bg-secondary-fixed rounded-full"></div>
                <div>
                  <h4 className="font-headline-md text-base font-bold text-white leading-none">
                    Md Shakib Al Hasan
                  </h4>
                  <span className="text-[11px] font-semibold text-on-primary-container uppercase tracking-wider block mt-1">
                    B.Pharm Candidate &amp; Researcher
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
