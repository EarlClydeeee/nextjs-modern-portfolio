export type Education = {
  school: string;
  location: string;
  program: string;
  period: string;
  details: string[];
};

export type Certification = string;

export type Experience = string;

export const educationData: Education[] = [
  {
    school: "Polytechnic University of the Philippines",
    location: "Sta. Mesa, Manila",
    program:
      "Bachelor of Science in Computer Engineering, Major in Artificial Intelligence and Machine Learning",
    period: "Expected 2027",
    details: [
      "Relevant Coursework: Programming, Logic and Design, Object-Oriented Programming, Data Structures and Algorithms",
      "Scholarships: CHED Merit Scholar, DTI x Google Scholar, CARD SME Scholar, DataCamp Scholar",
    ],
  },
  {
    school: "Our Lady of the Holy Rosary School - Senior High School",
    location: "Tanza, Cavite",
    program: "Graduated with High Honors",
    period: "Completed",
    details: ["Batch Rank 8, Grade 11 Highest Honor, Batch Rank 3"],
  },
];

export const certifications: Certification[] = [
  "AI Engineer for Developers Associate - DataCamp",
  "Foundations of Project Management - Google Coursera",
];

export const engineeringExperience: Experience[] = [
  "Hayakawa Electronics Philippines Corp. (Software Engineering Front-End Lead, 2025): Built OMS tracking 2M+ production cycles; modularized UI and contributed to predictive maintenance backend; improved reporting efficiency by 45%.",
  "AWS Cloud Club - PUP Manila (Development Team, 2023-Present): Maintained Skill Builder LMS, AWS Cloud Club website, and TEDxPUP site; contributed to gamified platform used across 7 technical departments.",
  "AWS User Group Philippines (Tech Committee Developer, 2025): Conceptualized event website and proposed AWSUG NFC ID System for real-time verification and attendance analytics.",
  "PUP Microsoft Student Community (Software Development Co-Lead, 2025-Present): Mentors developers on modern workflows, modular architecture, and scalable integration practices.",
  "GDG on Campus - PUP Manila (Data and ML Cadet, 2025-Present): Supports AI prototypes and hands-on ML experimentation with Python-based tooling.",
  "ICpEP.SE - PUP Manila (Software Engineer and Project Manager, 2025-Present): Led certificate generator architecture, CSV/template pipeline, and team delivery workflows.",
  "ACCESS - PUP (Lead Senior Software Developer, 2023-Present): Co-developing ACCESS modules and CPE Fair Management Platform for centralized engagement and real-time competition operations.",
];

export const leadershipExperience: Experience[] = [
  "ACCESS - PUP (Front-End Lead, 2025-2026): Supported technical and academic initiatives; delivered web systems and communication materials.",
  "SINAG (President, 2022-2023): Directed innovation programs and mentored peers in technology-driven community projects.",
  "One Mulawin (Secretary, 2022-2023): Coordinated 10+ projects, led media team, and increased engagement by 35%.",
  "College of Engineering Student Council (Senior Councilor, 2024-Present): Represents Computer Engineering students and supports inter-department collaboration.",
  "Our Lady of the Holy Rosary Student Council (De La Salle Supervised, 2022-2023): Organized school-wide leadership and outreach activities.",
];

export type DeployedProject = {
  id: string;
  name: string;
  year: string;
  intensity: "High" | "Medium" | "Core";
  category: string;
  role: string;
  tools: string[];
  impact: string;
  summary: string;
  highlights: string[];
};

