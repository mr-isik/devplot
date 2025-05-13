"use server";

import { createClient } from "@/utils/supabase/server";

export const getPlans = async (country_code = "US") => {
  const supabase = await createClient();

  if (country_code) {
    const { data, error } = await supabase
      .from("plans")
      .select(
        "*, prices:plan_prices(currency, billing_cycle, price_amount, price_id)"
      )
      .eq("prices.country_code", country_code)
      .order("created_at", { ascending: true });

    return { data, error };
  }

  const { data, error } = await supabase
    .from("plans")
    .select(
      "*, prices:plan_prices(currency, billing_cycle, price_amount, price_id)"
    )
    .order("created_at", { ascending: true });

  return { data, error };
};

export const getPlanById = async (
  id: string,
  priceId: string,
  country_code?: string
) => {
  const supabase = await createClient();

  if (country_code) {
    const { data, error } = await supabase
      .from("plans")
      .select(
        "*, prices:plan_prices(currency, billing_cycle, price_amount, price_id)"
      )
      .eq("id", id)
      .eq("prices.price_id", priceId)
      .eq("prices.country_code", country_code)
      .single();

    return { data, error };
  }

  const { data, error } = await supabase
    .from("plans")
    .select(
      "*, prices:plan_prices(currency, billing_cycle, price_amount, price_id)"
    )
    .eq("id", id)
    .eq("prices.price_id", priceId)
    .single();
  return { data, error };
};

export const getPlanByName = async (name: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .eq("name", name)
    .single();

  return { data, error };
};
