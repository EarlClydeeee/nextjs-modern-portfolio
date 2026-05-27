import React from "react";

const valueProps = [
  {
    number: "01",
    title: "Hardware + Web. Both.",
    body: "Most engineers live in one world. I build from sensors to servers — embedded systems, industrial hardware, and production web applications. That full-stack depth across layers is rare at any experience level.",
  },
  {
    number: "02",
    title: "Real Users. Real Stakes.",
    body: "My projects weren't tutorials or toy demos. They served real organizations, licensed events, and operational teams. I know what building under real constraints — and real accountability — actually feels like.",
  },
  {
    number: "03",
    title: "Systems Thinker.",
    body: "I don't just code features. I architect solutions — identifying the root problem, designing the right abstraction, and building for maintainability from day one. The difference between a codebase and a system.",
  },
  {
    number: "04",
    title: "Outcome-Oriented.",
    body: "Every project I take on has a measurable goal. Reduce manual work. Eliminate downtime risk. Automate repetition. I build toward outcomes, not outputs. The work ships when it works — not when it compiles.",
  },
  {
    number: "05",
    title: "Leadership Under Pressure.",
    body: "Student organizational leadership taught me to own decisions, communicate across roles, and deliver under pressure — skills most engineers don't develop until years on the job. I started early.",
  },
  {
    number: "06",
    title: "AI/ML Trajectory.",
    body: "Moving deliberately into ML and AI systems engineering. The combination of embedded hardware intuition, software architecture, and ML is a technical profile that's increasingly rare and in demand.",
  },
];

export function ModernWhyMe() {
  return (
    <section 
      data-index="5" 
      id="whyme"
      className="min-h-screen bg-black flex flex-col justify-center px-8 md:px-16 py-32"
    >
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-16">
          <span className="text-accent font-mono text-sm">05</span>
          <span className="w-8 h-px bg-gray-800" />
          <p className="text-xs tracking-[0.3em] uppercase text-gray-600 font-bold">
            Why Me
          </p>
        </div>
        
        <h2
          className="font-black text-white leading-[0.88] tracking-tighter mb-24 font-archivo"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          THE <span className="text-accent">OUTCOME</span><br />ENGINEER
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800 border border-gray-800">
          {valueProps.map((item) => (
            <div
              key={item.number}
              className="bg-black p-10 hover:bg-[#080808] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-accent font-mono text-[10px] tracking-widest">{item.number}</span>
              </div>
              <p className="text-accent text-[10px] font-bold font-mono mb-8 tracking-widest">{item.number}</p>
              <h3 className="text-white font-bold text-xl mb-5 leading-tight font-archivo group-hover:text-accent transition-colors">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light group-hover:text-gray-400 transition-colors">{item.body}</p>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
