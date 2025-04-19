import type { Theme, ThemeVariant } from "@/features/themes/types";
import MinimalTheme from "@/features/themes/components/MinimalTheme";
import ModernTheme from "@/features/themes/components/ModernTheme";
import CreativeTheme from "@/features/themes/components/CreativeTheme";
import FuturisticTheme from "@/features/themes/components/FuturisticTheme";
import ElegantTheme from "@/features/themes/components/ElegantTheme";
import DynamicTheme from "@/features/themes/components/DynamicTheme";

// The default theme ID constant
export const DEFAULT_THEME_ID: ThemeVariant = "minimal";

// Records of all available themes
const THEMES: Record<ThemeVariant, Theme> = {
  minimal: {
    id: "minimal",
    name: "Minimal",
    description: "Clean and minimalist design with focus on content",
    thumbnail: "/themes/minimal-theme-thumbnail.jpg",
    component: MinimalTheme,
  },
  modern: {
    id: "modern",
    name: "Modern",
    description: "Modern and sleek design with focus on content",
    thumbnail: "/themes/modern-theme-thumbnail.jpg",
    component: ModernTheme,
  },
  creative: {
    id: "creative",
    name: "Creative",
    description: "Creative and unique design with focus on content",
    thumbnail: "/themes/creative-theme-thumbnail.jpg",
    component: CreativeTheme,
  },
  futuristic: {
    id: "futuristic",
    name: "Futuristic",
    description:
      "Ultra modern design with neon accents and glass morphism effects",
    thumbnail: "/themes/futuristic-theme-thumbnail.jpg",
    component: FuturisticTheme,
    isPremium: true,
  },
  elegant: {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated and luxurious theme with premium aesthetics",
    thumbnail: "/themes/elegant-theme-thumbnail.jpg",
    component: ElegantTheme,
    isPremium: true,
  },
  dynamic: {
    id: "dynamic",
    name: "Dynamic",
    description: "Vibrant and interactive theme with animated elements",
    thumbnail: "/themes/dynamic-theme-thumbnail.jpg",
    component: DynamicTheme,
    isPremium: true,
  },
};

// Functions for theme selection
export function getThemeById(id: ThemeVariant): Theme | undefined {
  return THEMES[id];
}

// Function to get all available themes
export function getAllThemes(): Theme[] {
  return Object.values(THEMES);
}

// Function to get the default theme
export function getDefaultTheme(): Theme {
  const defaultTheme = THEMES[DEFAULT_THEME_ID];

  if (!defaultTheme) {
    // Fallback to the first available theme if default is not found
    const firstTheme = getAllThemes()[0];

    if (!firstTheme) {
      throw new Error("No themes are registered");
    }

    return firstTheme;
  }

  return defaultTheme;
}

// Export themes object for direct access
export default THEMES;
