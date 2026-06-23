// Data store for Shakib Al Hasan's Portfolio website
// Sophisticated, academic, and clinically precise copy

export const personalInfo = {
  name: "Md Shakib Al Hasan",
  title: "Pharmacology Scholar & Computational Drug Discovery Researcher",
  subtitle: "Pharmacy Scholar | In Silico Specialist | Clinical Trainee",
  institution: "Khwaja Yunus Ali University (KYAU)",
  degree: "Bachelor of Pharmacy (B.Pharm)",
  bio: "A forward-thinking Pharmacy scholar and researcher dedicated to bridging the divide between computational biophysics and clinical therapeutic care. Specializing in structure-based drug design, molecular docking, and ADMET profiling to discover next-generation therapeutic candidates. Passionate about translating computer-aided drug designs into precise, patient-centered clinical interventions.",
  email: "mohammadshakib213389@gmail.com", 
  linkedin: "https://linkedin.com/in/md-shakib-al-hasan", 
  researchgate: "https://www.researchgate.net/profile/Md-Shakib-Al-Hasan", 
  location: "Sirajganj, Bangladesh",
};

export const stats = [
  { value: "4+", label: "Years of Rigorous Pharmacy Studies" },
  { value: "100+", label: "Bioactive Compounds Docked & Screened" }
];

export const academicTimeline = [
  {
    year: "Ongoing",
    title: "Bachelor of Pharmacy (B.Pharm) Honors",
    institution: "Khwaja Yunus Ali University",
    description: "Immersive academic training focusing on Advanced Pharmacology, Biopharmaceutics, Pharmacokinetics, Molecular Pathology, and Clinical Pharmacy practice standards.",
  },
  {
    year: "Completed",
    title: "Higher Secondary Certificate (HSC)",
    institution: "Science Discipline",
    description: "Built robust foundational knowledge in Organic Chemistry, Cellular Biology, Physics, and Mathematics.",
  }
];

export const skills = [
  {
    category: "Clinical Pharmacy",
    icon: "medical_services",
    description: "Bedside competencies, patient-centered therapy designs, and medication safety practices.",
    items: [
      { name: "Pharmacotherapy", description: "Designing and tailoring evidence-based drug regimens for complex disease states." },
      { name: "Medication Reconciliation", description: "Identifying and resolving discrepancies at transitions of care to ensure patient safety." },
      { name: "Clinical Rounds", description: "Participating in multidisciplinary ward discussions to evaluate therapeutic efficacy and patient compliance." },
      { name: "Patient Counseling", description: "Explaining drug mechanisms, side effects, and administration techniques to patients." },
      { name: "Adverse Drug Monitoring", description: "Monitoring, identifying, and reporting Adverse Drug Reactions (ADRs) during patient hospital stays." }
    ]
  },
  {
    category: "In Silico Drug Discovery",
    icon: "biotech",
    description: "Computational biophysics tools and virtual screening methodologies to isolate therapeutic candidates.",
    items: [
      { name: "Molecular Docking", description: "Simulating ligand-receptor interactions to predict preferred binding poses and free energy scores." },
      { name: "ADMET Profiling", description: "Evaluating Absorption, Distribution, Metabolism, Excretion, and Toxicity profiles of target structures." },
      { name: "Virtual Screening", description: "High-throughput computational screening of chemical libraries against oncogenic targets." },
      { name: "Target Identification", description: "Locating and preparing macromolecular 3D structures from the Protein Data Bank (PDB)." },
      { name: "Lead Optimization", description: "Modifying chemical scaffolds of active hits to maximize binding affinity and minimize toxicities." }
    ]
  },
  {
    category: "Technical Tools",
    icon: "precision_manufacturing",
    description: "Scientific software and databases used for computational modeling and structural analysis.",
    items: [
      { name: "AutoDock Vina", description: "An industry-standard grid-based docking engine for predicting receptor-ligand configurations." },
      { name: "PyMOL Visualizer", description: "An open-source molecular visualization system used to render high-resolution 3D macromolecular structures." },
      { name: "Discovery Studio", description: "A comprehensive molecular modeling suite used to map 2D/3D protein-ligand interaction patterns." },
      { name: "SwissADME Server", description: "An online platform utilized to compute physicochemical descriptors, ADME traits, and drug-likeness parameters." },
      { name: "Bioinformatics Databases", description: "Accessing and mining data from genomic and chemical resources (NCBI, PubChem, UniProt)." }
    ]
  },
  {
    category: "Academic & Soft Skills",
    icon: "groups",
    description: "Professional qualities essential for collaborative research and academic communication.",
    items: [
      { name: "Scientific Writing", description: "Drafting scientific abstracts, literature reviews, and detailed laboratory reports." },
      { name: "Literature Synthesis", description: "Critically analyzing, evaluating, and summarizing peer-reviewed biomedical papers." },
      { name: "Interdisciplinary Teamwork", description: "Working effectively in research collaborations bridging biological chemistry with medicine." },
      { name: "Critical Thinking", description: "Troubleshooting complex pharmacological issues and analyzing clinical cases." }
    ]
  }
];

