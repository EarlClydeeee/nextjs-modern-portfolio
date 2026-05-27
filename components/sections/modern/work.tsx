import React, { useState } from "react";
import { 
  ArrowRight, 
  ChevronDown,
  Plus,
  Minus
} from "lucide-react";
import { projects, supportingProjects } from "@/lib/modern-portfolio-data";

export function ModernWork() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [showSupportingProjects, setShowSupportingProjects] = useState(false);

  return (
    <section 
      data-index="4" 
      id="work"
      className="bg-background px-8 md:px-16 py-32"
    >
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-16">
          <span className="text-accent font-mono text-sm">04</span>
          <span className="w-8 h-px bg-gray-200" />
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 font-bold">
            Work
          </p>
        </div>
        
        <h2
          className="font-black text-black leading-[0.88] tracking-tighter mb-24 font-archivo"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          ENGINEERING<br />
          <span className="text-accent">OUTCOMES</span>
        </h2>

        <div className="flex flex-col border-t border-gray-100">
          {projects.map((project) => {
            const projectKey = `core-${project.id}`;
            const isActive = activeProject === projectKey;
            
            return (
              <div key={projectKey} className="border-b border-gray-100 group">
                <button
                  className="w-full text-left py-12 flex items-center justify-between gap-8 transition-all duration-500"
                  onClick={() => setActiveProject(isActive ? null : projectKey)}
                  aria-expanded={isActive}
                >
                  <div className="flex items-center gap-8 md:gap-14 flex-1 min-w-0">
                    <span className="text-gray-300 text-xs font-bold font-archivo flex-shrink-0 tabular-nums group-hover:text-accent transition-colors">
                      {project.id}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-2xl md:text-4xl font-black text-black tracking-tight font-archivo group-hover:translate-x-2 transition-transform duration-500">
                        {project.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-3">
                         <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-bold">
                          {project.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block" />
                        <span className="text-gray-400 text-sm font-medium hidden sm:block">{project.summary.slice(0, 60)}...</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
                    <div className="hidden md:flex flex-col items-end gap-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold border border-gray-200 px-2 py-1 group-hover:border-accent/30 group-hover:text-accent transition-colors">
                        {project.intensity}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">{project.year}</span>
                    </div>
                    
                    <div className={`w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-500 ${isActive ? "bg-black border-black text-white rotate-180" : "group-hover:border-accent group-hover:text-accent group-hover:scale-110"}`}>
                      {isActive ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </div>
                </button>

                {isActive && (
                  <div className="pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="lg:col-span-8 space-y-10">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4 font-bold">Mission Scope</p>
                        <p className="text-gray-600 text-xl leading-relaxed font-light">{project.summary}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4 font-bold">Key Results</p>
                          <ul className="space-y-4">
                            {project.highlights.map((item, i) => (
                              <li key={i} className="text-gray-600 text-sm leading-relaxed flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-6 border-l-2 border-accent">
                          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4 font-bold">Impact Delivered</p>
                          <p className="text-black font-bold text-base leading-relaxed font-archivo">{project.impact}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-4 space-y-8 bg-gray-50 p-8">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4 font-bold">Contribution</p>
                        <p className="text-black leading-relaxed text-sm font-bold">{project.role}</p>
                      </div>
                      
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4 font-bold">Technology Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool) => (
                            <span key={tool} className="text-[9px] bg-white border border-gray-200 text-black px-3 py-1.5 font-bold uppercase tracking-wider">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="w-full flex items-center justify-center gap-2 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-colors">
                        Explore Case Study <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Supporting Projects Section */}
        <div className="mt-20">
          <button
            className="w-full flex items-center justify-between group py-6 border-b border-gray-200"
            onClick={() => setShowSupportingProjects(!showSupportingProjects)}
          >
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-accent transition-colors" />
               <h3 className="text-sm font-bold text-black uppercase tracking-widest">
                 Supporting Initiatives & Lab Works
               </h3>
               <span className="text-[10px] text-gray-400 font-medium">({supportingProjects.length})</span>
            </div>
            <div className={`transition-transform duration-300 ${showSupportingProjects ? "rotate-180" : ""}`}>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </button>

          {showSupportingProjects && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 border-x border-b border-gray-100 animate-in fade-in duration-500">
              {supportingProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white p-8 hover:bg-gray-50 transition-colors group relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-mono text-gray-300">#{project.id}</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest border border-gray-100 px-2 py-1">
                      {project.year}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-black mb-2 font-archivo group-hover:text-accent transition-colors">
                    {project.name}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tools.slice(0, 3).map(tool => (
                      <span key={tool} className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="text-[9px] text-gray-400 font-bold">+{project.tools.length - 3}</span>
                    )}
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black group-hover:text-accent transition-colors">
                    Details <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
