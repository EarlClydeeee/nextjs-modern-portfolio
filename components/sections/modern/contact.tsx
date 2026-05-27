import React from "react";
import { 
  Mail, 
  UserRound, 
  CodeXml, 
  Globe 
} from "lucide-react";

export function ModernContact() {
  return (
    <section 
      data-index="6" 
      id="contact"
      className="min-h-screen bg-background flex flex-col justify-between px-8 md:px-16 pt-36 pb-16"
    >
      <div className="max-w-screen-xl mx-auto w-full flex flex-col flex-1 justify-between">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center gap-3 mb-16">
            <span className="text-accent font-mono text-sm">06</span>
            <span className="w-8 h-px bg-gray-200" />
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 font-bold">
              Contact
            </p>
          </div>
          
          <h2
            className="font-black text-black leading-[0.82] tracking-[-0.04em] mb-16 font-archivo"
            style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
          >
            LET&apos;S<br /><span className="text-accent">BUILD</span><br />SYSTEMS
          </h2>
          
          <p className="text-xl md:text-3xl text-gray-500 max-w-2xl leading-tight mb-16 font-light tracking-tight">
            If you&apos;re building something that needs to work — in the real world, under real
            conditions — <span className="text-black font-medium border-b-2 border-accent/20">I&apos;m the engineer you want on it.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="mailto:earlclyde.mbanez@gmail.com"
              className="group bg-accent text-white px-12 py-6 font-black text-xs tracking-[0.2em] uppercase hover:bg-black transition-all duration-500 text-center flex items-center justify-center gap-3 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Mail className="w-4 h-4" /> Send a Message
              </span>
              <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <a
              href="https://www.linkedin.com/in/earl-clyde-bañez/"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-2 border-black text-black px-12 py-6 font-black text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-500 text-center flex items-center justify-center gap-3"
            >
              <UserRound className="w-4 h-4 group-hover:scale-110 transition-transform" /> View LinkedIn
            </a>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-10 mt-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <p className="text-black font-black text-lg font-archivo tracking-tighter">EARL CLYDE</p>
            <p className="text-gray-400 text-sm font-medium tracking-tight">© 2026. Built for operational impact.</p>
          </div>
          
          <div className="flex gap-10">
            {[
              { label: "GitHub", href: "https://github.com/EarlClydeeee", icon: <CodeXml className="w-4 h-4" /> },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/earl-clyde-bañez/", icon: <Globe className="w-4 h-4" /> },
              { label: "Email", href: "mailto:earlclyde.mbanez@gmail.com", icon: <Mail className="w-4 h-4" /> },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-accent transition-all flex items-center gap-2 group"
                title={label}
              >
                <span className="group-hover:scale-110 group-hover:-translate-y-1 transition-transform">{icon}</span>
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
