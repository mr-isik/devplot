import type { Theme, ThemeVariant } from "@/features/themes/types";
import MinimalTheme from "@/features/themes/components/MinimalTheme";
import dynamic from "next/dynamic";

const minimalTheme: Theme = {
  id: "minimal",
  name: "Minimal",
  description: "Highlight your content with a clean and minimal design.",
  thumbnail: "/themes/minimal-theme-thumbnail.jpg",
  component: MinimalTheme,
};

const themeRegistry: Theme[] = [minimalTheme];

// Function to find a theme by its id
export const getThemeById = (themeId: ThemeVariant): Theme | undefined => {
  return themeRegistry.find((theme) => theme.id === themeId);
};

// Function to return all themes
export const getAllThemes = (): Theme[] => {
  return themeRegistry;
};

// Default theme id
export const DEFAULT_THEME_ID: ThemeVariant = "minimal";

// Function to return the default theme (always returns MinimalTheme)
export const getDefaultTheme = (): Theme => {
  // Return the minimal theme if the default theme is not found
  const theme = getThemeById(DEFAULT_THEME_ID);
  return theme ?? minimalTheme;
};
