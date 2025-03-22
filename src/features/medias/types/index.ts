export type Media = {
  id: string;
  portfolio_id: string;
  file_url: string;
  type: 'image' | 'video';
  created_at: string;
  reference_id: string;
  reference_type: 'experience' | 'project' | 'education';
};
