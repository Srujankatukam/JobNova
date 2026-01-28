import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Add empty turbopack config to silence the warning
  turbopack: {},
  webpack: (config) => {
    // Ensure modules resolve from the frontend directory first
    if (config.resolve) {
      config.resolve.modules = [
        path.resolve(__dirname, 'node_modules'),
        ...(config.resolve.modules || []),
      ];
    }
    return config;
  },
};

export default nextConfig;
