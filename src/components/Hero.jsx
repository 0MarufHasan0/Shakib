export default function Hero({ personalInfo }) {
  // Graceful fallbacks if MongoDB database records are loading or empty
  const name = personalInfo?.name || "Md Shakib Al Hasan";
  const subtitle = personalInfo?.subtitle || "Pharmacy Scholar | In Silico Specialist | Clinical Trainee";
  const bio = personalInfo?.bio || "A forward-thinking Pharmacy scholar and researcher dedicated to bridging the divide between computational biophysics and clinical therapeutic care.";

  const stats = [
    { value: "4+", label: "Years of Rigorous Pharmacy Studies" },
    { value: "100+", label: "Bioactive Compounds Docked & Screened" }
  ];

  return (
    <section className="relative min-h-[90vh] md:h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-gradient-to-tr from-surface via-surface to-primary/5">
      {/* Dynamic Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-70"></div>
      
      {/* Decorative Animated Elements (Molecular particles) */}
      <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-primary/5 blur-xl animate-[pulse_6s_infinite]"></div>
      <div className="absolute bottom-1/3 right-12 w-32 h-32 rounded-full bg-secondary/5 blur-2xl animate-[pulse_8s_infinite]"></div>
      
      {/* Interactive Micro-dot Grid in Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(var(--color-outline-variant) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        opacity: 0.15
      }}></div>

      <div className="relative z-10 text-center px-margin-mobile max-w-4xl mx-auto flex flex-col items-center animate-fade-in-up">
        {/* Status/Focus Badge */}
        <div className="mb-stack-md inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold border border-secondary/20 shadow-sm animate-[fadeIn_1s_ease-out]">
          <span className="material-symbols-outlined text-sm leading-none animate-[spin_4s_linear_infinite]">rotate_right</span>
          Clinical Research & Pharmacology
        </div>

        {/* Hero Headline */}
        <h2 className="font-display-lg text-[36px] md:text-display-lg text-on-surface leading-tight mb-stack-md font-extrabold tracking-tight">
          {name}
        </h2>

        {/* Hero Subtitle */}
        <p className="font-headline-md text-lg md:text-headline-md text-on-surface-variant mb-stack-lg max-w-2xl mx-auto font-semibold">
          {subtitle}
        </p>

        {/* Short Bio snippet */}
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mb-10 text-center opacity-90 leading-relaxed font-medium">
          {bio}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-stack-md w-full sm:w-auto">
          <a
            href="#simulator"
            className="w-full sm:w-auto bg-primary text-on-primary font-label-md text-label-md px-stack-lg py-4 rounded-xl hover:bg-primary-container hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2.5 font-semibold group cursor-pointer"
          >
            <span className="material-symbols-outlined transition-transform group-hover:rotate-90">biotech</span>
            Try Docking Simulator
          </a>
          <a
            href="#research"
            className="w-full sm:w-auto border-2 border-secondary text-secondary font-label-md text-label-md px-stack-lg py-3.5 rounded-xl hover:bg-secondary/5 transition-all flex items-center justify-center gap-2 font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined">explore</span>
            View Research
          </a>
        </div>

        {/* Quick Stats Summary */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-outline-variant/30 pt-8 w-full max-w-md mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block font-display-lg text-3xl md:text-display-lg text-primary font-extrabold">
                {stat.value}
              </span>
              <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider block mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Down arrow link indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <a href="#about" className="text-outline hover:text-primary transition-colors" aria-label="Scroll to About Section">
          <span className="material-symbols-outlined text-3xl">expand_more</span>
        </a>
      </div>
    </section>
  );
}
