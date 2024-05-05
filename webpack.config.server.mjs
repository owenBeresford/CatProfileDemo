import path from "path";
import nodeExternals from 'webpack-node-externals';
import { fileURLToPath } from "url";
import { createRequire } from "module";

const entry = { server: "./src/server/index.ts" };
//const url =require('url');
//const __dirname = __dirname ?? path.dirname(url.fileURLToPath(import.meta.url));
if(! process.env.NODE_ENV ){
// process.env must exist
	process.env.NODE_ENV="development";
}

function createPaths(url) {
	const require = createRequire(url);
	const __filename = fileURLToPath(url);
	const __dirname = path.dirname(__filename);
	return [ __filename, __dirname ];
}
const [ __filename, __dirname ]=createPaths( ""+import.meta.url );


export default {
  mode: process.env.NODE_ENV,
  target: ["es2020", "node18"],
  devtool: "inline-source-map",
  entry: entry,
  output: {
    path: path.resolve(__dirname, "build"),
    chunkFormat: "module",
   module: true,
    filename: "[name].mjs",
  },
  resolve: {
    extensions: [".ts", ".tsx", "*.mjs"],
  },
  // don't compile node_modules
  devServer: {
    magicHtml: true,
  },
  experiments:{
    futureDefaults: true,
    outputModule: true,
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

