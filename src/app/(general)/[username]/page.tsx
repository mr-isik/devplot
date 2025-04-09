import type { Portfolio } from "@/features/portfolios/types";
import type { ThemeProps, ThemeVariant } from "@/features/themes/types";
import type { ThemeOptions } from "@/features/themes/types/theme-options";
import type { Metadata } from "next";
import { getFullPortfolio } from "@/actions/portfolios/actions";
import MinimalTheme from "@/features/themes/components/MinimalTheme";
import { ThemeStyleProvider } from "@/features/themes/components/ThemeStyleProvider";
import { ThemeProvider } from "@/features/themes/context/ThemeContext";
import { defaultThemeOptions } from "@/features/themes/types/theme-options";
import { notFound } from "next/navigation";

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: { username: string; locale: string };
}): Promise<Metadata> {
  try {
    const { data: portfolioData, error: fetchError } = await getFullPortfolio(
      params.username
    );

    if (fetchError || !portfolioData || portfolioData.length === 0) {
      return {
        title: "Portfolio Not Found",
        description: "The requested portfolio could not be found.",
      };
    }

    const portfolio = portfolioData[0];

    // Get metadata from portfolio
    return {
      title: portfolio.contents.meta_title || "Portfolio",
      description:
        portfolio.contents.meta_description || "Professional portfolio",
      openGraph: {
        title: portfolio.contents.meta_title || "Portfolio",
        description:
          portfolio.contents.meta_description || "Professional portfolio",
        type: "website",
      },
    };
  } catch {
    return {
      title: "Portfolio Not Found",
      description: "The requested portfolio could not be found.",
    };
  }
}

function PortfolioLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="animate-pulse space-y-4 text-center">
        <div className="mx-auto size-32 rounded-full bg-gray-200" />
        <div className="mx-auto h-8 w-64 rounded bg-gray-200" />
        <div className="mx-auto h-4 w-96 rounded bg-gray-200" />
      </div>
    </div>
  );
}

// The portfolio page component
const PortfolioPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  // Fetch portfolio data
  const { data: portfolioData, error: fetchError } =
    await getFullPortfolio(username);

  // Handle errors or missing data
  if (fetchError || !portfolioData || portfolioData.length === 0) {
    return notFound();
  }

  const portfolioRaw = portfolioData[0];

  // Always use minimal theme for now
  const template = "minimal";

  // Parse theme options from options table or use defaults
  const themeOptions: ThemeOptions = {
    ...defaultThemeOptions,
    themeName: template as ThemeVariant,
  };

  // Create an enhanced portfolio object with all necessary fields for theme rendering
  const enhancedPortfolio: Portfolio = {
    // Core portfolio data
    id: portfolioRaw.id,
    user_id: portfolioRaw.user_id,
    created_at: portfolioRaw.created_at,

    // Content data (already part of portfolio in this structure)
    contents: portfolioRaw.contents,
    is_published: true,

    // Include related data that may be nested in portfolioRaw
    experiences: portfolioRaw.experiences,
    projects: portfolioRaw.projects,
    socials: portfolioRaw.socials,
    options: portfolioRaw.options,
    educations: portfolioRaw.educations,
    skills: portfolioRaw.skills,
  };

  const themeProps: ThemeProps = {
    portfolio: enhancedPortfolio,
    experiences: portfolioRaw.experiences || [],
    projects: portfolioRaw.projects || [],
    socials: portfolioRaw.socials || [],
    skills: portfolioRaw.skills || [],
    educations: portfolioRaw.educations || [],
  };

  return (
    <ThemeProvider initialOptions={themeOptions}>
      <ThemeStyleProvider>
        <MinimalTheme {...themeProps} />
      </ThemeStyleProvider>
    </ThemeProvider>
  );
};

export default PortfolioPage;