export const researchProjects = [
  {
    id: "gut-microbiota",
    title: "Computational Evaluation of Gut-Microbiota Biotransformed Phytochemicals",
    category: "Molecular Docking",
    status: "Current Initiative",
    icon: "science",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
    description: "Harnessing structural bioinformatics to simulate the metabolic fate of dietary plant compounds within the human colon. By modeling bacterial enzyme conversions, this research aims to identify active post-biotic metabolites and evaluate their binding affinities against oncogenic and inflammatory receptors, exposing hidden natural prodrugs.",
    methodology: "Acquisition of phytochemical structures, modeling gut bacterial metabolic enzymes, molecular docking with AutoDock Vina, and ADMET comparison between parent molecules and gut metabolites.",
    clinicalRelevance: "Expounds the systemic therapeutic benefits of natural diets, potentially leading to the synthesis of stable metabolite mimics that bypass digestive variability.",
    tags: ["Gut Microbiota", "Bioinformatics", "ADMET Profiling", "Polyphenols"]
  },
  {
    id: "breast-cancer",
    title: "Targeted Anti-Oncogenic Scaffolds for Breast Cancer via Structure-Based Design",
    category: "Oncology",
    status: "Active Exploration",
    icon: "medical_information",
    image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=600&q=80",
    description: "Conducting virtual high-throughput screening of secondary plant metabolites against key breast cancer drivers, specifically Estrogen Receptor Alpha (ER-α) and Human Epidermal Growth Factor Receptor 2 (HER2), to isolate natural lead candidates.",
    methodology: "Retrieving protein crystal structures (PDB), energy minimization, active site grid mapping, molecular docking, and analyzing hydrophobic/hydrogen-bond contacts.",
    clinicalRelevance: "Facilitates the identification of selective, plant-derived inhibitors to act as adjuvant oncological therapies with reduced toxic side-effect profiles compared to conventional agents.",
    tags: ["Oncology", "ER-Alpha", "HER2 Kinase", "In Silico Screening"]
  },
  {
    id: "phytochemical-antiinflammatory",
    title: "In Silico Selectivity Analysis of Secondary Metabolites against COX-2 Receptors",
    category: "Pharmacology",
    status: "Completed Project",
    icon: "biotech",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    description: "A computational comparative docking analysis investigating the selective binding dynamics of active phytochemicals against Cyclooxygenase-2 (COX-2) versus Cyclooxygenase-1 (COX-1).",
    methodology: "SwissTargetPrediction to map receptor affinities, grid-box coordinate generation at catalytic sites, docking calculations, and binding energy profiling.",
    clinicalRelevance: "Aids in the design of anti-inflammatory therapies that selectively inhibit COX-2, preserving cytoprotective gastric prostaglandins maintained by COX-1 to avoid ulcerations.",
    tags: ["COX-2 Selectivity", "Inflammation", "Gastroprotection", "Molecular Docking"]
  }
];

