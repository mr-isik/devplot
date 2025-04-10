import type { ThemeProps, ThemeVariant } from "../types";
import MinimalTheme from "../components/MinimalTheme";
import ModernTheme from "../components/ModernTheme";
import CreativeTheme from "../components/CreativeTheme";

export type ThemeDefinition = {
  id: ThemeVariant;
  name: string;
  description: string;
  component: React.ComponentType<ThemeProps>;
};

export const DEFAULT_THEME_ID = "minimal" as const;

const THEMES: Record<ThemeVariant, ThemeDefinition> = {
  minimal: {
    id: "minimal",
    name: "Minimal",
    description: "Clean and minimalist design with focus on content",
    component: MinimalTheme,
  },
  modern: {
    id: "modern",
    name: "Modern",
    description: "Modern and sleek design with focus on content",
    component: ModernTheme,
  },
  creative: {
    id: "creative",
    name: "Creative",
    description: "Creative and unique design with focus on content",
    component: CreativeTheme,
  },
};

// Functions for theme selection
export function getThemeById(id: ThemeVariant): ThemeDefinition | undefined {
  return THEMES[id];
}

// Function to get all available themes
export function getAllThemes(): ThemeDefinition[] {
  return Object.values(THEMES);
}

export default THEMES;
