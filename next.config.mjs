/** @type {import('next').NextConfig} */
const repo = "library-of-shadows";
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isPages ? `/${repo}` : "",
  assetPrefix: isPages ? `/${repo}/` : "",
  env: { NEXT_PUBLIC_BASE_PATH: isPages ? `/${repo}` : "" },
};

export default nextConfig;
