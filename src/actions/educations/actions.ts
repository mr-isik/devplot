"use server";

import type { Education } from "@/features/educations/types";
import { createClient } from "@/utils/supabase/server";

export const createEducation = async (
  education: Partial<Education>,
  portfolioId: string
) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("educations").insert({
    ...education,
    portfolio_id: portfolioId,
  });

  return { data, error };
};

export const getEducations = async (portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("educations")
    .select("*")
    .eq("portfolio_id", portfolioId);

  return { data, error };
};

export const updateEducation = async (education: Partial<Education>) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("educations")
    .update(education)
    .eq("id", education.id);

  return { data, error };
};

export const deleteEducation = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("educations")
    .delete()
    .eq("id", id);

  return { data, error };
};
