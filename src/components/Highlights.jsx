export default function Highlights() {
  const highlights = [
    {
      icon: "school",
      title: "Pharmacy Student",
      desc: "Pursuing B.Pharm at KYAU with academic excellence and rigorous clinical training.",
      color: "text-primary",
      bgColor: "bg-primary/5",
    },
    {
      icon: "local_hospital",
      title: "Clinical Focus",
      desc: "Clinical ward rounds exposure with a deep passion for patient-centered therapeutic care.",
      color: "text-secondary",
      bgColor: "bg-secondary/5",
    },
    {
      icon: "biotech",
      title: "Molecular Docking",
      desc: "Conducting in silico molecular docking and ADME simulations for drug candidate optimization.",
      color: "text-primary",
      bgColor: "bg-primary/5",
    },
    {
      icon: "precision_manufacturing",
      title: "Future Pharmacist",
      desc: "Committed to bridging laboratory-based bio-computational research with bedside practice.",
      color: "text-secondary",
      bgColor: "bg-secondary/5",
    },
  ];

  return (
    <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-low/40">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-surface-container-lowest border border-outline-variant/50 rounded-2xl clinical-shadow hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col gap-4 group"
            >
              <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                <span className={`material-symbols-outlined ${item.color} text-2xl`}>
                  {item.icon}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-headline-md text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
