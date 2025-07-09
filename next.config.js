/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/test-ictconscript-admission" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/test-ictconscript-admission/" : "",
  eslint: {
      ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
