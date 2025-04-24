"use server";

import type { Social } from "@/features/socials/types";
import { socialSchema } from "@/lib/validations/portfolio";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getSocials = async (
  portfolioId: number
): Promise<{ data: Social[] | null; error: any }> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("socials")
    .select("*")
    .eq("portfolio_id", portfolioId);

  return { data, error };
};

export const createSocial = async (
  social: z.infer<typeof socialSchema>,
  portfolioId: number
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("socials")
    .insert({
      ...social,
      portfolio_id: portfolioId,
    })
    .select();

  revalidatePath("/");
  return { data, error };
};

export const updateSocial = async (social: z.infer<typeof socialSchema>) => {
  if (!social.item_id) {
    return {
      data: null,
      error: new Error("Social ID is required for update"),
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("socials")
    .update({
      platform: social.platform,
      url: social.url,
    })
    .eq("id", social.item_id)
    .select();

  revalidatePath("/");
  return { data, error };
};

export const deleteSocial = async (id: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("socials")
    .delete()
    .eq("id", id)
    .select();

  revalidatePath("/");
  return { data, error };
};
