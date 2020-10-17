const Path = require("path");
const Webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

require("dotenv").config();

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-eval-source-map",
  output: {
    chunkFilename: "js/[name].chunk.js",
  },
  devServer: {
    inline: true,
    hot: true,
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
  module: {
    rules: [
      // {
      //   test: /\.(js)$/,
      //   include: Path.resolve(__dirname, '../src'),
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      //   options: {
      //     emitWarning: true,
      //   }
      //},
      {
        test: /\.(js)$/,
        include: Path.resolve(__dirname, "../src"),
        loader: "babel-loader",
      },

      {
        test: /\.s?css$/i,
        use: [
          "style-loader",
          // 'css-loader?sourceMap=true',
          "css-loader",

          {
            loader: "resolve-url-loader",
            options: {
              //attempts: 1,
              sourceMap: true,
            },
          },

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
  node: {
    fs: "empty",
  },
});