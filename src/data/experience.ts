export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  organization: string;
  description: string;
  technologies?: string[];
  isPlaceholder?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  detail: string;
  isPlaceholder?: boolean;
}

export const experiences: ExperienceItem[] = [
  {
    id: "exp-1",
    year: "2026",
    role: "Full-Stack & Mobile Developer (Placeholder)",
    organization: "Company / Organization Name",
    description:
      "Engineered responsive applications, integrated backend microservices, and collaborated on architecture design and delivery pipelines.",
    technologies: ["Flutter", "TypeScript", "Node.js"],
    isPlaceholder: true,
  },
  {
    id: "exp-2",
    year: "2025",
    role: "Software Engineering Intern (Placeholder)",
    organization: "Company / Organization Name",
    description:
      "Contributed to frontend feature development, REST API integrations, and unit test automation across client-facing products.",
    technologies: ["React", "Express", "MongoDB"],
    isPlaceholder: true,
  },
];

export const education: EducationItem[] = [
  {
    id: "edu-1",
    degree: "Degree / Program Name (Placeholder)",
    institution: "Institution / University Name",
    period: "Expected Graduation: 2026",
    detail: "Focused on Computer Science, Software Engineering & Systems Architecture.",
    isPlaceholder: true,
  },
];
