export type Plan = {
  id: number;
  name: string;
  price: number;
  recurrence: string;
  features: string[];
  createdAt: string;
  original_price?: number;
  product_id: string;
  button_text: string;
  featured: boolean;
};
