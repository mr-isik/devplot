type ThemeOptions = {
  theme: string;
  font: string;
  colors?: string[];
  [key: string]: any;
};

// Color theme definitions
const colorThemes = {
  light: {
    bg: "#fafafa",
    textPrimary: "#171717",
    textSecondary: "#525252",
    accent: "#2563eb",
    accentLight: "#60a5fa",
    border: "#e5e5e5",
    cardBg: "#ffffff",
    sectionBg: "#f5f5f5",
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
  },
  dark: {
    bg: "#121212",
    textPrimary: "#f5f5f5",
    textSecondary: "#a3a3a3",
    accent: "#3b82f6",
    accentLight: "#93c5fd",
    border: "#262626",
    cardBg: "#1e1e1e",
    sectionBg: "#171717",
    gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  },
  blue: {
    bg: "#EFF6FF",
    textPrimary: "#1E3A8A",
    textSecondary: "#3B82F6",
    accent: "#2563EB",
    accentLight: "#60A5FA",
    border: "#BFDBFE",
    cardBg: "#FFFFFF",
    sectionBg: "#DBEAFE",
    gradient: "linear-gradient(135deg, #2563EB, #1D4ED8)",
  },
  green: {
    bg: "#ECFDF5",
    textPrimary: "#064E3B",
    textSecondary: "#059669",
    accent: "#059669",
    accentLight: "#34D399",
    border: "#A7F3D0",
    cardBg: "#FFFFFF",
    sectionBg: "#D1FAE5",
    gradient: "linear-gradient(135deg, #059669, #047857)",
  },
  purple: {
    bg: "#F5F3FF",
    textPrimary: "#4C1D95",
    textSecondary: "#7C3AED",
    accent: "#7C3AED",
    accentLight: "#A78BFA",
    border: "#DDD6FE",
    cardBg: "#FFFFFF",
    sectionBg: "#E9D5FF",
    gradient: "linear-gradient(135deg, #7C3AED, #6D28D9)",
  },
  orange: {
    bg: "#FFF7ED",
    textPrimary: "#7C2D12",
    textSecondary: "#EA580C",
    accent: "#EA580C",
    accentLight: "#FB923C",
    border: "#FED7AA",
    cardBg: "#FFFFFF",
    sectionBg: "#FFEDD5",
    gradient: "linear-gradient(135deg, #EA580C, #C2410C)",
  },
  custom: {
    // Will be overridden by custom colors
    bg: "#FFFFFF",
    textPrimary: "#000000",
    textSecondary: "#525252",
    accent: "#3B82F6",
    accentLight: "#60A5FA",
    border: "#E5E5E5",
    cardBg: "#FFFFFF",
    sectionBg: "#F5F5F5",
    gradient: "linear-gradient(135deg, #3B82F6, #2563EB)",
  },
};

// Font family definitions
const fontFamilies = {
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

  // Apply color theme
  const colorTheme = options.theme || "light";
  let themeColors = { ...colorThemes[colorTheme as keyof typeof colorThemes] };

  // Handle custom colors if provided
  if (colorTheme === "custom" && options.colors) {
    // Map custom colors to theme properties
    if (Array.isArray(options.colors) && options.colors.length >= 5) {
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
function adjustColor(color: string, percent: number): string {
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
