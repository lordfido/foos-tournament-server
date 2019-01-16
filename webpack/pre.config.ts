import webpack from "webpack";

import devServerConfig from "./dev.config";

const serverConfig: webpack.Configuration = {
  ...devServerConfig,

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("pre")
      }
    })
  ]
};

export default serverConfig;
