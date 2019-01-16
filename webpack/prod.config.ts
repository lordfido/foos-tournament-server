import webpack from "webpack";

import { uglifyPlugin } from "./base.config";
import devServerConfig from "./dev.config";

const serverConfig: webpack.Configuration = {
  ...devServerConfig,

  mode: "production",

  devtool: false,

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],

  optimization: {
    minimizer: [uglifyPlugin]
  }
};

export default serverConfig;
