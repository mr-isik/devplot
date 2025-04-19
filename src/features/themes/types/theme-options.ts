/**
 * Theme options interface for portfolio customization
 */
export interface ThemeOptions {
  /**
   * The selected theme template
   * Can be "minimal", "modern", etc.
   */
  theme: string;

  /**
   * The selected color theme
   * Can be "light", "dark", "blue", "green", "purple", "orange", or "custom"
   */
  colorTheme?: string;

  /**
   * The selected font family
   * Can be "inter", "roboto", "poppins", "montserrat", "lato", "playfair", "raleway", "oswald", "merriweather"
   */
  font: string;

  /**
   * Custom colors array for "custom" theme
   * [0]: Background color
   * [1]: Secondary background color
   * [2]: Border color
   * [3]: Text color
   * [4]: Accent color
   */
  colors?: string[];

  /**
   * Any additional theme-specific options
   */
  [key: string]: any;
}

/**
 * Available color themes
 */
export type ColorTheme =
  | "light"
  | "dark"
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "custom";

/**
 * Available font families
 */
export type FontFamily =
  | "inter"
  | "roboto"
  | "poppins"
  | "montserrat"
  | "lato"
  | "playfair"
  | "raleway"
  | "oswald"
  | "merriweather";

export type ColorPalette = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  muted: string;
  border: string;
  card: string;
};

export type FontOptions = {
  heading: string;
  body: string;
};

export const defaultThemeOptions: ThemeOptions = {
  theme: "minimal",
  colorTheme: "light",
  font: "inter",
  colors: ["#FFFFFF", "#F5F5F5", "#E5E5E5", "#000000", "#3B82F6"],
  themeName: "minimal",
  colorPalette: {
    primary: "#2563eb",
    secondary: "#60a5fa",
    background: "#fafafa",
    text: "#171717",
    accent: "#3b82f6",
    muted: "#a3a3a3",
    border: "#e5e5e5",
    card: "#ffffff",
  },
  fonts: {
    heading: "Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
  },
};
