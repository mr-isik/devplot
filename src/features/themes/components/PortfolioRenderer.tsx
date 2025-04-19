"use client";

import type { Portfolio } from "@/features/portfolios/types";
import type { ThemeProps, ThemeVariant } from "@/features/themes/types";
import { ThemeStyleProvider } from "@/features/themes/components/ThemeStyleProvider";
import { ThemeProvider } from "@/features/themes/context/ThemeContext";
import { useMemo } from "react";
import {
  createThemeOptions,
  extractThemeOptionsFromPortfolio,
  resolveThemeComponent,
  DEFAULT_THEME_ID,
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
  themeId = DEFAULT_THEME_ID,
}: PortfolioRendererProps) {
  // Extract theme options from portfolio
  const portfolioThemeOptions = useMemo(
    () => extractThemeOptionsFromPortfolio(portfolio),
    [portfolio]
  );

  // Resolve the effective theme ID by checking the portfolio options first,
  // then the provided themeId prop, then the default theme ID
  const effectiveThemeId =
    (portfolioThemeOptions?.theme as ThemeVariant) || themeId;

  // Create theme options and resolve the theme component
  const themeOptions = createThemeOptions(
    effectiveThemeId,
    portfolioThemeOptions
  );
  const ThemeComponent = resolveThemeComponent(effectiveThemeId);

  // Prepare theme props from portfolio data
  const themeProps: ThemeProps = {
    portfolio,
    experiences: portfolio.experiences || [],
    projects: portfolio.projects || [],
    socials: portfolio.socials || [],
    skills: portfolio.skills || [],
    educations: portfolio.educations || [],
  };

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
