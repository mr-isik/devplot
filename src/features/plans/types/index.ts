export type Plan = {
  id: number;
  name: string;
  features: string[];
  product_id: string;
  button_text: string;
  featured: boolean;
  prices: {
    currency: string;
    billing_cycle: string;
    price_amount: number;
    price_id: string;
  }[];
};
