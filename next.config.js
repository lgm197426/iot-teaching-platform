/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  env: {
    CUSTOM_KEY: 'iot-teaching-platform'
  }
}

module.exports = nextConfig
