export interface ProjectScreenshot {
  id: string;
  label: string;
  tag: string;
  image: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  image: string;
  screenshots?: ProjectScreenshot[];
  github: string;
  live: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "kaushal-saathi",
    number: "01",
    title: "KAUSHAL SAATHI",
    tagline: "AI-Enabled Skill & Livelihood Discovery Platform",
    description:
      "An AI-enabled conversational platform designed to help beneficiaries discover relevant skills, opportunities and livelihood pathways through a simple, accessible interface.",
    technologies: [
      "Flutter",
      "AI",
      "Conversational Interfaces",
      "Bhashini",
      "Backend Systems",
    ],
    image: "/images/projects/kaushal-saathi/home.jpg",
    screenshots: [
      {
        id: "onboarding",
        label: "Voice AI Onboarding",
        tag: "01 // ONBOARDING",
        image: "/images/projects/kaushal-saathi/onboarding.jpg",
      },
      {
        id: "language",
        label: "Multilingual Dialects",
        tag: "02 // LANGUAGE",
        image: "/images/projects/kaushal-saathi/language.jpg",
      },
      {
        id: "home",
        label: "Conversational Dashboard",
        tag: "03 // DASHBOARD",
        image: "/images/projects/kaushal-saathi/home.jpg",
      },
      {
        id: "settings",
        label: "Voice & Speech Preferences",
        tag: "04 // SETTINGS",
        image: "/images/projects/kaushal-saathi/settings.jpg",
      },
    ],
    github: "",
    live: "",
    featured: true,
  },
  {
    id: "ai-phone-assistant",
    number: "02",
    title: "AI BUSINESS PHONE ASSISTANT",
    tagline: "Autonomous Voice & Call Intelligence System",
    description:
      "A voice-based assistant designed to handle business calls when the owner is unavailable, collect structured information from callers, and organize conversations for later review.",
    technologies: [
      "Flutter",
      "Node.js",
      "MongoDB",
      "Speech-to-Text",
      "Text-to-Speech",
    ],
    image: "/images/projects/ai-phone-assistant.webp",
    github: "",
    live: "",
    featured: true,
  },
  {
    id: "nagar-alert-hub",
    number: "03",
    title: "NAGAR ALERT HUB",
    tagline: "Civic Disruption & Intelligence Network",
    description:
      "A public-disruption intelligence platform focused on helping people in tier-2 and tier-3 cities discover and understand local disruptions and important civic information.",
    technologies: [
      "Flutter",
      "Firebase",
      "Supabase",
      "Gemini",
      "Maps",
    ],
    image: "/images/projects/nagar-alert.webp",
    github: "",
    live: "",
    featured: true,
  },
  {
    id: "kings-and-pigs",
    number: "04",
    title: "KINGS & PIGS",
    tagline: "Interactive 2D Game & State Engine",
    description:
      "A game project built to explore interactive interfaces, game logic, animation and state management.",
    technologies: [
      "Flutter",
      "Dart",
      "Game Development",
      "Animation",
    ],
    image: "/images/projects/kings-and-pigs.webp",
    github: "",
    live: "",
    featured: false,
  },
];
