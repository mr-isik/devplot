import type { Portfolio } from "@/features/portfolios/types";
import {
  getFullPortfolio,
  getPortfolioMetadataWithId,
} from "@/actions/portfolios/actions";

/**
 * Fetches a portfolio by username
 * @param username - The username to fetch portfolio for
 * @returns An object containing portfolio data or error
 */
export async function fetchPortfolioById(id: number): Promise<{
  portfolio?: Portfolio;
  error?: string;
}> {
  try {
    const { data, error } = await getFullPortfolio(id);

    if (error || !data || data.length === 0) {
      return { error: error?.message || "Portfolio not found" };
    }

    const portfolioSkills = data[0].portfolio_skills;

    const formattedSkills = portfolioSkills.map((skill: any) => ({
      ...skill.details,
    }));

    // Create an enhanced portfolio object with all necessary fields
    const enhancedPortfolio: Portfolio = {
      // Core portfolio data
      id: data[0].id,
      user_id: data[0].user_id,
      created_at: data[0].created_at,

      // Content data
      contents: data[0].contents,
      is_published: true,

      // Include related data
      experiences: data[0].experiences || [],
      projects: data[0].projects || [],
      socials: data[0].socials || [],
      options: data[0].options || [],
      educations: data[0].educations || [],
      skills: formattedSkills || [],
    };

    return { portfolio: enhancedPortfolio };
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return { error: "Failed to fetch portfolio data" };
  }
}

/**
 * Fetches portfolio metadata for generating page metadata
 * @param username - The username to fetch metadata for
 * @returns An object containing metadata or error
 */
export async function fetchPortfolioMetadata(id: number): Promise<{
  metadata?: {
    title: string;
    description: string;
  };
  error?: string;
}> {
  try {
    const { data, error } = await getPortfolioMetadataWithId(id);

    if (error || !data || data.length === 0) {
      return { error: "Portfolio metadata not found" };
    }

    // The contents property in the response may contain metadata information
    const portfolioData = data[0];
    const contents = portfolioData.contents as {
      meta_title?: string;
      meta_description?: string;
    };

    return {
      metadata: {
        title: contents.meta_title || "Portfolio",
        description: contents.meta_description || "Professional portfolio",
      },
    };
  } catch (error) {
    console.error("Error fetching portfolio metadata:", error);
    return { error: "Failed to fetch portfolio metadata" };
  }
}
