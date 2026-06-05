import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,
  },
  allowedDevOrigins: [
    "preview-chat-55d75cc3-312d-48fb-ab7f-61329a705f3a.space-z.ai",
    ],
};

export default nextConfig;
