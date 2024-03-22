import path from "path";
import nodeExternals from 'webpack-node-externals';

const entry = { server: "./src/server/index.ts" };
//const url =require('url');
//const __dirname = __dirname ?? path.dirname(url.fileURLToPath(import.meta.url));
if(! process.env.NODE_ENV ){
// process.env must exist
	process.env.NODE_ENV="development";
}

export default {
  mode: process.env.NODE_ENV,
  target: "node",
  devtool: "inline-source-map",
  entry: entry,
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  // don't compile node_modules
  devServer: {
    magicHtml: true,
  },

  // https://stackoverflow.com/questions/39798095/multiple-html-files-using-webpack
  externals: [nodeExternals(), "src/server/models/CatsModel.ts"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        //  exclude:/.*CatsModel\.ts$/,  // this is not doing anything https://webpack.js.org/configuration/module/#ruleexclude
        use: [
          {
            loader: "ts-loader",
            options: {
              // use the tsconfig in the server directory
              configFile: "src/server/tsconfig.json",
            },
          },
        ],
      },
    ],
  },
};

