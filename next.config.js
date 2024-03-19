const withInterceptStdout = require("next-intercept-stdout");
const ignoreStderr = require("./ignore-stderr.json");

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

module.exports = withInterceptStdout(nextConfig, (text) =>
  ignoreStderr.some((pattern) => text.includes(pattern)) ? "" : text,
);
