"use server";

import type { Education } from "@/features/educations/types";
import { educationSchema } from "@/lib/validations/portfolio";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export const createEducation = async (
  education: z.infer<typeof educationSchema>,
  portfolioId: number
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

export const updateEducation = async (
  education: z.infer<typeof educationSchema>
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("educations")
    .update({
      school: education.school,
      degree: education.degree,
      field: education.field,
      start_date: education.start_date,
      end_date: education.end_date,
    })
    .eq("id", education.item_id);

  return { data, error };
};

export const deleteEducation = async (id: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("educations")
    .delete()
    .eq("id", id);

  return { data, error };
};
