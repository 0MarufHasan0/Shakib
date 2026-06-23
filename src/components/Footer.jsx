export default function Footer({ personalInfo }) {
  const name = personalInfo?.name || "Md Shakib Al Hasan";
  const email = personalInfo?.email || "shakib.pharmacy@gmail.com";
  const linkedin = personalInfo?.linkedin || "https://linkedin.com/in/md-shakib-al-hasan";
  const researchgate = personalInfo?.researchgate || "https://www.researchgate.net/profile/Md-Shakib-Al-Hasan";

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/40 pt-16 pb-8 px-margin-mobile md:px-margin-desktop" id="connect">
      <div className="max-w-container-max mx-auto">
        
        {/* Upper footer */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          
          {/* Logo & Narrative */}
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                science
              </span>
              <h2 className="font-headline-md text-xl font-extrabold text-primary tracking-tight">
                {name}
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Pharmacy researcher dedicated to clinical therapeutics, pharmacy practice safety, and computational structure-based drug design. Open to research partnerships and professional invitations.
            </p>
          </div>

          {/* Quick Connect Portal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-label-md text-label-md text-on-surface font-extrabold uppercase tracking-widest border-b border-outline-variant/20 pb-2">
              Connect Channels
            </h3>
            
            <a
              className="flex items-center gap-2.5 text-on-surface-variant hover:text-primary transition-colors font-medium font-body-sm text-body-sm"
              href={`mailto:${email}`}
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              <span>{email}</span>
            </a>
            
            <a
              className="flex items-center gap-2.5 text-on-surface-variant hover:text-primary transition-colors font-medium font-body-sm text-body-sm"
              href={linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-lg">share</span>
              <span>LinkedIn Profile</span>
            </a>
            
            <a
              className="flex items-center gap-2.5 text-on-surface-variant hover:text-primary transition-colors font-medium font-body-sm text-body-sm"
              href={researchgate}
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-lg">menu_book</span>
              <span>ResearchGate Publications</span>
            </a>
          </div>

        </div>

        {/* Lower footer copyright */}
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body-sm text-body-sm text-on-surface-variant text-center sm:text-left">
            © {new Date().getFullYear()} {name} | Pharmacy Researcher &amp; Future Clinical Pharmacist.
          </p>
          
          <div className="flex gap-stack-md flex-wrap justify-center">
            <span className="px-3.5 py-1 bg-secondary-container text-on-secondary-container text-label-sm font-label-sm rounded-full font-bold shadow-sm border border-secondary/15 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              Clinical Pharmacist in Training
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
