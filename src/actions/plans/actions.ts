"use server";

import { polar } from "@/utils/polar/polar";
import { createClient } from "@/utils/supabase/server";

export const getPlans = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("plans").select("*");

  return { data, error };
};

export const planRedirect = async (product_id: string) => {
  const checkout = await polar.checkouts.create({
    products: [product_id],
  });

  return checkout;
};
