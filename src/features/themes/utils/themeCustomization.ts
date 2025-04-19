import { ThemeOptions } from "../types/theme-options";

// Define a color theme type
export interface ColorTheme {
  id: string;
  name: string;
  colors: string[];
  theme: {
    bg: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentLight: string;
    border: string;
    cardBg: string;
    sectionBg: string;
    gradient: string;
  };
}

// Color theme definitions - converted to array for better iteration
export const colorThemes: ColorTheme[] = [
  {
    id: "light",
    name: "Light Mode",
    colors: ["#ffffff", "#f8fafc", "#f1f5f9", "#0f172a", "#3b82f6"],
    theme: {
      bg: "#ffffff",
      textPrimary: "#0f172a",
      textSecondary: "#475569",
      accent: "#3b82f6",
      accentLight: "#60a5fa",
      border: "#e2e8f0",
      cardBg: "#ffffff",
      sectionBg: "#f8fafc",
      gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
    },
  },
  {
    id: "dark",
    name: "Dark Mode",
    colors: ["#0f172a", "#1e293b", "#334155", "#f8fafc", "#38bdf8"],
    theme: {
      bg: "#0f172a",
      textPrimary: "#f8fafc",
      textSecondary: "#94a3b8",
      accent: "#38bdf8",
      accentLight: "#7dd3fc",
      border: "#334155",
      cardBg: "#1e293b",
      sectionBg: "#172554",
      gradient: "linear-gradient(135deg, #38bdf8, #0369a1)",
    },
  },
  {
    id: "blue",
    name: "Ocean Blue",
    colors: ["#f0f9ff", "#e0f2fe", "#bae6fd", "#0c4a6e", "#0ea5e9"],
    theme: {
      bg: "#f0f9ff",
      textPrimary: "#0c4a6e",
      textSecondary: "#0369a1",
      accent: "#0ea5e9",
      accentLight: "#7dd3fc",
      border: "#bae6fd",
      cardBg: "#ffffff",
      sectionBg: "#e0f2fe",
      gradient: "linear-gradient(135deg, #0ea5e9, #0284c7)",
    },
  },
  {
    id: "green",
    name: "Forest Green",
    colors: ["#f0fdf4", "#dcfce7", "#bbf7d0", "#052e16", "#10b981"],
    theme: {
      bg: "#f0fdf4",
      textPrimary: "#052e16",
      textSecondary: "#14532d",
      accent: "#10b981",
      accentLight: "#34d399",
      border: "#bbf7d0",
      cardBg: "#ffffff",
      sectionBg: "#dcfce7",
      gradient: "linear-gradient(135deg, #10b981, #059669)",
    },
  },
  {
    id: "purple",
    name: "Royal Purple",
    colors: ["#faf5ff", "#f3e8ff", "#e9d5ff", "#3b0764", "#a855f7"],
    theme: {
      bg: "#faf5ff",
      textPrimary: "#3b0764",
      textSecondary: "#5b21b6",
      accent: "#a855f7",
      accentLight: "#c084fc",
      border: "#e9d5ff",
      cardBg: "#ffffff",
      sectionBg: "#f3e8ff",
      gradient: "linear-gradient(135deg, #a855f7, #8b5cf6)",
    },
  },
  {
    id: "orange",
    name: "Sunset Orange",
    colors: ["#fff7ed", "#ffedd5", "#fed7aa", "#7c2d12", "#f97316"],
    theme: {
      bg: "#fff7ed",
      textPrimary: "#7c2d12",
      textSecondary: "#9a3412",
      accent: "#f97316",
      accentLight: "#fb923c",
      border: "#fed7aa",
      cardBg: "#ffffff",
      sectionBg: "#ffedd5",
      gradient: "linear-gradient(135deg, #f97316, #ea580c)",
    },
  },
  {
    id: "red",
    name: "Ruby Red",
    colors: ["#fef2f2", "#fee2e2", "#fecaca", "#450a0a", "#ef4444"],
    theme: {
      bg: "#fef2f2",
      textPrimary: "#450a0a",
      textSecondary: "#991b1b",
      accent: "#ef4444",
      accentLight: "#f87171",
      border: "#fecaca",
      cardBg: "#ffffff",
      sectionBg: "#fee2e2",
      gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
    },
  },
  {
    id: "teal",
    name: "Tropical Teal",
    colors: ["#f0fdfa", "#ccfbf1", "#99f6e4", "#134e4a", "#14b8a6"],
    theme: {
      bg: "#f0fdfa",
      textPrimary: "#134e4a",
      textSecondary: "#115e59",
      accent: "#14b8a6",
      accentLight: "#2dd4bf",
      border: "#99f6e4",
      cardBg: "#ffffff",
      sectionBg: "#ccfbf1",
      gradient: "linear-gradient(135deg, #14b8a6, #0d9488)",
    },
  },
  {
    id: "custom",
    name: "Custom Colors",
    colors: ["#ffffff", "#f5f5f5", "#e5e5e5", "#000000", "#3b82f6"],
    theme: {
      bg: "#ffffff",
      textPrimary: "#000000",
      textSecondary: "#525252",
      accent: "#3b82f6",
      accentLight: "#60a5fa",
      border: "#e5e5e5",
      cardBg: "#ffffff",
      sectionBg: "#f5f5f5",
      gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
    },
  },
];

