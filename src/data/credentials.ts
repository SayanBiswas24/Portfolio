export interface CredentialItem {
  id: string;
  category: "Hackathon" | "Certification" | "Award" | "Course";
  title: string;
  organization: string;
  year: string;
  badge?: string;
  description?: string;
  url?: string;
}

export const credentials: CredentialItem[] = [
  {
    id: "cred-1",
    category: "Hackathon",
    title: "Finalist — Ranchi Hacks",
    organization: "Google Developers Group (GDG)",
    year: "Jan 2026",
    badge: "HACKATHON FINALIST",
    description:
      "Finalist at the Ranchi Hacks hackathon organized by Google Developers Group (GDG).",
    url: "",
  },
  {
    id: "cred-2",
    category: "Hackathon",
    title: "Finalist — Hackatron 3.0",
    organization: "HNCC, BIT Sindri",
    year: "April 2026",
    badge: "HACKATHON FINALIST",
    description:
      "Finalist at Hackatron 3.0 organized by Hackathon and Coding Club (HNCC), BIT Sindri.",
    url: "",
  },
];
