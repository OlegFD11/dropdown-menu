const Path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: Path.resolve(__dirname, "../src/scripts/index.js"),
  },
  output: {
    path: Path.join(__dirname, "../build"),
    filename: "js/[name].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: Path.resolve(__dirname, "../public"),
        to: "public",
      },
    ]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: Path.resolve(__dirname, "../src/index.html"),
    }),

    new webpack.ProvidePlugin({
      _: "underscore",
    }),
  ],
  resolve: {
    alias: {
      "~": Path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              interpolate: true,
              minify: false,
            },
          },
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      },
    ],
  },
  node: {
    fs: "empty",
  },
  devServer: {
    port: 8080,
    contentBase: ["./src", "./public"], // both src and output dirs
    inline: true,
    hot: true,
  },
};
