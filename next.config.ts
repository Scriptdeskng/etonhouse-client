import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "api.etonhouseng.com",
        pathname: "/media/products/**",
      },
      {
        protocol: "https",
        hostname: "eton-house.nyc3.digitaloceanspaces.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

