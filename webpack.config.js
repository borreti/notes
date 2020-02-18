const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const entries = {};

Object.keys(slsw.lib.entries).forEach(
  key => {
    if (!slsw.lib.entries[key].match(/\.py$/)) {
      entries[key] = [slsw.lib.entries[key]]
    }
  }
);

module.exports = {
  entry: entries,
  target: "node",
  // Generate sourcemaps for proper error messages
  devtool: 'source-map',
  // put python stuff on the package
  plugins: [
    new CopyPlugin([
      './lambdas/**.py'
    ])
  ],
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  }
};
