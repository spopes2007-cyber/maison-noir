import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/maison-noir",
  images: { unoptimized: true },
};

export default nextConfig;
