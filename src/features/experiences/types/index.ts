export type Experience = {
  id: number;
  portfolio_id: number;
  role: string;
  company: string;
  employment_type?: string;
  start_date: string;
  end_date: string | null;
  description?: string;
  created_at: string;
  logo?: string;
};
