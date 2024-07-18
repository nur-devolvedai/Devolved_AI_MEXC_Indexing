/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.externals.push( 'pino-pretty', 'lokijs', 'encoding' )
    return config
  },
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    CHAIN_URL: process.env.NEXT_PUBLIC_CHAIN_URL,
    SECRET_SEED: process.env.NEXT_PUBLIC_REQUEST_AMOUNT,
    REQUEST_AMOUNT: process.env.NEXT_PUBLIC_REQUEST_AMOUNT
  }
};
  
module.exports = nextConfig;  