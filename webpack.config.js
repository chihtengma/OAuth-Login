module.exports = {
   devtool: "source-map",
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
               presets: ["@babel/preset-react"]
            }
         },
         {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
         },
         {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
               {
                  loader: "file-loader",
                  options: {
                     name: "[name].[ext]",
                     outputPath: "images/",
                     publicPath: "images/"
                  }
               }
            ]
         }
      ]
   }
};