export const projects: DeployedProject[] = [
  {
    id: "01",
    name: "ACCESS Official Website: Directory & Asset Management",
    year: "2026",
    intensity: "Core",
    category: "Organizational Systems",
    role: "Led frontend architecture and key system workflows.",
    tools: ["Next.js", "React", "Tailwind CSS", "Supabase", "PostgreSQL"],
    impact: "Centralized governance directory and asset lifecycle workflows in one auditable platform.",
    summary: "Unified representative directory, dashboards, and RBAC-powered asset borrowing/returns for ACCESS-PUP.",
    highlights: [
      "Built dynamic org directory and responsive dashboards for student leadership visibility.",
      "Implemented role-based UI and borrowing workflow with approval/return status tracking.",
      "Integrated Supabase + PostgreSQL for auditable operations and centralized records.",
    ],
  },
  {
    id: "02",
    name: "OMS — Output Monitoring System",
    year: "2025",
    intensity: "Core",
    category: "Industrial / IoT",
    role: "Software Engineering Front-End Lead with backend contributions.",
    tools: ["HTML", "Tailwind CSS", "JavaScript", "PHP", "MySQL"],
    impact: "Tracked 2M+ machine/applicator outputs and improved reporting efficiency by ~45%.",
    summary: "Real-time production monitoring for machine output, component lifespan, and predictive maintenance.",
    highlights: [
      "Built modular front-end dashboards for traceability across production lines.",
      "Contributed to predictive maintenance logic and lifespan monitoring workflows.",
      "Implemented hybrid relational + JSON schema for high-volume industrial reporting.",
    ],
  },
  {
    id: "03",
    name: "AWSCCPUP Website & Membership Management System",
    year: "2026",
    intensity: "High",
    category: "Platform Engineering",
    role: "Full-stack contributor across frontend and API-integrated user flows.",
    tools: ["Astro", "React", "TypeScript", "FastAPI", "Python", "PostgreSQL"],
    impact: "Enabled centralized member management and discoverability for AWS Cloud Club PUP.",
    summary: "Production-ready membership platform with profile management, filtering, and backend reliability.",
    highlights: [
      "Implemented member directory, profile updates, and search/filter experiences.",
      "Integrated FastAPI REST endpoints with PostgreSQL-backed data operations.",
      "Delivered in an Astro Islands + React architecture with tested backend workflows.",
    ],
  },
  {
    id: "04",
    name: "AWS Skill Builder LMS",
    year: "2025",
    intensity: "High",
    category: "Learning Systems",
    role: "Contributed leaderboard and engagement-critical user interfaces.",
    tools: ["React", "TypeScript", "Express.js", "Supabase", "AWS"],
    impact: "Supported gamified learning workflows across 7 technical departments.",
    summary: "Centralized LMS with ranking mechanics, assignment visibility, and engagement loops.",
    highlights: [
      "Built landing and in-platform leaderboard features with dynamic ordering.",
      "Shipped supporting interfaces, including custom 404 and reusable UI components.",
      "Connected frontend modules to Express + Supabase data pipelines.",
    ],
  },
  {
    id: "05",
    name: "CPE Fair Tournament Management System",
    year: "2025",
    intensity: "High",
    category: "Operations Platform",
    role: "Full-stack developer for scoring, dashboard, and export workflows.",
    tools: ["Next.js", "Express.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    impact: "Automated tournament management with live visibility and admin control surfaces.",
    summary: "Competition platform with real-time leaderboard, bracket visualization, and authenticated admin tooling.",
    highlights: [
      "Built role-based scoring APIs with aggregation and Excel export.",
      "Shipped responsive bracket and leaderboard views with category filtering.",
      "Deployed as serverless stack for event-ready scale and reliability.",
    ],
  },
  {
    id: "06",
    name: "Drowzi — Cursor Manila Hack Sprint Champion",
    year: "2026",
    intensity: "High",
    category: "AI / Machine Learning",
    role: "Built the ML pipeline under hackathon constraints.",
    tools: ["Python", "Machine Learning", "Rapid Prototyping"],
    impact: "Won 1st Place; proved high-speed technical execution with AI pipeline ownership.",
    summary: "Competition-winning prototype focused on media processing and intelligent content handling.",
    highlights: [
      "Implemented ML workflow for media processing and inference-ready handling.",
      "Delivered end-to-end in a fast-paced hackathon environment.",
      "Validated execution quality through 1st place finish.",
    ],
  },
];

export const supportingProjects: DeployedProject[] = [
  {
    id: "07",
    name: "TEDxPUP Official Website",
    year: "2025",
    intensity: "Medium",
    category: "Frontend Delivery",
    role: "Frontend contributor for key user-facing sections.",
    tools: ["React", "Typeform Integration"],
    impact: "Improved event discoverability and streamlined registration flow.",
    summary: "Official event site with structured content and ticketing integration.",
    highlights: ["Built tablet view, FAQ, and contributors sections.", "Integrated Typeform for registration and engagement.", "Maintained compliance with TEDx branding and licensing."],
  },
  {
    id: "08",
    name: "ActiveCAMPUS GO",
    year: "2025",
    intensity: "Medium",
    category: "Wellness Product",
    role: "Co-developed platform architecture and real-time interactions.",
    tools: ["Next.js", "Express", "Firebase", "Google Maps API"],
    impact: "Ranked 8 across all-PUP; proved gamified engagement model for student wellness.",
    summary: "Location-aware gamified fitness web app with campus challenge mechanics.",
    highlights: ["Built PWA architecture and location interaction loops.", "Integrated step-based engagement logic with map zones.", "Delivered multi-user wellness challenge workflows."],
  },
  {
    id: "09",
    name: "AWS Cloud Club ID Finder System Upgrade",
    year: "2025",
    intensity: "Medium",
    category: "UI Modernization",
    role: "Led frontend redesign and responsive implementation.",
    tools: ["React", "TypeScript"],
    impact: "Raised usability, visual consistency, and mobile accessibility.",
    summary: "Modernized legacy ID Finder experience to production-grade interface standards.",
    highlights: ["Rebuilt UI from RetroUI style to modern SBD-aligned system.", "Delivered responsive layout behavior across screen sizes.", "Improved interaction clarity and consistency."],
  },
  {
    id: "10",
    name: "Sparkfest Project: Evidentia",
    year: "2025",
    intensity: "Medium",
    category: "Civic Tech + AI",
    role: "Originated and led concept + implementation direction.",
    tools: ["HTML", "CSS", "Python", "Gemini AI"],
    impact: "Tested by 100+ users; demonstrated incident triage and civic analytics utility.",
    summary: "Civic reporting system with AI-prioritized incident routing and heatmap analytics.",
    highlights: ["Built urgency filtering pipeline with Gemini AI.", "Integrated GPT-wrapped assistant for barangay Q&A.", "Shipped live analytics and heatmap visualization."],
  },
  {
    id: "11",
    name: "Sorting Algorithm Visualizer Plan",
    year: "2024-2025",
    intensity: "Medium",
    category: "Academic Product Design",
    role: "Led UX direction and animated flow design.",
    tools: ["Figma", "Python"],
    impact: "Improved algorithm comprehension through visual-first workflow design.",
    summary: "Designed animated learning flows for five core sorting algorithms.",
    highlights: ["Led visualization strategy for algorithm states.", "Applied glassmorphism visual system.", "Translated algorithm concepts into learner-friendly interactions."],
  },
  {
    id: "12",
    name: "Pythonic Symphony — Address Book System",
    year: "2023-2024",
    intensity: "Medium",
    category: "Foundational Engineering",
    role: "Sole developer for core CRUD and data handling.",
    tools: ["Python"],
    impact: "Served 25+ testers and improved retrieval efficiency by 40%.",
    summary: "Python contact management system with optimized dictionary-based data retrieval.",
    highlights: ["Built full CRUD workflow.", "Optimized data lookup through dictionary structures.", "Validated performance with test users."],
  },
];
