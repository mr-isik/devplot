export type Project = {
  id: number;
  portfolio_id: number;
  title: string;
  description: string;
  repo_url: string | null;
  live_url: string | null;
  created_at: string;
  image: string;
};