export const experienceTimeline = [
  {
    id: "rotation-1",
    role: "Clinical Pharmacy Trainee",
    facility: "KYAU Teaching Hospital Wards",
    period: "Clinical Rotation",
    type: "hospital",
    details: [
      "Participated actively in multidisciplinary internal medicine ward rounds, observing clinical decision-making.",
      "Conducted thorough medication reconciliations, comparing patient histories with active charts to verify regimens.",
      "Identified potential drug-drug interactions and suggested dose adjustment modifications to clinical staff.",
      "Provided critical patient counseling regarding drug administration techniques (inhalers, insulin) to boost compliance."
    ]
  },
  {
    id: "rotation-2",
    role: "Hospital Dispensing & Supply Chain Observer",
    facility: "Hospital Pharmacy Department",
    period: "Rotational Training",
    type: "dispensing",
    details: [
      "Studied protocols for high-alert drugs, double-check systems, and storage parameters for temperature-sensitive biologics.",
      "Observed the inpatient unit-dose and outpatient dispensing workflows under senior clinical pharmacist supervision.",
      "Learned about hospital compounding, drug distribution models, and patient safety checks."
    ]
  },
  {
    id: "milestone-1",
    role: "Computational Biophysics Workshop",
    facility: "Khwaja Yunus Ali University CADD Lab",
    period: "Advanced Skill Acquisition",
    type: "academic",
    details: [
      "Completed intensive hands-on training in molecular docking, virtual library screening, and pharmacokinetics predictions.",
      "Mastered AutoDock Vina grid settings, PyMOL residue isolation, and online bio-computational servers."
    ]
  }
];

