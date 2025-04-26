"use client";

import { z } from "zod";

// Schema for main portfolio information
export const portfolioSchema = z.object({
  is_published: z.boolean().default(false),
  subdomain: z.string().nullable(),
  custom_domain: z.string().nullable(),
});

// Schema for theme and appearance settings
export const optionsSchema = z.object({
  theme: z.string().default("minimal"),
  colorTheme: z.string().default("light"),
  colors: z
    .array(z.string())
    .default(["#FFFFFF", "#F5F5F5", "#E5E5E5", "#000000", "#3B82F6"]),
  font: z.string().default("inter"),
});

export const contentSchema = z.object({
  hero_header: z
    .string()
    .min(3, { message: "Header title must be at least 3 characters" }),
  hero_description: z
    .string()
    .min(10, { message: "Header description must be at least 10 characters" }),
  meta_title: z
    .string()
    .min(5, { message: "Page title must be at least 5 characters" }),
  meta_description: z
    .string()
    .min(10, { message: "Page description must be at least 10 characters" }),
  about_text: z
    .string()
    .min(20, { message: "About text must be at least 20 characters" }),
});

// Schema for experience information
export const experienceSchema = z.object({
  item_id: z.number().optional(),
  role: z.string().min(3, { message: "Role must be at least 3 characters" }),
  company: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters" }),
  start_date: z.string().min(3, { message: "Start date is required" }),
  employment_type: z.string().optional(),
  end_date: z.string().optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  logo: z
    .array(
      z
        .any()
        .refine(
          (file) =>
            file instanceof File ||
            (typeof file === "object" && file !== null && "size" in file),
          { message: "Expected a valid file" }
        )
        .refine(
          (file) => {
            const fileSize =
              file instanceof File ? file.size : (file as any).size;
            return fileSize <= 1024 * 1024;
          },
          { message: "Logo must be less than 1MB" }
        )
    )
    .nullable(),
});

// Schema for multiple experiences
export const experiencesSchema = z
  .array(experienceSchema)
  .optional()
  .default([]);

// Schema for education information
export const educationSchema = z.object({
  item_id: z.number().optional(),
  school: z
    .string()
    .min(2, { message: "School name must be at least 2 characters" }),
  degree: z
    .string()
    .min(2, { message: "Degree must be at least 2 characters" }),
  field: z
    .string()
    .min(2, { message: "Field of study must be at least 2 characters" }),
  start_date: z.string().min(3, { message: "Start date is required" }),
  end_date: z.string().optional(),
});

// Schema for multiple educations
export const educationsSchema = z.array(educationSchema).optional().default([]);

// Schema for project information
export const projectSchema = z.object({
  item_id: z.number().optional(),
  title: z
    .string()
    .min(3, { message: "Project title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Project description must be at least 10 characters" }),
  repo_url: z
    .string()
    .url({ message: "Enter a valid repository URL" })
    .optional()
    .or(z.literal("")),
  live_url: z
    .string()
    .url({ message: "Enter a valid live site URL" })
    .optional()
    .or(z.literal("")),
  image: z
    .array(
      z
        .any()
        .refine(
          (file) =>
            file instanceof File ||
            (typeof file === "object" && file !== null && "size" in file),
          { message: "Expected a valid file" }
        )
        .refine(
          (file) => {
            const fileSize =
              file instanceof File ? file.size : (file as any).size;
            return fileSize <= 1024 * 1024 * 4;
          },
          { message: "Image must be less than 4MB" }
        )
    )
    .nullable(),
});

// Schema for multiple projects
export const projectsSchema = z.array(projectSchema).optional().default([]);

// Schema for social media information
export const socialSchema = z.object({
  item_id: z.number().optional(),
  platform: z
    .string()
    .min(2, { message: "Platform name must be at least 2 characters" }),
  url: z.string().url({ message: "Enter a valid URL" }),
});

// Schema for multiple social media accounts
export const socialsSchema = z.array(socialSchema).optional().default([]);

// Schema for skill information
export const skillSchema = z.object({
  item_id: z.number().optional(),
  name: z
    .string()
    .min(1, { message: "Skill name must be at least 1 character" }),
  portfolio_id: z.string().optional(),
  portfolio_skill_id: z.number().optional(),
});

// Schema for multiple skills
export const skillsSchema = z.array(skillSchema).optional().default([]);

export const portfolioFormSchema = z.object({
  portfolio: portfolioSchema,
  options: optionsSchema,
  content: contentSchema,
  experiences: experiencesSchema,
  educations: educationsSchema,
  projects: projectsSchema,
  skills: skillsSchema,
  socials: socialsSchema,
});

// Type for form values
export type PortfolioFormValues = z.infer<typeof portfolioFormSchema>;
