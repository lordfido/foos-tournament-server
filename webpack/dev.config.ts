import webpack from 'webpack';

import baseConfig from './base.config';

export const serverConfig: webpack.Configuration = {
  ...baseConfig,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),

    new webpack.NamedModulesPlugin(),
  ],
};

export default serverConfig;