export const clinicalCases = [
  {
    id: "case-1",
    title: "Case 1: Metformin Management in Severe CKD",
    scenario: "A 62-year-old male with Type 2 Diabetes and Chronic Kidney Disease (Stage 4, eGFR = 24 mL/min/1.73m²) presents with a HbA1c of 8.2%. His current medication includes Metformin 1000mg twice daily.",
    question: "As the Clinical Pharmacist, what is your primary clinical recommendation for his glucose-lowering therapy?",
    options: [
      {
        text: "Maintain Metformin at the current dosage since HbA1c is elevated.",
        isCorrect: false,
        feedback: "Incorrect. Metformin is strictly contraindicated in patients with eGFR < 30 mL/min due to the high risk of drug accumulation and Metformin-Associated Lactic Acidosis (MALA)."
      },
      {
        text: "Discontinue Metformin. Recommend initiating a DPP-4 inhibitor like Linagliptin, or insulin, which do not require renal dosage adjustment.",
        isCorrect: true,
        feedback: "Correct! Metformin must be discontinued once eGFR drops below 30 mL/min. Linagliptin is primarily excreted enterohepatically (feces) and does not require dosage adjustments in renal impairment, making it a safe alternative."
      },
      {
        text: "Reduce Metformin to 500mg once daily and add Ibuprofen for mild joint pain.",
        isCorrect: false,
        feedback: "Incorrect. Metformin remains contraindicated even at low doses when eGFR is < 30. Furthermore, introducing an NSAID like Ibuprofen is hazardous as NSAIDs decrease renal blood flow and can cause acute kidney injury on top of CKD."
      }
    ],
    explanation: "Metformin is renally cleared. In severe renal impairment (eGFR < 30), it accumulates, increasing the risk of lactic acidosis—a rare but life-threatening complication. Alternative agents like Linagliptin or Glipizide (which is metabolized in the liver) or insulin are preferred, as they do not depend heavily on renal excretion for clearance."
  },
  {
    id: "case-2",
    title: "Case 2: Enzyme Inhibition in Dual Arrhythmia & Anticoagulation",
    scenario: "A 71-year-old female on chronic Warfarin therapy for atrial fibrillation is diagnosed with ventricular arrhythmia. Her cardiologist initiates Amiodarone. Her baseline INR is stable at 2.4.",
    question: "What pharmacological adjustment and monitoring plan should you recommend to prevent severe complications?",
    options: [
      {
        text: "No change to the Warfarin dose; check the INR in 4 weeks.",
        isCorrect: false,
        feedback: "Incorrect. Amiodarone is a potent enzyme inhibitor. Leaving the Warfarin dose unchanged will likely lead to over-anticoagulation and severe bleeding within 1-2 weeks."
      },
      {
        text: "Increase the Warfarin dose by 25% since Amiodarone reduces Warfarin efficacy.",
        isCorrect: false,
        feedback: "Incorrect. Amiodarone increases (not reduces) warfarin's effect. Increasing the dose will dangerously elevate INR, risking stroke or hemorrhage."
      },
      {
        text: "Decrease the Warfarin dose by 30% to 50% immediately, and monitor INR closely (1-2 times weekly) for the first month.",
        isCorrect: true,
        feedback: "Correct! Amiodarone inhibits CYP2C9, the primary enzyme that metabolizes the active S-isomer of Warfarin. This inhibition prolongs Warfarin's half-life. A proactive dose reduction of 30-50% is required to prevent dangerously high INRs and bleeding."
      }
    ],
    explanation: "Amiodarone inhibits multiple CYP450 enzymes, particularly CYP2C9. Since S-warfarin (the active form) is metabolized by CYP2C9, Amiodarone significantly increases warfarin levels. Because Amiodarone has an extremely long half-life, the interaction can develop gradually and persist for weeks even after Amiodarone discontinuation."
  },
  {
    id: "case-3",
    title: "Case 3: Acute Gout Flare in Peptic Ulcer History",
    scenario: "A 55-year-old patient with a history of recurrent peptic ulcer disease (hospitalized last year for a bleeding ulcer) presents with an acute, painful gout flare-up in his left great toe.",
    question: "Which therapeutic strategy is most appropriate for managing his acute pain while protecting his gastrointestinal tract?",
    options: [
      {
        text: "Prescribe high-dose Indomethacin 50mg three times daily.",
        isCorrect: false,
        feedback: "Incorrect. Indomethacin is a non-selective NSAID with exceptionally high gastrointestinal toxicity. In a patient with a recent bleeding ulcer, it carries an unacceptable risk of causing another GI bleed."
      },
      {
        text: "Prescribe a selective COX-2 inhibitor (e.g., Celecoxib) combined with a Proton Pump Inhibitor (e.g., Omeprazole), or use low-dose Colchicine.",
        isCorrect: true,
        feedback: "Correct! Non-selective NSAIDs should be avoided. Celecoxib (a selective COX-2 inhibitor) is safer for the stomach, and adding a PPI offers critical mucosal protection. Colchicine is a non-NSAID option that is also highly effective for gout flares without causing gastric injury (assuming normal renal function)."
      },
      {
        text: "Prescribe Naproxen and suggest taking it with milk.",
        isCorrect: false,
        feedback: "Incorrect. Taking Naproxen (a non-selective NSAID) with milk or food reduces dyspepsia but does NOT prevent systemic mucosal injury and bleeding. A PPI is required, and selective COX-2 inhibitors are highly preferred."
      }
    ],
    explanation: "COX-1 is responsible for producing protective prostaglandins that maintain gastric mucosal integrity. Traditional NSAIDs inhibit both COX-1 and COX-2. Selective COX-2 inhibitors (like Celecoxib) spare COX-1, reducing gastric injury. In high-risk patients, combining a COX-2 inhibitor with a PPI provides the highest level of gastrointestinal safety if NSAID therapy is required."
  }
];

