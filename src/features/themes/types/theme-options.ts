import type { ThemeVariant } from "./index";

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

export type ThemeOptions = {
  themeName: ThemeVariant;
  colorPalette: ColorPalette;
  fonts: FontOptions;
};

export const defaultThemeOptions: ThemeOptions = {
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
