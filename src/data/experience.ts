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
    id: "digital-guru",
    year: "2024",
    role: "Flutter Developer Intern",
    organization: "Digital Guru",
    description:
      "Engineered an AI call assistant and built an adaptive micro-learning platform that delivers structured daily topics to users dynamically tailored to their selected course length and study pace.",
    technologies: [
      "Flutter",
      "Dart",
      "AI Assistant",
      "Micro-Learning Engine",
      "REST APIs",
      "State Management",
    ],
  },
];

export const education: EducationItem[] = [
  {
    id: "bit-sindri",
    degree: "Information Technology",
    institution: "BIT Sindri",
    period: "3rd Year Undergraduate",
    detail:
      "Pursuing Bachelor of Technology (B.Tech) in Information Technology at BIT Sindri (3rd year undergraduate). Focused on software engineering, distributed systems, mobile architectures, and algorithm design.",
  },
];
