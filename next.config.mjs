import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the development cache separate from production builds. Running
  // `next build` while the local server is open must not invalidate its chunks.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  images: {
    // Add candidates close to common laptop widths so full-screen artwork
    // imagery does not jump directly from 1200 px to 1920 px.
    deviceSizes: [512, 576, 640, 750, 828, 1080, 1200, 1366, 1536, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
