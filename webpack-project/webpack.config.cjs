const ESLintPlugin = require("eslint-webpack-plugin");
module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: __dirname + "/dist",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [new ESLintPlugin()],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
