export type Experience = {
  id: string;
  portfolio_id: string;
  role: string;
  company: string;
  employment_type?: string;
  start_date: string;
  end_date: string | null;
  description?: string;
  created_at: string;
  logo?: string;
};
