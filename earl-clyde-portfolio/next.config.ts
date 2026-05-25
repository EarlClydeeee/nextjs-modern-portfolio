import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — generates ./out for S3 / CloudFront / Amplify Hosting
  output: "export",
  // S3 needs explicit /index.html under each path; trailing slash makes URLs match the file layout
  trailingSlash: true,
  // next/image's optimizer requires a Node runtime; static export must skip it
  images: { unoptimized: true },
};

export default nextConfig;
