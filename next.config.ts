import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Additional config options here */

  // Allow remote images from Googleusercontent
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com", // ✅ Add Clerk's image CDN
        port: "",
      },
    ],
  },

  // Add security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups", // Required for OAuth popups
          },
          // {
          //   key: "Cross-Origin-Embedder-Policy",
          //   value: "require-corp",
          // },
        ],
      },
    ];
  },
};

export default nextConfig;
