import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path, { dirname} from "path";
import ts from 'vite-plugin-ts';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let mode='development';
if(process.env && process.env.NODE_ENV) {
	mode=process.env.NODE_ENV;
}
let ofn="";
if(mode==="development") {
	ofn="shopping-test";
} else {
	ofn="shopping";
}

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [ts(), nodePolyfills(), ],
    root: ".",
	server: {
      hmr: false
	},
	esbuild:{
		minifyIdentifiers:false
	},
	build: {
    lib: {
      entry: path.resolve(__dirname, "src/server/index.ts"),
//      name: "server",
//      fileName: (format) => path.resolve(__dirname, `build/${ofn}.${format}.js`),
    },
//	minify:"terser",
    rollupOptions: {
   	external: [ /^node:.*/,  "fs/promises", "querystring", "http", "path", "net", "zlib", "fs", "stream", "async_hooks", "crypto", "os" ],
//   	external: [],
      output: [ { 
        format: 'es',
		entryFileNames:"server.mjs",
		// set output formats?
//        globals: {
//      },
      },],
    },
  },

});

// vim: syn=javascript nospell
