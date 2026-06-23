"use client";

import { useState, useEffect } from "react";
import { simulatorData } from "../data/portfolioData";

export default function DockingSimulator() {
  const [receptorId, setReceptorId] = useState(simulatorData.receptors[0].id);
  const [ligandId, setLigandId] = useState(simulatorData.ligands[0].id);
  const [simState, setSimState] = useState("idle"); // idle, running, finished
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    "Retrieved target macromolecule PDB file...",
    "Removing crystallographic water molecules and heteroatoms...",
    "Adding polar hydrogen atoms and Gasteiger charges to target...",
    "Optimizing ligand 3D geometry and assigning rotatable bonds...",
    "Setting grid box dimensions around the catalytic active site...",
    "Launching AutoDock Vina search algorithm (exhaustiveness = 8)...",
    "Running genetic algorithm and local search minimization...",
    "Analyzing binding energy poses (kcal/mol) and root-mean-square deviation (RMSD)...",
    "Identifying active site residue contacts and hydrogen bond coordinates..."
  ];

  useEffect(() => {
    let interval;
    if (simState === "running") {
      setProgress(0);
      setLogIndex(0);
      
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setSimState("finished");
            return 100;
          }
          const nextVal = prev + Math.floor(Math.random() * 8) + 4;
          return nextVal > 100 ? 100 : nextVal;
        });

        setLogIndex((prev) => {
          const nextIdx = prev + 1;
          return nextIdx < logs.length ? nextIdx : logs.length - 1;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [simState]);

  const selectedReceptor = simulatorData.receptors.find((r) => r.id === receptorId);
  const selectedLigand = simulatorData.ligands.find((l) => l.id === ligandId);
  const result = simulatorData.dockingResults[receptorId]?.[ligandId] || { score: 0, hBonds: 0, residues: "None", efficacy: "" };

  const startSimulation = () => {
    setSimState("running");
  };

  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-variant/20 border-y border-outline-variant/30" id="simulator">
      <div className="max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold mb-3">
            In Silico Laboratory
          </div>
          <h2 className="font-display-lg text-3xl md:text-display-lg text-on-surface font-extrabold tracking-tight">
            Molecular Docking Simulator
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mt-4">
            Simulate protein-ligand binding energies and molecular interactions using mock parameters based on realistic AutoDock Vina trials.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Inputs Section */}
          <div className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6.5 clinical-shadow flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/20 pb-3">
                <span className="material-symbols-outlined text-primary">tune</span>
                Simulation Parameters
              </h3>

              {/* Receptor Select */}
              <div className="space-y-2">
                <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  1. Target Receptor Protein
                </label>
                <select
                  value={receptorId}
                  onChange={(e) => {
                    setReceptorId(e.target.value);
                    if (simState === "finished") setSimState("idle");
                  }}
                  disabled={simState === "running"}
                  className="w-full p-3.5 rounded-xl border border-outline-variant bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none transition-colors disabled:opacity-60"
                >
                  {simulatorData.receptors.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.pdbId})
                    </option>
                  ))}
                </select>
                <p className="text-label-sm font-label-sm text-primary/80 italic mt-1.5 min-h-[36px]">
                  {selectedReceptor.description}
                </p>
                <div className="text-label-sm font-label-sm text-on-surface-variant/80 mt-2 bg-surface p-3 rounded-lg border border-outline-variant/20">
                  <div className="font-semibold text-primary uppercase text-[10px] tracking-wider">AutoDock Grid Box Coordinates:</div>
                  <div className="font-mono mt-0.5 text-[11px]">Center: {simulatorData.gridDims[selectedReceptor.id]?.center}</div>
                  <div className="font-mono text-[11px]">Size: {simulatorData.gridDims[selectedReceptor.id]?.size}</div>
                </div>
              </div>

              {/* Ligand Select */}
              <div className="space-y-2">
                <label className="block text-label-sm font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  2. Phytochemical Ligand
                </label>
                <select
                  value={ligandId}
                  onChange={(e) => {
                    setLigandId(e.target.value);
                    if (simState === "finished") setSimState("idle");
                  }}
                  disabled={simState === "running"}
                  className="w-full p-3.5 rounded-xl border border-outline-variant bg-surface text-on-surface font-body-sm text-body-sm focus:border-primary focus:outline-none transition-colors disabled:opacity-60"
                >
                  {simulatorData.ligands.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.source})
                    </option>
                  ))}
                </select>
                <p className="text-label-sm font-label-sm text-on-surface-variant italic mt-1.5">
                  Formula: {selectedLigand.formula} | MW: {selectedLigand.molecularWeight}
                </p>
              </div>
            </div>

            {/* Run Button */}
            <div className="mt-8 pt-4 border-t border-outline-variant/20">
              <button
                onClick={startSimulation}
                disabled={simState === "running"}
                className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-md text-label-md uppercase tracking-widest font-bold shadow-md hover:bg-primary-container disabled:bg-outline-variant disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined animate-spin" style={{ display: simState === "running" ? "inline-block" : "none" }}>
                  autorenew
                </span>
                {simState === "running" ? "Docking Ligand..." : "Run Docking Study"}
              </button>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-8 bg-surface-container border border-outline-variant/60 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[420px] clinical-shadow">
            
            {/* Simulation Idle / Running Overlay */}
            {simState === "idle" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-surface-container z-10">
                <span className="material-symbols-outlined text-outline-variant text-7xl animate-[pulse_3s_infinite]">
                  science
                </span>
                <h4 className="font-headline-md text-lg font-bold text-on-surface mt-4">
                  Ready for Docking Run
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-2">
                  Select your oncology or inflammatory protein and dietary ligand on the left, then trigger the search computation.
                </p>
              </div>
            )}

            {simState === "running" && (
              <div className="flex-1 flex flex-col justify-between z-10">
                {/* Simulated Docking Matrix Visualizer */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                  
                  {/* Rotating molecules grid */}
                  <div className="w-48 h-48 border-4 border-dashed border-primary/20 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite] relative">
                    <div className="absolute -top-3 left-1/2 w-6 h-6 bg-primary rounded-full animate-ping"></div>
                    <div className="absolute -bottom-3 left-1/2 w-6 h-6 bg-secondary rounded-full"></div>
                    <div className="absolute -left-3 top-1/2 w-6 h-6 bg-primary-container rounded-full"></div>
                  </div>

                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-display-lg text-primary font-bold text-3xl">
                      {progress}%
                    </span>
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                      Binding Pose Sweep
                    </span>
                  </div>
                </div>

                {/* Simulation Logs */}
                <div className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4.5 font-label-sm text-[12px] text-primary space-y-1.5 shadow-inner">
                  <div className="flex items-center gap-2 text-on-surface-variant font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                    CONSOLE LOGS
                  </div>
                  <p className="font-mono text-on-surface opacity-90 truncate">
                    &gt; {logs[logIndex]}
                  </p>
                </div>
              </div>
            )}

            {simState === "finished" && (
              <div className="flex-1 flex flex-col justify-between z-10 animate-[fadeIn_0.5s_ease-out]">
                
                {/* Result Card Grid */}
                <div className="space-y-6">
                  
                  {/* Header Title */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-outline-variant/30 pb-4">
                    <div>
                      <h4 className="font-headline-md text-xl font-bold text-primary">
                        Docking Report Summary
                      </h4>
                      <p className="text-label-sm font-label-sm text-on-surface-variant mt-0.5">
                        Ligand: <span className="font-bold text-on-surface">{selectedLigand.name}</span> | Target: <span className="font-bold text-on-surface">{selectedReceptor.name}</span>
                      </p>
                    </div>
                    
                    {/* Binding Energy Score Badge */}
                    <div className="px-5 py-2.5 rounded-2xl bg-primary text-on-primary text-center shadow-md">
                      <span className="block text-label-sm font-label-sm uppercase tracking-widest opacity-80 leading-none">Affinity</span>
                      <span className="text-xl font-extrabold leading-none mt-1 block">
                        {result.score} <span className="text-xs font-normal">kcal/mol</span>
                      </span>
                    </div>
                  </div>

                  {/* Scientific Data Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    <div className="p-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl">
                      <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider block">Hydrogen Bonds</span>
                      <span className="font-display-lg text-2xl font-bold text-secondary mt-1 block">
                        {result.hBonds} Bonds
                      </span>
                    </div>

                    <div className="p-4 bg-surface-container-lowest border border-outline-variant/30 rounded-xl sm:col-span-2">
                      <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider block">Interacting Residues</span>
                      <span className="font-body-sm text-body-sm font-bold text-on-surface mt-1 block">
                        {result.residues}
                      </span>
                    </div>

                  </div>

                  {/* Pharmacological Efficacy text */}
                  <div className="p-5.5 bg-primary-fixed text-on-primary-fixed-variant rounded-2xl border border-primary/10">
                    <h5 className="font-label-md text-label-md uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">pharmacology</span>
                      Binding Mechanism Efficacy
                    </h5>
                    <p className="font-body-sm text-body-sm leading-relaxed opacity-95">
                      {result.efficacy}
                    </p>
                  </div>

                  {/* Clinical Commentary */}
                  <div className="p-5.5 bg-secondary-container text-on-secondary-container rounded-2xl border border-secondary/15">
                    <h5 className="font-label-md text-label-md uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">clinical_notes</span>
                      Translational Medicine Relevance
                    </h5>
                    <p className="font-body-sm text-body-sm leading-relaxed opacity-95">
                      {selectedReceptor.id === "er-alpha" && "ER-α antagonism inhibits transcription of estrogen-responsive genes, preventing tumor progression in hormone-positive breast cancers. This docking profile supports lead structure optimization."}
                      {selectedReceptor.id === "her2" && "HER2 intracellular kinase domain blocking arrests autophosphorylation, halting downstream MAPK/AKT proliferation cascades in aggressive tumors."}
                      {selectedReceptor.id === "cox2" && "COX-2 inhibition blocks the production of pro-inflammatory prostaglandins without interfering with cytoprotective COX-1 functions, reducing gastrointestinal toxicity risk."}
                    </p>
                  </div>

                </div>

                {/* Reset Button */}
                <div className="mt-8 pt-4 border-t border-outline-variant/20 flex justify-end">
                  <button
                    onClick={() => setSimState("idle")}
                    className="border border-outline text-on-surface-variant font-label-md text-label-md px-5 py-2.5 rounded-xl hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    Clear Simulation
                  </button>
                </div>

              </div>
            )}

            {/* Simulated molecular canvas background */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

          </div>

        </div>

      </div>
    </section>
  );
}
