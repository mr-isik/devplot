import type { ThemeOptions } from "../types/theme-options";
import type { ThemeProps, ThemeVariant } from "../types";
import {
  getThemeById,
  DEFAULT_THEME_ID,
  getDefaultTheme,
} from "../registry/themeRegistry";
import { defaultThemeOptions } from "../types/theme-options";

/**
 * Resolves the theme component based on the theme id
 * @param themeId - The theme id to resolve
 * @returns The theme component
 */
export function resolveThemeComponent(themeId: ThemeVariant) {
  const theme = getThemeById(themeId);

  if (!theme) {
    const defaultTheme = getDefaultTheme();
    return defaultTheme?.component;
  }

  return theme.component;
}

/**
 * Creates theme options based on the provided theme id and options
 * @param themeId - The theme id
 * @param options - Additional theme options to merge
 * @returns The merged theme options
 */
export function createThemeOptions(
  themeId: ThemeVariant,
  options?: Partial<ThemeOptions>
): ThemeOptions {
  return {
    ...defaultThemeOptions,
    theme: themeId,
    themeName: themeId,
    ...options,
  };
}

/**
 * Extracts theme options from portfolio data
 * @param portfolio - The portfolio object that may contain theme options
 * @returns Extracted theme options or undefined if none found
 */
export function extractThemeOptionsFromPortfolio(
  portfolio: any
): Partial<ThemeOptions> | undefined {
  try {
    if (
      portfolio.options &&
      Array.isArray(portfolio.options) &&
      portfolio.options.length > 0 &&
      portfolio.options[0].options
    ) {
      if (typeof portfolio.options[0].options === "string") {
        return JSON.parse(
          portfolio.options[0].options
        ) as Partial<ThemeOptions>;
      } else if (
        typeof portfolio.options[0].options === "object" &&
        portfolio.options[0].options !== null
      ) {
        return portfolio.options[0].options as Partial<ThemeOptions>;
      }
    }
  } catch (error) {
    console.error("Error extracting theme options from portfolio:", error);
  }

  return undefined;
}
