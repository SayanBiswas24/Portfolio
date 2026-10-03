export interface CredentialItem {
  id: string;
  category: "Certification" | "Hackathon" | "Award" | "Course";
  title: string;
  organization: string;
  year: string;
  url: string;
  isPlaceholder?: boolean;
}

export const credentials: CredentialItem[] = [
  {
    id: "cred-1",
    category: "Certification",
    title: "Certificate / Credential Placeholder 01",
    organization: "Issuing Organization / Authority",
    year: "2026",
    url: "",
    isPlaceholder: true,
  },
  {
    id: "cred-2",
    category: "Hackathon",
    title: "Hackathon Achievement Placeholder 02",
    organization: "Organizing Body / Event",
    year: "2025",
    url: "",
    isPlaceholder: true,
  },
  {
    id: "cred-3",
    category: "Course",
    title: "Specialized Course Credential Placeholder 03",
    organization: "Academic or Industry Platform",
    year: "2025",
    url: "",
    isPlaceholder: true,
  },
];
