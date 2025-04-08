"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

type PortfolioThemeAdapterProps = {
  children: ReactNode;
  className?: string;
};

export function PortfolioThemeAdapter({
  children,
  className = "",
}: PortfolioThemeAdapterProps) {
  const { themeOptions } = useTheme();

  // Generates dynamic CSS based on theme options
  const dynamicStyles = useMemo(() => {
    // Extract options
    const { colorPalette, fonts, themeName } = themeOptions;

    // Generate theme-specific styles
    let themeSpecificStyles = "";

    // Font styles
    const fontStyles = `
      .theme-${themeName} {
        --font-heading: ${fonts.heading};
        --font-body: ${fonts.body};
      }
      
      .theme-${themeName} h1, 
      .theme-${themeName} h2, 
      .theme-${themeName} h3, 
      .theme-${themeName} h4, 
      .theme-${themeName} h5, 
      .theme-${themeName} h6 {
        font-family: var(--font-heading);
      }
      
      .theme-${themeName} p, 
      .theme-${themeName} span, 
      .theme-${themeName} div {
        font-family: var(--font-body);
      }
    `;

    // Combine all styles
    themeSpecificStyles = `
      ${fontStyles}
      
      .theme-${themeName} {
        --theme-primary: ${colorPalette.primary};
        --theme-secondary: ${colorPalette.secondary};
        --theme-background: ${colorPalette.background};
        --theme-text: ${colorPalette.text};
        --theme-accent: ${colorPalette.accent};
        --theme-muted: ${colorPalette.muted};
        --theme-border: ${colorPalette.border};
        --theme-card: ${colorPalette.card};
        
        background-color: var(--theme-background);
        color: var(--theme-text);
      }
      
      .theme-${themeName} .theme-card {
        background-color: var(--theme-card);
        border: 1px solid var(--theme-border);
        border-radius: 0.5rem;
        padding: 1.5rem;
        transition: all 0.3s ease;
      }
      
      .theme-${themeName} .theme-card:hover {
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
      }
      
      .theme-${themeName} .theme-button {
        background-color: var(--theme-primary);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-weight: 500;
        transition: all 0.15s ease;
      }
      
      .theme-${themeName} .theme-button:hover {
        background-color: var(--theme-secondary);
      }
    `;

    return themeSpecificStyles;
  }, [themeOptions]);

  return (
    <>
      <style jsx global>
        {dynamicStyles}
      </style>
      <div className={className}>{children}</div>
    </>
  );
}
