import React from "react";
import { 
  GraduationCap, 
  Award, 
  Briefcase, 
  Users,
  Calendar,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { 
  educationData, 
  certifications, 
  engineeringExperience, 
  leadershipExperience 
} from "@/lib/modern-portfolio-data";

const parseExperience = (exp: string) => {
  // Pattern: "Company (Role, Year): Description"
  const match = exp.match(/^(.+?)\s\((.+?),\s(.+?)\):\s(.+)$/);
  if (match) {
    return {
      company: match[1],
      role: match[2],
      period: match[3],
      description: match[4],
    };
  }
  return { company: exp, role: "", period: "", description: "" };
};

export function ModernCredentials() {
  return (
    <section 
      data-index="2" 
      id="credentials"
      className="bg-background px-8 md:px-16 py-32 border-t border-gray-100"
    >
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-16">
          <span className="text-accent font-mono text-sm">02</span>
          <span className="w-8 h-px bg-gray-200" />
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 font-bold">
            Credentials
          </p>
        </div>
        
        <h2
          className="font-black text-black leading-[0.88] tracking-tighter mb-24 font-archivo"
          style={{ fontSize: "clamp(2.3rem, 6vw, 5.5rem)" }}
        >
          ACADEMIC & PROFESSIONAL<br />
          <span className="text-accent">MILESTONES</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Education & Certs */}
          <div className="lg:col-span-5 space-y-20">
            
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <GraduationCap className="w-5 h-5 text-accent" />
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-bold">Education</h3>
              </div>
              <div className="space-y-12">
                {educationData.map((item) => (
                  <div key={item.school} className="group">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-black text-lg font-archivo group-hover:text-accent transition-colors">
                        {item.school}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                      <span className="flex items-center gap-1 text-accent font-bold"><Calendar className="w-3 h-3" /> {item.period}</span>
                    </div>
                    <p className="text-gray-800 font-medium mb-4 leading-relaxed">
                      {item.program}
                    </p>
                    <ul className="space-y-2">
                      {item.details.map((line) => (
                        <li key={line} className="text-sm text-gray-500 leading-relaxed flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <Award className="w-5 h-5 text-accent" />
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-bold">Certifications</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {certifications.map((item) => (
                  <div 
                    key={item} 
                    className="flex items-center gap-4 p-4 border border-gray-100 hover:border-accent/30 hover:bg-accent/[0.02] transition-all group"
                  >
                    <CheckCircle2 className="w-5 h-5 text-gray-300 group-hover:text-accent transition-colors" />
                    <p className="text-sm text-black font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Experience */}
          <div className="lg:col-span-7 space-y-20">
            
            {/* Engineering Experience */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <Briefcase className="w-5 h-5 text-accent" />
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-bold">Engineering Experience</h3>
              </div>
              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                {engineeringExperience.map((item, idx) => {
                  const { company, role, period, description } = parseExperience(item);
                  return (
                    <div key={idx} className="relative pl-10 group">
                      <div className="absolute left-0 top-1.5 w-[23px] h-[23px] bg-white border-2 border-gray-100 rounded-full group-hover:border-accent transition-colors flex items-center justify-center z-10">
                         <div className="w-1.5 h-1.5 bg-gray-200 group-hover:bg-accent rounded-full transition-colors" />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <p className="font-bold text-black font-archivo group-hover:text-accent transition-colors">
                          {company}
                        </p>
                        <span className="text-[10px] font-bold text-accent px-2 py-1 bg-accent/5 rounded tracking-wider uppercase">
                          {period}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 font-semibold mb-2">{role}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leadership */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <Users className="w-5 h-5 text-accent" />
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-bold">Leadership & Community</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {leadershipExperience.map((item, idx) => {
                  const { company, role, period, description } = parseExperience(item);
                  return (
                    <div 
                      key={idx} 
                      className="p-6 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[9px] font-black text-gray-400 group-hover:text-accent tracking-[0.2em] transition-colors">
                          {period}
                        </span>
                      </div>
                      <p className="font-bold text-black text-sm mb-1 font-archivo">{company}</p>
                      <p className="text-xs text-accent font-bold mb-3">{role}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
