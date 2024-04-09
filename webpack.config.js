const path = require("path");

module.exports = {
  entry: "./src/script.js",
  mode: 'production',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 8080,
    headers: {
      "Content-Type": "application/javascript"
    },
    watchContentBase: true,
  }
};
