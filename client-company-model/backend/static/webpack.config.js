const path = require("path");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  watch: true,
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true // this prevents the default browser full page refresh on form submission and link change
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader", options: { presets: ["@babel/react"] } }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  }
};
