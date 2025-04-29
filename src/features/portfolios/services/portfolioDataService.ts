import type { Portfolio } from "@/features/portfolios/types";
import {
  getFullPortfolio,
  getPortfolioMetadataWithId,
} from "@/actions/portfolios/actions";

/**
 * Fetches a portfolio by tenantId
 * @param tenantId - The tenantId to fetch portfolio for
 * @returns An object containing portfolio data or error
 */
export async function fetchPortfolioWithTenantId(tenantId: number): Promise<{
  portfolio?: Portfolio;
  error?: string;
}> {
  try {
    const { data, error } = await getFullPortfolio(tenantId);

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
      tenant_id: data[0].tenant_id,
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
 * @param tenantId - The tenantId to fetch metadata for
 * @returns An object containing metadata or error
 */
export async function fetchPortfolioMetadataWithTenantId(
  tenantId: number
): Promise<{
  metadata?: {
    title: string;
    description: string;
    favicon: string;
  };
  error?: string;
}> {
  try {
    const { data, error } = await getPortfolioMetadataWithId(tenantId);

    if (error || !data || data.length === 0) {
      return { error: "Portfolio metadata not found" };
    }

    const portfolioData = data[0];
    const contents = portfolioData.contents as {
      meta_title?: string;
      meta_description?: string;
      favicon?: string;
    };

    return {
      metadata: {
        title: contents.meta_title || "Portfolio",
        description: contents.meta_description || "Professional portfolio",
        favicon: contents.favicon || "",
      },
    };
  } catch (error) {
    console.error("Error fetching portfolio metadata:", error);
    return { error: "Failed to fetch portfolio metadata" };
  }
}
