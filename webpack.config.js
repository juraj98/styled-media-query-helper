const path = require("path");

module.exports = env => ({
  entry: "./src/index.js",
  devtool: "source-map",
  mode: env.production ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "commonjs2"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: __dirname,
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },

  externals: {
    react: "commonjs react"
  }
});
