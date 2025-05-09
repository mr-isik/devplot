import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["."],
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jxxkvmlubqouilyznzvg.supabase.co",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
