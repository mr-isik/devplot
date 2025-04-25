"use server";

import type { Project } from "@/features/projects/types";
import type { projectSchema } from "@/lib/validations/portfolio";
import type * as z from "zod";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const createProject = async (
  project: z.infer<typeof projectSchema>,
  portfolioId: number
) => {
  const supabase = await createClient();

  if (project.image && project.image.length > 0) {
    try {
      const image_url = `projects/${Date.now()}`;

      if (!project.image[0]) {
        return {
          data: null,
          error: new Error("Project image file is undefined or empty"),
        };
      }

      const fileSize = project.image[0].size;
      const fileType = project.image[0].type;

      if (fileSize > 1024 * 1024 * 4) {
        return {
          data: null,
          error: new Error(
            `Project image size (${Math.round(fileSize / 1024)}KB) exceeds the 4MB limit`
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

      const { error: uploadError } = await supabase.storage
        .from("projects")
        .upload(image_url, project.image[0]!);

      if (uploadError) {
        console.error("Project image upload error:", uploadError);
        return {
          data: null,
          error: {
            ...uploadError,
            message: `Storage upload failed: ${uploadError.message}`,
            details: { fileSize, fileType, project: project.title },
          },
        };
      }

      const { data: imageData } = supabase.storage
        .from("projects")
        .getPublicUrl(image_url);

      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert({
          title: project.title,
          description: project.description,
          repo_url: project.repo_url,
          live_url: project.live_url,
          image: imageData.publicUrl,
          portfolio_id: portfolioId,
        })
        .select();

      if (projectError) {
        console.error(
          "DB insert error after successful project image upload:",
          projectError
        );
        return {
          data: projectData,
          error: {
            ...projectError,
            message: `Database insert failed after file upload: ${projectError.message}`,
          },
        };
      }

      return { data: projectData, error: projectError };
    } catch (error) {
      console.error("Unexpected error in createProject:", error);
      return {
        data: null,
        error:
          error instanceof Error
            ? error
            : new Error("Unknown error in project creation"),
      };
    }
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .insert({
        title: project.title,
        description: project.description,
        repo_url: project.repo_url,
        live_url: project.live_url,
        portfolio_id: portfolioId,
      })
      .select();

    revalidatePath("/");
    return { data, error };
  } catch (error) {
    console.error("Error inserting project (no image):", error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error
          : new Error("Unknown error inserting project"),
    };
  }
};

export const getProjects = async (portfolioId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("portfolio_id", portfolioId);

  return { data, error };
};

export const updateProject = async (project: z.infer<typeof projectSchema>) => {
  if (!project.item_id) {
    return {
      data: null,
      error: new Error("Project ID is required for update"),
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .update({
      title: project.title,
      description: project.description,
      repo_url: project.repo_url,
      live_url: project.live_url,
      image: project.image,
    })
    .eq("id", project.item_id)
    .select();

  revalidatePath("/");
  return { data, error };
};

export const deleteProject = async (id: number, image_path: string) => {
  const supabase = await createClient();

  const { data, error: projectError } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (projectError) {
    console.error("Error deleting project:", projectError);
    return {
      data: null,
      error: projectError,
    };
  }

  await supabase.storage.from("projects").remove([`${image_path}`]);

  revalidatePath("/");
  return { data, error: null };
};
