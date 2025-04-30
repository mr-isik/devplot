"use server";

import type { Content } from "@/features/portfolios/types";
import { contentSchema } from "@/lib/validations/portfolio";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createContent = async (
  content: z.infer<typeof contentSchema>,
  portfolioId: string
) => {
  const supabase = await createClient();

  if (content.favicon && content.favicon.length > 0) {
    const { error: uploadError } = await supabase.storage
      .from("contents")
      .upload(content.favicon[0], content.favicon[0]!, {
        upsert: true,
      });

    if (uploadError) {
      console.error("Favicon upload error:", uploadError);
      return {
        data: null,
        error: {
          ...uploadError,
          message: `Storage upload failed: ${uploadError.message}`,
        },
      };
    }

    const { data: faviconData } = supabase.storage
      .from("contents")
      .getPublicUrl(content.favicon[0]);

    content.favicon[0] = faviconData.publicUrl;

    const { data, error: updateError } = await supabase
      .from("contents")
      .insert({
        ...content,
        portfolio_id: portfolioId,
      })
      .select();

    revalidatePath("/");
    return { data, error: updateError };
  }

  const { data, error } = await supabase
    .from("contents")
    .insert({
      ...content,
      portfolio_id: portfolioId,
    })
    .select();

  revalidatePath("/");
  return { data, error };
};

export const getContent = async (portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contents")
    .select("*")
    .eq("portfolio_id", portfolioId);

  return { data, error };
};

export const updateContent = async (
  content: z.infer<typeof contentSchema>,
  portfolioId: number
) => {
  const supabase = await createClient();

  if (content.favicon && content.favicon.length > 0) {
    const { error: uploadError } = await supabase.storage
      .from("contents")
      .upload(content.favicon[0], content.favicon[0]!, {
        upsert: true,
      });

    if (uploadError) {
      console.error("Favicon upload error:", uploadError);
      return {
        data: null,
        error: {
          ...uploadError,
          message: `Storage upload failed: ${uploadError.message}`,
        },
      };
    }

    const { data: faviconData } = supabase.storage
      .from("contents")
      .getPublicUrl(content.favicon[0]);

    content.favicon[0] = faviconData.publicUrl;

    const { data, error: updateError } = await supabase
      .from("contents")
      .update({
        hero_header: content.hero_header,
        hero_description: content.hero_description,
        about_text: content.about_text,
        meta_title: content.meta_title,
        meta_description: content.meta_description,
        favicon: content.favicon,
      })
      .eq("portfolio_id", portfolioId)
      .select();

    revalidatePath("/");
    return { data, error: updateError };
  }

  const { data, error } = await supabase
    .from("contents")
    .update(content)
    .eq("portfolio_id", portfolioId)
    .select();

  revalidatePath("/");
  return { data, error };
};
