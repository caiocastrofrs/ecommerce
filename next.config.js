// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.jsdelivr.net/**")],
  },
};

module.exports = nextConfig;
