const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const packageJson = require("./package.json")

// NOTE: this API_SOURCE env is only used in remote app's local development.
// when deployed and called by host app, remote app uses host's next config
const API_SOURCE = process.env.API_SOURCE || "http://localhost:8888";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_SOURCE,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_SOURCE}/:path*`,
      },
    ];
  },
  /**
   *
   * @param {import('webpack').Configuration} config
   * @returns {import('webpack').Configuration}
   */
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "remote-two",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./RemoteTwoTestAuth": "./src/components/RemoteTwoTestAuth.tsx",
          "./RemoteTwoTitle": "./src/components/RemoteTwoTitle.tsx",
          // later better to define way for modules / components / etc that are shared for all remotes
          // like these files below
          "./ComponentWithRenderError":
            "./src/components/ComponentWithRenderError.tsx",
          "./ComponentWithHandlerError":
            "./src/components/ComponentWithHandlerError.tsx",
        },
        shared: {
          antd: {
            singleton: true,
            requiredVersion: packageJson.dependencies.antd,
            eager: true,
          },
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
