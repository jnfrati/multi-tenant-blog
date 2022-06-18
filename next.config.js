/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: [
    {
      source: "/:path*",
      has: [
        {
          type: "host",
          value: ":id.(:host)",
        },
      ],
      destination: "/:id/:path*",
    },
  ],
};

module.exports = nextConfig;
