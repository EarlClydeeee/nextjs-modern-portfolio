import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function ModernHero({ 
  scrollToSection 
}: { 
  scrollToSection: (index: number) => void 
}) {
  return (
    <section 
      data-index="0" 
      id="hero"
      className="min-h-screen bg-black flex flex-col justify-between px-8 md:px-16 pt-36 pb-16 relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-12 animate-in fade-in slide-in-from-left-4 duration-1000">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
          <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold">
            Engineering Systems for 2026
          </p>
        </div>
        
        <h1
          className="font-black text-white leading-[0.8] tracking-[-0.04em] mb-12 font-archivo animate-in fade-in slide-in-from-top-8 duration-1000 ease-out"
          style={{ fontSize: "clamp(5rem, 18vw, 16rem)" }}
        >
          EARL<br />CLYDE
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-xl animate-in fade-in slide-in-from-bottom-4 delay-300 duration-1000">
            <p className="text-xl md:text-3xl text-gray-400 font-light leading-tight tracking-tight">
              Bridging the gap between{" "}
              <span className="text-white font-medium border-b border-accent/30">embedded hardware</span> and{" "}
              <span className="text-white font-medium border-b border-accent/30">production software</span>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row md:flex-col gap-4 flex-shrink-0 animate-in fade-in slide-in-from-right-4 delay-500 duration-1000">
            <button
              onClick={() => scrollToSection(4)}
              className="group bg-accent text-white px-10 py-5 font-black text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden"
            >
              <span className="relative z-10">View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
            <button
              onClick={() => scrollToSection(6)}
              className="group border border-gray-800 text-white px-10 py-5 font-bold text-xs tracking-[0.2em] uppercase hover:border-accent hover:text-accent transition-all duration-500 flex items-center justify-center gap-3"
            >
              Get in Touch <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between border-t border-gray-900 pt-8 mt-16 animate-in fade-in duration-1000 delay-700">
        <div className="flex gap-10 md:gap-20">
          {[
            { num: "6+", label: "Projects Shipped" },
            { num: "2", label: "Domains Mastered" },
            { num: "3+", label: "Years Building" },
          ].map(({ num, label }) => (
            <div key={label} className="group cursor-default">
              <p className="text-3xl md:text-4xl font-black text-white font-archivo group-hover:text-accent transition-colors">{num}</p>
              <p className="text-gray-600 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-2 font-bold group-hover:text-gray-400 transition-colors">{label}</p>
            </div>
          ))}
        </div>
        
        <div className="hidden md:flex flex-col items-end gap-2 group cursor-pointer" onClick={() => scrollToSection(1)}>
           <p className="text-gray-700 text-[10px] tracking-[0.3em] uppercase font-bold group-hover:text-accent transition-colors">
            Explore
          </p>
          <div className="w-px h-12 bg-gray-800 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-[scroll_2s_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}
