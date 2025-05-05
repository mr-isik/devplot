import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/providers";
import { DM_Sans } from "next/font/google";
import "@/styles/global.css";

// Initialize the Inter font
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
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
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <body>
        <Providers>
          {props.children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
