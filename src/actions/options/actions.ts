"use server";

import type { Option } from "@/features/portfolios/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db/db";

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

export async function createOption(data: any) {
  try {
    // Tema seçeneklerini JSON formatına dönüştür
    let optionsData = data;

    // Eğer options bir obje ise, JSON string'e dönüştür
    if (typeof data.options === "object") {
      optionsData = {
        ...data,
        options: JSON.stringify(data.options),
      };
    }

    const option = await db.insert(options).values(optionsData).returning();
    return option[0];
  } catch (error) {
    console.error("Error creating option:", error);
    throw error;
  }
}

export async function updateOption(id: string, data: any) {
  try {
    // Tema seçeneklerini JSON formatına dönüştür
    let optionsData = data;

    // Eğer options bir obje ise, JSON string'e dönüştür
    if (typeof data.options === "object") {
      optionsData = {
        ...data,
        options: JSON.stringify(data.options),
      };
    }

    const option = await db
      .update(options)
      .set(optionsData)
      .where(eq(options.id, id))
      .returning();
    return option[0];
  } catch (error) {
    console.error("Error updating option:", error);
    throw error;
  }
}
