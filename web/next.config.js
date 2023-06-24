/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.websocket$/,
        use: "null-loader",
      });
    }
    return config;
  },
};

module.exports = nextConfig;
