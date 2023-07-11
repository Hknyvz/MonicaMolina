/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "wizardly-curie.31-193-136-53.plesk.page"],
  },
  reactStrictMode: false,
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
