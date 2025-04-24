"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const addSkill = async (skillId: number, portfolioId: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolio_skills")
    .insert({ skill_id: skillId, portfolio_id: portfolioId })
    .select("*, skills(*)");

  revalidatePath("/");
  return { data, error };
};

export const getSkills = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("skills").select("*");

  return { data, error };
};

export const getPortfolioSkills = async (portfolioId: number) => {
  const supabase = await createClient();

  // Get all skills for a specific portfolio with nested skill data
  const { data, error } = await supabase
    .from("portfolio_skills")
    .select("id, portfolio_id, skill_id, skills(*)")
    .eq("portfolio_id", portfolioId);

  return { data, error };
};

export const getSkillCategories = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("skill_categories").select("*");

  return { data, error };
};

export const deleteSkill = async (skillId: number, portfolioId: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolio_skills")
    .delete()
    .match({ skill_id: skillId, portfolio_id: portfolioId })
    .select();

  revalidatePath("/");
  return { data, error };
};
