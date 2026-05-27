import React from "react";

export function ModernAbout() {
  return (
    <section 
      data-index="1" 
      id="about"
      className="min-h-screen bg-background flex flex-col justify-center px-8 md:px-16 py-32"
    >
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-16">
          <span className="text-accent font-mono text-sm">01</span>
          <span className="w-8 h-px bg-gray-200" />
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 font-bold">
            About
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          <div className="relative group">
            <h2
              className="font-black text-black leading-[0.88] tracking-tighter font-archivo relative z-10"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
            >
              BUILT<br />TO<br /><span className="text-accent">SHIP</span>
            </h2>
            <div className="absolute -left-4 -top-4 w-24 h-24 border-t-4 border-l-4 border-accent/20 group-hover:border-accent transition-all duration-500" />
          </div>
          
          <div className="flex flex-col gap-8">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
              I&apos;m a Computer Engineering student who builds systems that{" "}
              <em className="text-black font-normal not-italic border-b-2 border-accent/20">actually get used</em> — by real organizations, real teams, and real events.
            </p>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
              My work spans industrial monitoring platforms, organizational governance tools,
              hardware-integrated systems, and event technology. I don&apos;t prototype for demos.
              I build for deployment.
            </p>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
              What makes me different: I bridge the gap most engineers leave open — between
              embedded hardware and web software, between technical execution and operational
              impact. That range is uncommon. I&apos;m building it deliberately.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 border-t border-gray-100 mt-4">
              <div className="p-6 bg-gray-50 border-l-4 border-gray-200 hover:border-accent hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all">
                <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-3 font-bold">Currently</p>
                <p className="font-bold text-black text-base font-archivo">B.S. Computer Engineering</p>
                <p className="text-gray-500 text-sm mt-1">Polytechnic University of the Philippines</p>
              </div>
              <div className="p-6 bg-gray-50 border-l-4 border-gray-200 hover:border-accent hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all">
                <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-3 font-bold">Direction</p>
                <p className="font-bold text-black text-base font-archivo">Full-Stack + Embedded Systems</p>
                <p className="text-gray-500 text-sm mt-1">AI / ML engineering track — 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
