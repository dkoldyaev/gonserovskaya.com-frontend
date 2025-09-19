/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.eu-north-1.amazonaws.com',
      },
    ]
  }
};

export default nextConfig;


