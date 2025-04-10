import type { Theme, ThemeVariant } from "@/features/themes/types";
import MinimalTheme from "@/features/themes/components/MinimalTheme";
import ModernTheme from "@/features/themes/components/ModernTheme";
import CreativeTheme from "@/features/themes/components/CreativeTheme";

export const DEFAULT_THEME_ID: ThemeVariant = "minimal";

interface ThemeRegistration {
  id: ThemeVariant;
  name: string;
  description: string;
  thumbnail: string;
  component: React.ComponentType<any>;
}

/**
 * ThemeRegistry class - uses adapter pattern to provide a clean interface for theme registration
 * and management. This makes it easy to add, remove, or modify themes.
 */
class ThemeRegistry {
  private themes: Map<ThemeVariant, Theme>;
  private defaultThemeId: ThemeVariant;

  constructor(defaultThemeId: ThemeVariant = DEFAULT_THEME_ID) {
    this.themes = new Map();
    this.defaultThemeId = defaultThemeId;
    this.initializeThemes();
  }

  /**
   * Initialize the registry with built-in themes
   */
  private initializeThemes(): void {
    // Register built-in themes
    this.register({
      id: "minimal",
      name: "Minimal",
      description: "Clean and minimalist design with focus on content",
      thumbnail: "/themes/minimal-theme-thumbnail.jpg",
      component: MinimalTheme,
    });

    this.register({
      id: "modern",
      name: "Modern",
      description: "Modern and sleek design with focus on content",
      thumbnail: "/themes/modern-theme-thumbnail.jpg",
      component: ModernTheme,
    });

    this.register({
      id: "creative",
      name: "Creative",
      description: "Creative and unique design with focus on content",
      thumbnail: "/themes/creative-theme-thumbnail.jpg",
      component: CreativeTheme,
    });
  }

  /**
   * Register a new theme
   * @param theme - The theme to register
   */
  register(theme: ThemeRegistration): void {
    this.themes.set(theme.id, theme as Theme);
  }

  /**
   * Find a theme by ID
   * @param id - The theme ID
   * @returns The theme or undefined if not found
   */
  getTheme(id: ThemeVariant): Theme | undefined {
    return this.themes.get(id);
  }

  /**
   * Get all registered themes
   * @returns Array of all themes
   */
  getAllThemes(): Theme[] {
    return Array.from(this.themes.values());
  }

  /**
   * Get the default theme
   * @returns The default theme
   */
  getDefaultTheme(): Theme {
    const defaultTheme = this.themes.get(this.defaultThemeId);

    if (!defaultTheme) {
      // Fallback to the first available theme if default is not found
      const firstTheme = this.getAllThemes()[0];

      if (!firstTheme) {
        throw new Error("No themes are registered");
      }

      return firstTheme;
    }

    return defaultTheme;
  }
}

// Create and export a singleton instance of the theme registry
export const themeRegistry = new ThemeRegistry();

// Convenience functions that use the registry
export function getThemeById(themeId: ThemeVariant): Theme | undefined {
  return themeRegistry.getTheme(themeId);
}

export function getAllThemes(): Theme[] {
  return themeRegistry.getAllThemes();
}

export function getDefaultTheme(): Theme {
  return themeRegistry.getDefaultTheme();
}
