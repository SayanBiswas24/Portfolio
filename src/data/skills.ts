export interface SkillCategory {
  category: string;
  code: string;
  description: string;
  skills: {
    name: string;
    focus?: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Mobile",
    code: "01/MOB",
    description: "Cross-platform mobile applications with expressive UI & native performance",
    skills: [
      { name: "Flutter", focus: "Architecture & UI" },
      { name: "Dart", focus: "Type safety & Async" },
    ],
  },
  {
    category: "Frontend",
    code: "02/FED",
    description: "Interactive, accessible, and performant web interfaces",
    skills: [
      { name: "React", focus: "Component Systems" },
      { name: "TypeScript", focus: "Strict Typing" },
      { name: "JavaScript", focus: "ESNext" },
      { name: "HTML", focus: "Semantic & SEO" },
      { name: "CSS", focus: "Modern Layouts" },
      { name: "Tailwind CSS", focus: "Design Systems" },
    ],
  },
  {
    category: "Backend",
    code: "03/SRV",
    description: "Scalable server systems, resilient pipelines & modular APIs",
    skills: [
      { name: "Node.js", focus: "Runtime Engine" },
      { name: "Express", focus: "Microservices" },
      { name: "NestJS", focus: "Enterprise Architecture" },
      { name: "REST APIs", focus: "API Design & Spec" },
    ],
  },
  {
    category: "Databases",
    code: "04/DAT",
    description: "Data persistence, indexing & real-time sync platforms",
    skills: [
      { name: "MongoDB", focus: "Document Store" },
      { name: "PostgreSQL", focus: "Relational Modeling" },
      { name: "Firebase", focus: "Realtime & Auth" },
      { name: "Supabase", focus: "Postgres & Edge" },
    ],
  },
  {
    category: "Blockchain",
    code: "05/BCN",
    description: "Decentralized state machines, smart contracts & distributed ledgers",
    skills: [
      { name: "Ethereum", focus: "EVM & Ecosystem" },
      { name: "Solidity", focus: "Smart Contracts" },
      { name: "Algorand", focus: "Pure Proof-of-Stake" },
      { name: "Algo", focus: "AVM & Native Assets" },
    ],
  },
  {
    category: "Tools & Environment",
    code: "06/ENV",
    description: "Developer tooling, virtualization, and Unix workflow",
    skills: [
      { name: "Git", focus: "VCS & GitOps" },
      { name: "GitHub", focus: "CI/CD & Collaboration" },
      { name: "Docker", focus: "Containerization" },
      { name: "VS Code", focus: "Dev Productivity" },
      { name: "Linux", focus: "CLI & Environment" },
    ],
  },
];
