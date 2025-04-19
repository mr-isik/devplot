"use server";

import { skillSchema } from "@/lib/validations/portfolio";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createSkill = async (skill: z.infer<typeof skillSchema>) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("skills").insert(skill).select();

  revalidatePath("/");
  return { data, error };
};

export const getSkills = async (portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("portfolio_id", portfolioId);

  return { data, error };
};

export const deleteSkill = async (id: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id)
    .select();

  revalidatePath("/");
  return { data, error };
};