export const simulatorData = {
  receptors: [
    {
      id: "er-alpha",
      name: "Estrogen Receptor Alpha (ER-α)",
      pdbId: "1ERR",
      description: "Crucial oncogenic target in hormone-receptor-positive breast cancers, which accounts for ~70% of cases.",
      activeSite: "Glu353, Arg394, His524"
    },
    {
      id: "her2",
      name: "HER2 Receptor Tyrosine Kinase",
      pdbId: "3PP0",
      description: "Receptor tyrosine kinase amplified in aggressive HER2+ breast cancers, responsible for promoting cell proliferation.",
      activeSite: "Asp808, Met801, Lys753"
    },
    {
      id: "cox2",
      name: "Cyclooxygenase-2 (COX-2)",
      pdbId: "5IKQ",
      description: "Primary enzyme mediator of inflammation and pain. A major target for anti-inflammatory drug screening.",
      activeSite: "Arg120, Tyr355, Glu524"
    }
  ],
  gridDims: {
    "er-alpha": { center: "x: 30.5, y: -1.2, z: 24.1", size: "x: 22.0, y: 22.0, z: 22.0" },
    "her2": { center: "x: 15.2, y: 8.4, z: -10.5", size: "x: 20.0, y: 20.0, z: 20.0" },
    "cox2": { center: "x: 26.1, y: 19.8, z: 47.3", size: "x: 25.0, y: 25.0, z: 25.0" }
  },
  ligands: [
    {
      id: "curcumin",
      name: "Curcumin",
      source: "Curcuma longa (Turmeric)",
      description: "A polyphenol with documented anti-inflammatory, antioxidant, and potential anti-cancer actions.",
      molecularWeight: "368.38 g/mol",
      formula: "C21H20O6"
    },
    {
      id: "quercetin",
      name: "Quercetin",
      source: "Onions, Apples, Berries",
      description: "A flavonoid antioxidant known to inhibit multiple inflammatory pathways and cell-cycle kinases.",
      molecularWeight: "302.23 g/mol",
      formula: "C15H10O7"
    },
    {
      id: "genistein",
      name: "Genistein",
      source: "Glycine max (Soybeans)",
      description: "An isoflavone phytoestrogen that competes with estrogen, acting as a potential ER antagonist in breast cancer cells.",
      molecularWeight: "270.24 g/mol",
      formula: "C15H10O5"
    }
  ],
  // Grid of results to simulate realistic docking scores
  dockingResults: {
    "er-alpha": {
      "curcumin": { score: -8.1, hBonds: 3, residues: "Glu353, Arg394, Leu387", efficacy: "Moderate antagonist potential. Good steric fit." },
      "quercetin": { score: -8.6, hBonds: 4, residues: "Glu353, Arg394, His524, Thr347", efficacy: "High binding affinity. Strong hydrogen-bonding network matching native ligand estradiol." },
      "genistein": { score: -9.2, hBonds: 4, residues: "Glu353, Arg394, His524, Leu346", efficacy: "Excellent binding affinity. Phytoestrogenic structure closely mimics tamoxifen active metabolite." }
    },
    "her2": {
      "curcumin": { score: -7.5, hBonds: 2, residues: "Asp808, Met801", efficacy: "Moderate kinase inhibitor potential." },
      "quercetin": { score: -7.9, hBonds: 3, residues: "Asp808, Lys753, Thr862", efficacy: "Moderate kinase inhibitor potential with favorable binding energy." },
      "genistein": { score: -8.3, hBonds: 3, residues: "Asp808, Lys753, Met801", efficacy: "Strong competitive binding at ATP-binding cleft of kinase domain." }
    },
    "cox2": {
      "curcumin": { score: -9.0, hBonds: 4, residues: "Arg120, Tyr355, Ser530, Val523", efficacy: "Excellent binding affinity. Selectively docks in the side pocket of COX-2 over COX-1." },
      "quercetin": { score: -8.2, hBonds: 3, residues: "Arg120, Tyr355, Glu524", efficacy: "High binding affinity. Strong interaction with key catalytic residues." },
      "genistein": { score: -7.4, hBonds: 2, residues: "Arg120, Tyr355", efficacy: "Moderate anti-inflammatory binding profile." }
    }
  }
};
