import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Increase body size limit for file uploads
    },
  },
};

export default nextConfig;
