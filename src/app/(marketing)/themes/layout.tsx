import type { ReactNode } from "react";

interface ThemesLayoutProps {
  children: ReactNode;
}

export default function ThemesLayout({ children }: ThemesLayoutProps) {
  return (
    <div className="bg-gradient-to-b from-background to-muted/30 pb-20">
      <div className="container relative mx-auto min-h-screen">{children}</div>
    </div>
  );
}
