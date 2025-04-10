import type { Experience } from "@/features/experiences/types";
import type { Portfolio } from "@/features/portfolios/types";
import type { Project } from "@/features/projects/types";
import type { Social } from "@/features/socials/types";
import { Education } from "@/features/educations/types";
import { Skill } from "@/features/skills/types";

// Tema seçenekleri - sadece minimal tema şu an için
export type ThemeVariant = "minimal" | "modern" | "creative";

// ThemeProps, PortfolioThemeAdapter tarafından gönderilen tüm veriyi içerir
export type ThemeProps = {
  portfolio: Portfolio;
  experiences: Experience[];
  projects: Project[];
  socials: Social[];
  skills: Skill[];
  educations: Education[];
};

export type Theme = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  component: React.ComponentType<ThemeProps>;
};
