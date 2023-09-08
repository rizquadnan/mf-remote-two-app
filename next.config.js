const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const packageJson = require("./package.json")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
            eager: true
          },
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
