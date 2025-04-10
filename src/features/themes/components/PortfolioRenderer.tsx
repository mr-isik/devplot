"use client";

import type { Portfolio } from "@/features/portfolios/types";
import type { ThemeProps, ThemeVariant } from "@/features/themes/types";
import type { ThemeOptions } from "@/features/themes/types/theme-options";
import { ThemeStyleProvider } from "@/features/themes/components/ThemeStyleProvider";
import { ThemeProvider } from "@/features/themes/context/ThemeContext";
import { useMemo } from "react";
import {
  createThemeOptions,
  extractThemeOptionsFromPortfolio,
  resolveThemeComponent,
} from "../services/themeService";

interface PortfolioRendererProps {
  portfolio: Portfolio;
  themeId?: ThemeVariant;
}

/**
 * PortfolioRenderer component handles the rendering of a portfolio with
 * the appropriate theme component based on the theme ID or portfolio settings.
 * It follows the Single Responsibility Principle by focusing solely on rendering.
 */
export function PortfolioRenderer({
  portfolio,
  themeId = "minimal",
}: PortfolioRendererProps) {
  // Extract theme options from portfolio
  const portfolioThemeOptions = useMemo(
    () => extractThemeOptionsFromPortfolio(portfolio),
    [portfolio]
  );

  // Create merged theme options using default, specified theme, and portfolio options
  const themeOptions = useMemo(() => {
    const effectiveThemeId =
      (portfolioThemeOptions?.theme as ThemeVariant) || themeId;
    return createThemeOptions(effectiveThemeId, portfolioThemeOptions);
  }, [portfolioThemeOptions, themeId]);

  // Resolve the theme component based on the theme ID
  const ThemeComponent = useMemo(() => {
    const effectiveThemeId =
      (portfolioThemeOptions?.theme as ThemeVariant) || themeId;
    return resolveThemeComponent(effectiveThemeId);
  }, [portfolioThemeOptions, themeId]);

  // Prepare theme props from portfolio data
  const themeProps: ThemeProps = useMemo(
    () => ({
      portfolio,
      experiences: portfolio.experiences || [],
      projects: portfolio.projects || [],
      socials: portfolio.socials || [],
      skills: portfolio.skills || [],
      educations: portfolio.educations || [],
    }),
    [portfolio]
  );

  // If theme component not found, show an error
  if (!ThemeComponent) {
    return <div className="p-4 text-center text-red-500">Theme not found</div>;
  }

  return (
    <ThemeProvider initialOptions={themeOptions}>
      <ThemeStyleProvider>
        <ThemeComponent {...themeProps} />
      </ThemeStyleProvider>
    </ThemeProvider>
  );
}

export default PortfolioRenderer;
