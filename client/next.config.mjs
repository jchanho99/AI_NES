/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: () => [
    {
      source: "/service/:start/:end",
      destination: `${process.env.NEXT_PUBLIC_API_URL}/:start/:end`,
    },
  ],
  reactStrictMode: false
};

export default nextConfig;
