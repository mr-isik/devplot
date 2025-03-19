export type Project = {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  technologies: string[];
  live_url?: string;
  github_url?: string;
  order: number;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location?: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string;
  order: number;
};

export type Portfolio = {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  template_id: string;
  about_me: string;
  tech_stack: string;
  created_at: string;
  updated_at: string;
  projects?: Project[];
  experiences?: Experience[];
};
