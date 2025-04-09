import { Education } from "@/features/educations/types";
import type { Experience } from "@/features/experiences/types";
import { Project } from "@/features/projects/types";
import { Skill } from "@/features/skills/types";
import type { Social } from "@/features/socials/types";

export type Portfolio = {
  id: string;
  user_id: string;
  created_at: string;
  contents: Content;
  options: Option[];
  socials: Social[];
  experiences: Experience[];
  projects: Project[];
  is_published: boolean;
  educations: Education[];
  skills: Skill[];
};

export type Option = {
  id: string;
  portfolio_id: string;
  options: string;
};

export type Content = {
  id: string;
  portfolio_id: string;
  hero_header: string;
  hero_description: string;
  meta_title: string;
  meta_description: string;
  about_text: string;
};
