/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ['tonstarter-symbols.s3.ap-northeast-2.amazonaws.com','thenounproject.com','cdn.imweb.me'], //make it 'your-domain.com'
  // },
  reactStrictMode: false,
  images: {
    domains: ['**'],
  },
  env: {
    MODE: process.env.NEXT_PUBLIC_MODE,
  },
 
};

module.exports = nextConfig;
