"use server";

import type { Experience } from "@/features/experiences/types";
import type { experienceSchema } from "@/lib/validations/portfolio";
import type * as z from "zod";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const getExperiences = async (
  portfolioId: string
): Promise<{ data: Experience[] | null; error: any }> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("portfolio_id", portfolioId);

  return { data, error };
};

export const createExperience = async (
  experience: z.infer<typeof experienceSchema>,
  portfolioId: string
) => {
  const supabase = await createClient();

  if (experience.logo && experience.logo.length > 0) {
    try {
      const logo_path = `experiences/${Date.now()}`;

      if (!experience.logo[0]) {
        return {
          data: null,
          error: new Error("Logo file is undefined or empty"),
        };
      }

      const fileSize = experience.logo[0].size;
      const fileType = experience.logo[0].type;

      if (fileSize > 1024 * 1024) {
        return {
          data: null,
          error: new Error(
            `Logo file size (${Math.round(fileSize / 1024)}KB) exceeds the 1MB limit`
          ),
        };
      }

      if (!fileType.startsWith("image/")) {
        return {
          data: null,
          error: new Error(
            `Invalid file type: ${fileType}. Only images are allowed.`
          ),
        };
      }

      const { error } = await supabase.storage
        .from("experiences")
        .upload(logo_path, experience.logo[0]!);

      if (error) {
        console.error("Storage upload error:", error);
        return {
          data: null,
          error: {
            ...error,
            message: `Storage upload failed: ${error.message}`,
            details: { fileSize, fileType },
          },
        };
      }

      const { data: logoData } = supabase.storage
        .from("experiences")
        .getPublicUrl(logo_path);

      const experienceToInsert = {
        role: experience.role,
        company: experience.company,
        start_date: experience.start_date,
        end_date: experience.end_date,
        description: experience.description,
        logo: logoData.publicUrl,
        portfolio_id: portfolioId,
        employment_type: experience.employment_type || undefined,
      };

      const { data: experienceData, error: experienceError } = await supabase
        .from("experiences")
        .insert(experienceToInsert)
        .select();

      if (experienceError) {
        console.error(
          "DB insert error after successful file upload:",
          experienceError
        );
        return {
          data: experienceData,
          error: {
            ...experienceError,
            message: `Database insert failed after file upload: ${experienceError.message}`,
          },
        };
      }

      return { data: experienceData, error: experienceError };
    } catch (error) {
      console.error("Unexpected error in createExperience:", error);
      return {
        data: null,
        error:
          error instanceof Error
            ? error
            : new Error("Unknown error in experience creation"),
      };
    }
  }

  try {
    const experienceToInsert = {
      ...experience,
      portfolio_id: portfolioId,
      employment_type: experience.employment_type || undefined,
    };

    const { data, error } = await supabase
      .from("experiences")
      .insert(experienceToInsert)
      .select();

    revalidatePath("/");
    return { data, error };
  } catch (error) {
    console.error("Error inserting experience (no logo):", error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error
          : new Error("Unknown error inserting experience"),
    };
  }
};

export const updateExperience = async (
  experience: z.infer<typeof experienceSchema>
) => {
  if (!experience.item_id) {
    return {
      data: null,
      error: new Error("Experience ID is required for update"),
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("experiences")
    .update({
      role: experience.role,
    })
    .eq("id", experience.item_id)
    .select();

  revalidatePath("/");
  return { data, error };
};

export const deleteExperience = async (item_id: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("experiences")
    .delete()
    .eq("id", item_id);

  revalidatePath("/");
  return { data, error };
};
