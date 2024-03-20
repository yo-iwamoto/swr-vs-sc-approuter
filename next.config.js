/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  output: "standalone",
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
