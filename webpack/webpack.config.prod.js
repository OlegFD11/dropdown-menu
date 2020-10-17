const Path = require("path");
const Webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  stats: "errors-only",
  bail: true,
  output: {
    filename: "js/[name].[chunkhash:8].js",
    chunkFilename: "js/[name].[chunkhash:8].chunk.js",
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: "bundle10[chunkhash:4].css",
    }),
    new CopyPlugin([
      {
        from: Path.resolve(__dirname, "../src/backend"),
        to: Path.resolve(__dirname, "../build"),
      },

      {
        from: Path.resolve(__dirname, "../src/images"),
        to: Path.resolve(__dirname, "../build/src/images"),
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.s?css/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",

          {
            loader: "resolve-url-loader",
            options: {
              // attempts: 1,
              sourceMap: true,
            },
          },

          // 'sass-loader'

          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sourceMapContents: false,
            },
          },
        ],
      },
    ],
  },
});
