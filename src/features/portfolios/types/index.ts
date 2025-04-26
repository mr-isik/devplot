import { Education } from "@/features/educations/types";
import type { Experience } from "@/features/experiences/types";
import { Project } from "@/features/projects/types";
import type { Social } from "@/features/socials/types";

export type Portfolio = {
  id: number;
  tenant_id: number;
  created_at: string;
  contents: Content;
  options: Option[];
  socials: Social[];
  experiences: Experience[];
  projects: Project[];
  is_published: boolean;
  educations: Education[];
};

export type Option = {
  id: number;
  portfolio_id: number;
  options: string;
};

export type Content = {
  id: number;
  portfolio_id: number;
  hero_header: string;
  hero_description: string;
  meta_title: string;
  meta_description: string;
  about_text: string;
};
