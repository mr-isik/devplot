"use client";

import type { ReactNode } from "react";
import type { ThemeOptions } from "../types/theme-options";
import { useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

type ThemeStyleProviderProps = {
  children: ReactNode;
  themeOptions?: ThemeOptions;
};

export function ThemeStyleProvider({
  children,
  themeOptions: propThemeOptions,
}: ThemeStyleProviderProps) {
  // If theme options are provided as props, use those
  // Otherwise use the theme context
  const { themeOptions: contextThemeOptions } = useTheme();
  const options = propThemeOptions || contextThemeOptions;

  // Generate CSS variables from theme options
  const cssVariables = useMemo(() => {
    const { colorPalette, fonts } = options;

    // Convert RGB color strings to CSS variables
    const primaryRgb = hexToRgb(colorPalette.primary);

    return {
      "--primary": colorPalette.primary,
      "--primary-rgb": primaryRgb
        ? `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`
        : "37, 99, 235",
      "--secondary": colorPalette.secondary,
      "--background": colorPalette.background,
      "--foreground": colorPalette.text,
      "--accent": colorPalette.accent,
      "--muted": colorPalette.muted,
      "--border": colorPalette.border,
      "--card": colorPalette.card,
      "--font-heading": fonts.heading || "Inter, system-ui, sans-serif",
      "--font-body": fonts.body || "Inter, system-ui, sans-serif",
    };
  }, [options]);

  return <div style={cssVariables as React.CSSProperties}>{children}</div>;
}

// Utility to convert hex color to RGB components
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  if (!hex) {
    return null;
  }

  // Match a 3 or 6 digit hex code
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const formattedHex = hex.replace(
    shorthandRegex,
    (_, r, g, b) => r + r + g + g + b + b
  );

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formattedHex);

  if (!result || result.length < 4) {
    return null;
  }

  // result[1], result[2], result[3] are non-null because we've already checked length above
  return {
    r: Number.parseInt(result[1]!, 16),
    g: Number.parseInt(result[2]!, 16),
    b: Number.parseInt(result[3]!, 16),
  };
}
