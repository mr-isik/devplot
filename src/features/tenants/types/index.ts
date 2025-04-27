export interface Tenant {
  id: number;
  user_id: number;
  subdomain: string;
  domain: string;
  created_at: Date;
}
