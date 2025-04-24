import { PortfolioFormValues } from "@/lib/validations/portfolio";
import { UseFormReturn } from "react-hook-form";
import { Education } from "@/features/educations/types";
import { Experience } from "@/features/experiences/types";
import { Project } from "@/features/projects/types";
import { Skill } from "@/features/skills/types";
import { Social } from "@/features/socials/types";
import { ThemeOptions } from "@/features/themes/types/theme-options";
import { Portfolio, Content, Option } from "@/features/portfolios/types";

/**
 * Hook to get formatted portfolio data from form values
 * Used for theme preview functionality
 */
export function usePortfolioData(form: UseFormReturn<PortfolioFormValues>) {
  const formValues = form.getValues();

  // Get theme options
  const themeOptions = formValues.options || {
    theme: "minimal",
    colorTheme: "light",
    colors: ["#FFFFFF", "#F5F5F5", "#E5E5E5", "#000000", "#3B82F6"],
    font: "inter",
  };

  // Format portfolio data for preview
  const portfolioContent: Content = {
    id: 1,
    portfolio_id: 1,
    hero_header: formValues.content?.hero_header || "Portfolio Title",
    hero_description:
      formValues.content?.hero_description || "Frontend Developer",
    about_text: formValues.content?.about_text || "",
    meta_title: formValues.content?.meta_title || "My Portfolio",
    meta_description: formValues.content?.meta_description || "",
  };

  const portfolioOption: Option = {
    id: 1,
    portfolio_id: 1,
    options: JSON.stringify(themeOptions),
  };

  // Format portfolio data for preview
  const portfolio: Portfolio = {
    id: 1,
    user_id: "preview-user",
    created_at: new Date().toISOString(),
    is_published: formValues.portfolio?.is_published || false,
    contents: portfolioContent,
    options: [portfolioOption],
    experiences: [],
    projects: [],
    socials: [],
    skills: [],
    educations: [],
  };

  // Format experiences data
  const experiences: Experience[] = (formValues.experiences || []).map(
    (exp, index) => ({
      id: index + 1,
      portfolio_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      company: exp.company || "",
      role: exp.role || "",
      description: exp.description || "",
      logo: typeof exp.logo === "string" ? exp.logo : "",
      employment_type: exp.employment_type || "Full-time",
      start_date:
        typeof exp.start_date === "string"
          ? exp.start_date
          : new Date().toISOString(),
      end_date: exp.end_date
        ? typeof exp.end_date === "string"
          ? exp.end_date
          : new Date().toISOString()
        : null,
    })
  );

  // Format projects data
  const projects: Project[] = (formValues.projects || []).map(
    (proj, index) => ({
      id: index + 1,
      portfolio_id: 1,
      created_at: new Date().toISOString(),
      title: proj.title || "",
      description: proj.description || "",
      image: typeof proj.image === "string" ? proj.image : "",
      repo_url: proj.repo_url || null,
      live_url: proj.live_url || null,
    })
  );

  // Format socials data
  const socials: Social[] = (formValues.socials || []).map((social, index) => ({
    id: index + 1,
    portfolio_id: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    platform: social.platform || "github",
    url: social.url || "",
  }));

  // Format skills data
  const skills: Skill[] = (formValues.skills || []).map((skill, index) => ({
    id: index + 1,
    portfolio_id: 1,
    created_at: new Date().toISOString(),
    name: skill.name || "",
    category: "other",
    icon_name: "code",
    color: "#718096",
  }));

  // Format educations data
  const educations: Education[] = (formValues.educations || []).map(
    (edu, index) => ({
      id: index + 1,
      portfolio_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      school: edu.school || "",
      degree: edu.degree || "",
      field: edu.field || "",
      start_date:
        typeof edu.start_date === "string"
          ? edu.start_date
          : new Date().toISOString(),
      end_date: edu.end_date
        ? typeof edu.end_date === "string"
          ? edu.end_date
          : new Date().toISOString()
        : null,
    })
  );

  return {
    portfolio,
    experiences,
    projects,
    socials,
    skills,
    educations,
  };
}
