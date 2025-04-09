"use server";

import type { Option } from "@/features/portfolios/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const createOption = async (
  option: Partial<Option>,
  portfolioId: string
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("options")
    .insert({
      ...option,
      portfolio_id: portfolioId,
    })
    .select();

  revalidatePath("/");
  return { data, error };
};

export const getOption = async (portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("options")
    .select("*")
    .eq("portfolio_id", portfolioId);

  return { data, error };
};

export const updateOption = async (
  option: Partial<Option>,
  portfolioId: string
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("options")
    .update(option)
    .eq("portfolio_id", portfolioId)
    .select();

  revalidatePath("/");
  return { data, error };
};

export const deleteOption = async (portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("options")
    .delete()
    .eq("portfolio_id", portfolioId);

  revalidatePath("/");
  return { data, error };
};
