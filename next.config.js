/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.catholicsingles.com",
    "cloudflare-ipfs.com",
    "lh3.googleusercontent.com"]
  }
}

module.exports = nextConfig