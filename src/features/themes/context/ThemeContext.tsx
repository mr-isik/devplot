"use client";

import type { ReactNode } from "react";
import type { ThemeOptions } from "../types/theme-options";
import { createContext, useContext, useMemo, useState } from "react";
import { defaultThemeOptions } from "../types/theme-options";

type ThemeContextType = {
  themeOptions: ThemeOptions;
  updateThemeOptions: (options: Partial<ThemeOptions>) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
  children,
  initialOptions = defaultThemeOptions,
}: {
  children: ReactNode;
  initialOptions?: ThemeOptions;
}) => {
  const [themeOptions, setThemeOptions] =
    useState<ThemeOptions>(initialOptions);

  const updateThemeOptions = (options: Partial<ThemeOptions>) => {
    setThemeOptions((prevOptions) => ({
      ...prevOptions,
      ...options,
      theme: options.theme || prevOptions.theme,
      colorTheme: options.colorTheme || prevOptions.colorTheme,
      colorPalette: {
        ...prevOptions.colorPalette,
        ...(options.colorPalette || {}),
      },
      fonts: {
        ...prevOptions.fonts,
        ...(options.fonts || {}),
      },
    }));
  };

  const contextValue = useMemo(
    () => ({ themeOptions, updateThemeOptions }),
    [themeOptions]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
