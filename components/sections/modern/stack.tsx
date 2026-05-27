import React from "react";
import { 
  Layers, 
  Terminal, 
  Database, 
  Cpu, 
  Settings, 
  Zap 
} from "lucide-react";

const skillIcons: Record<string, React.ReactNode> = {
  Frontend: <Layers className="w-5 h-5" />,
  Backend: <Terminal className="w-5 h-5" />,
  "Data & Storage": <Database className="w-5 h-5" />,
  "Embedded & Hardware": <Cpu className="w-5 h-5" />,
  "Systems & Tooling": <Settings className="w-5 h-5" />,
  "Expanding Into": <Zap className="w-5 h-5" />,
};

const skills: Record<string, string[]> = {
  Frontend: ["JavaScript", "HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
  Backend: ["PHP", "Node.js", "REST APIs", "Authentication"],
  "Data & Storage": ["MySQL", "Database Design", "Data Modeling"],
  "Embedded & Hardware": ["Arduino", "Sensors", "NFC Systems", "Embedded C"],
  "Systems & Tooling": ["Git", "Linux", "Monitoring Systems", "Automation Logic"],
  "Expanding Into": ["Python", "Machine Learning", "AI Systems"],
};

export function ModernStack() {
  return (
    <section 
      data-index="3" 
      id="stack"
      className="min-h-screen bg-[#080808] flex flex-col justify-center px-8 md:px-16 py-32"
    >
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-16">
          <span className="text-accent font-mono text-sm">03</span>
          <span className="w-8 h-px bg-gray-800" />
          <p className="text-xs tracking-[0.3em] uppercase text-gray-600 font-bold">
            Stack
          </p>
        </div>
        
        <h2
          className="font-black text-white leading-[0.88] tracking-tighter mb-24 font-archivo"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          ENGINEERED WITH<br />
          <span className="text-accent text-outline-white">PRECISION</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-900 border border-gray-900">
          {Object.entries(skills).map(([category, items]) => (
            <div 
              key={category} 
              className="bg-[#080808] p-10 hover:bg-[#101010] transition-all duration-500 group relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all duration-500" />
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-600 font-black group-hover:text-accent transition-colors">
                  {category}
                </p>
                <div className="text-gray-700 group-hover:text-accent group-hover:scale-110 transition-all duration-500">
                  {skillIcons[category]}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 relative z-10">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="text-white text-[11px] font-bold border border-gray-800 px-4 py-2 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Philosophy Note */}
        <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-gray-900 pt-10">
           <div className="max-w-md">
             <p className="text-gray-500 text-sm leading-relaxed font-light">
               I select tools based on <span className="text-white font-medium">operational stability</span> and <span className="text-white font-medium">long-term maintainability</span>. My stack is a reflection of my commitment to building systems that don&apos;t just work, but endure.
             </p>
           </div>
           <div className="flex gap-4">
              <div className="px-4 py-2 bg-gray-900 rounded-full border border-gray-800 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Performant
              </div>
              <div className="px-4 py-2 bg-gray-900 rounded-full border border-gray-800 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Scalable
              </div>
              <div className="px-4 py-2 bg-gray-900 rounded-full border border-gray-800 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Auditable
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
