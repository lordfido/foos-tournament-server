import path from "path";
// @ts-ignore
import UglifyPlugin from "terser-webpack-plugin";
import webpack from "webpack";

export const paths = {
  dist: path.resolve(__dirname, "..", "dist"),
  root: path.resolve(__dirname, ".."),
  src: path.resolve(__dirname, "..", "src")
};

export const regex = {
  mjs: /\.mjs$/,
  ts: /\.(tsx?|js)$/
};

export const uglifyPlugin = new UglifyPlugin();

const baseConfig: webpack.Configuration = {
  target: "node",

  mode: "development",

  devtool: "source-map",

  entry: ["babel-polyfill", path.resolve(paths.src, "index.tsx")],

  output: {
    filename: "[name]-[hash].js",
    path: paths.dist,
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: regex.mjs,
        include: /node_modules/,
        type: "javascript/auto"
      },

      // JS, TS and TSX
      {
        exclude: /node_modules/,
        include: paths.src,
        test: regex.ts,
        use: [
          {
            loader: "babel-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".mjs"]
  }
};

export default baseConfig;
