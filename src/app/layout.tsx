import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/providers";
import { Inter } from "next/font/google";
import "@/styles/global.css";

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  icons: [
    {
      rel: "icon",
      url: "/devplot_logo.ico",
      sizes: "32x32",
    },
  ],
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <Providers>
          {props.children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
