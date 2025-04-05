/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "d213oatl14uitb.cloudfront.net",
      },
      {
        hostname: "crests.football-data.org",
      },
    ],
  },
};

export default nextConfig;
