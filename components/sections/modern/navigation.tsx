import React from "react";

export function ModernNavigation({ 
  scrollToSection 
}: { 
  scrollToSection: (index: number) => void 
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 transition-all duration-300 backdrop-blur-sm bg-white/5 border-b border-white/5" style={{ mixBlendMode: "difference" }}>
      <button 
        onClick={() => scrollToSection(0)} 
        className="text-white font-black text-sm tracking-[0.3em] uppercase hover:text-accent transition-colors"
      >
        EC
      </button>
      <div className="hidden md:flex items-center gap-10">
        {["About", "Credentials", "Stack", "Work", "Contact"].map((item, i) => (
          <button
            key={item}
            onClick={() => scrollToSection(i + 1)}
            className="text-white text-[10px] font-black tracking-[0.2em] uppercase hover:text-accent transition-all duration-300 relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
          </button>
        ))}
      </div>
    </nav>
  );
}

export function ModernNavDots({ 
  activeSection, 
  scrollToSection 
}: { 
  activeSection: number; 
  scrollToSection: (index: number) => void 
}) {
  const navSections = ["Hero", "About", "Credentials", "Stack", "Work", "Why Me", "Contact"];
  
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4" style={{ mixBlendMode: "difference" }}>
      {navSections.map((label, index) => (
        <button
          key={index}
          title={label}
          onClick={() => scrollToSection(index)}
          className="group relative flex items-center justify-end"
        >
          <span className="absolute right-8 text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none pr-2">
            {label}
          </span>
          <div
            className="transition-all duration-500 ease-out"
            style={{
              width: activeSection === index ? "32px" : "8px",
              height: "8px",
              backgroundColor: "white",
              borderRadius: activeSection === index ? "4px" : "50%",
              opacity: activeSection === index ? 1 : 0.2,
            }}
          />
        </button>
      ))}
    </div>
  );
}