// Helper function to find a color theme by ID
export function getColorTheme(id: string): ColorTheme {
  return colorThemes.find((theme) => theme.id === id) || colorThemes[0];
}

export const fontFamilies = {
  inter: "'Inter', system-ui, sans-serif",
  roboto: "'Roboto', system-ui, sans-serif",
  poppins: "'Poppins', system-ui, sans-serif",
  montserrat: "'Montserrat', system-ui, sans-serif",
  lato: "'Lato', system-ui, sans-serif",
  playfair: "'Playfair Display', serif",
  raleway: "'Raleway', sans-serif",
  oswald: "'Oswald', sans-serif",
  merriweather: "'Merriweather', serif",
};

/**
 * Applies theme customization to CSS styles
 * @param baseStyles - The base CSS styles as a template string
 * @param options - The theme options from the user
 * @param themePrefix - The prefix used in CSS variables (e.g., 'minimal' for --minimal-bg)
 * @returns The customized CSS styles
 */
export function applyThemeCustomization(
  baseStyles: string,
  options: ThemeOptions,
  themePrefix: string
): string {
  let customizedStyles = baseStyles;

  const colorThemeId = options.colorTheme || "light";
  const colorTheme = getColorTheme(colorThemeId);

  let themeColors = { ...colorTheme.theme };

  if (
    options.colors &&
    Array.isArray(options.colors) &&
    options.colors.length >= 5 &&
    colorThemeId === "custom"
  ) {
    // Set custom colors
    themeColors = {
      bg: options.colors[0],
      textPrimary: options.colors[3],
      textSecondary: options.colors[3] + "99", // Add transparency
      accent: options.colors[4],
      accentLight: options.colors[4] + "99", // Add transparency
      border: options.colors[2],
      cardBg: options.colors[0],
      sectionBg: options.colors[1],
      gradient: `linear-gradient(135deg, ${options.colors[4]}, ${adjustColor(options.colors[4], -20)})`,
    };

    // Update color palette
    if (!options.colorPalette) {
      options.colorPalette = {
        primary: options.colors[4],
        secondary: options.colors[4] + "99", // With transparency
        background: options.colors[0],
        text: options.colors[3],
        accent: options.colors[4],
        muted: options.colors[3] + "88",
        border: options.colors[2],
        card: options.colors[0],
      };
    }
  }

  // Apply font family
  const fontFamily = options.font || "inter";
  const fontFamilyValue = fontFamilies[fontFamily as keyof typeof fontFamilies];

  // Replace CSS variables in the base styles
  customizedStyles = customizedStyles.replace(
    new RegExp(`--${themePrefix}-bg: .*?;`, "g"),
    `--${themePrefix}-bg: ${themeColors.bg};`
  );

  customizedStyles = customizedStyles.replace(
    new RegExp(`--${themePrefix}-text-primary: .*?;`, "g"),
    `--${themePrefix}-text-primary: ${themeColors.textPrimary};`
  );

  customizedStyles = customizedStyles.replace(
    new RegExp(`--${themePrefix}-text-secondary: .*?;`, "g"),
    `--${themePrefix}-text-secondary: ${themeColors.textSecondary};`
  );

  customizedStyles = customizedStyles.replace(
    new RegExp(`--${themePrefix}-accent: .*?;`, "g"),
    `--${themePrefix}-accent: ${themeColors.accent};`
  );

  customizedStyles = customizedStyles.replace(
    new RegExp(`--${themePrefix}-accent-light: .*?;`, "g"),
    `--${themePrefix}-accent-light: ${themeColors.accentLight};`
  );

  customizedStyles = customizedStyles.replace(
    new RegExp(`--${themePrefix}-border: .*?;`, "g"),
    `--${themePrefix}-border: ${themeColors.border};`
  );

  customizedStyles = customizedStyles.replace(
    new RegExp(`--${themePrefix}-card-bg: .*?;`, "g"),
    `--${themePrefix}-card-bg: ${themeColors.cardBg};`
  );

  customizedStyles = customizedStyles.replace(
    new RegExp(`--${themePrefix}-section-bg: .*?;`, "g"),
    `--${themePrefix}-section-bg: ${themeColors.sectionBg};`
  );

  customizedStyles = customizedStyles.replace(
    new RegExp(`--${themePrefix}-gradient: .*?;`, "g"),
    `--${themePrefix}-gradient: ${themeColors.gradient};`
  );

  // Apply font family
  customizedStyles = customizedStyles.replace(
    new RegExp(`font-family: .*?;`, "g"),
    `font-family: ${fontFamilyValue};`
  );

  // Add font imports if needed
  if (fontFamily !== "inter") {
    const fontImport = getFontImport(fontFamily);
    if (fontImport) {
      customizedStyles = fontImport + "\n" + customizedStyles;
    }
  }

  return customizedStyles;
}

