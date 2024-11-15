import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      
      // {
      //   protocol: 'http',
      //   hostname: "res.cloudinary.com",
      //   pathname: '/**'

      // },
      // {
      //   protocol: 'https',
      //   hostname: "res.cloudinary.com",
      //   pathname: '/**'

      // },
      
    ]
  }
};

export default nextConfig;
