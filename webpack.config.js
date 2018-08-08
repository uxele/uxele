var webpack = require("webpack");
var mode = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "/static",
    filename: "./build/bundle.js",
    publicPath: "/"
  },
  mode: mode,
  // Enable sourcemaps for debugging webpack's output.
  devtool: mode === "development" ? "source-map" : "(none)",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // Handle .ts and .tsx file via ts-loader.
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /(\.scss|\.sass)$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ],
  },
};