/**
 * Adjusts a hex color by a percentage
 * @param color - The hex color to adjust
 * @param percent - The percentage to adjust by (positive for lighter, negative for darker)
 * @returns The adjusted hex color
 */
export function adjustColor(color: string, percent: number): string {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.round((R * (100 + percent)) / 100);
  G = Math.round((G * (100 + percent)) / 100);
  B = Math.round((B * (100 + percent)) / 100);

  R = Math.min(255, Math.max(0, R));
  G = Math.min(255, Math.max(0, G));
  B = Math.min(255, Math.max(0, B));

  const RR =
    R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
  const GG =
    G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
  const BB =
    B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

/**
 * Gets the Google Fonts import statement for a given font
 * @param font - The font name
 * @returns The CSS import statement
 */
function getFontImport(font: string): string | null {
  const fontImports: Record<string, string> = {
    roboto:
      '@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");',
    poppins:
      '@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");',
    montserrat:
      '@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap");',
    lato: '@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap");',
    playfair:
      '@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap");',
    raleway:
      '@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap");',
    oswald:
      '@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap");',
    merriweather:
      '@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap");',
  };

  return fontImports[font] || null;
}

/**
 * Updates the global styles to include font imports
 * @param options - The theme options
 */
export function updateGlobalStyles(options: ThemeOptions): void {
  if (typeof document === "undefined") return;

  // Remove any existing font import links
  const existingLinks = document.querySelectorAll("link[data-theme-font]");
  existingLinks.forEach((link) => link.remove());

  // Add new font import if needed
  const fontFamily = options.font || "inter";
  if (fontFamily !== "inter") {
    const fontUrl = getFontUrl(fontFamily);
    if (fontUrl) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = fontUrl;
      link.setAttribute("data-theme-font", fontFamily);
      document.head.appendChild(link);
    }
  }
}

/**
 * Gets the Google Fonts URL for a given font
 * @param font - The font name
 * @returns The Google Fonts URL
 */
function getFontUrl(font: string): string | null {
  const fontUrls: Record<string, string> = {
    roboto:
      "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
    poppins:
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
    montserrat:
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
    lato: "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
    playfair:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
    raleway:
      "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap",
    oswald:
      "https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap",
    merriweather:
      "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
  };

  return fontUrls[font] || null;
}
