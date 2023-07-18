/// <reference types="vitest" />
//  // / <reference types="vite/client" />

// import react from '@vitejs/plugin-react';
//import { defineConfig } from 'vite';
import { configDefaults, defineConfig, UserConfig } from 'vitest/config'

export default defineConfig({
//  plugins: [react()],
  test: {
    globals: true,
//	testNamePattern:".+\\.vitest\\.ts$", 
	include:[ "src/client/test/*.vitest.ts", "src/client/test/*.vitest.js"],
    environment: 'jsdom',
	bail:0,
  },
	browser:{ enabled:true, name:"chromium" }
});
// vim: syn=typescript nospell
// node_modules/.bin/vitest --run --dir ./src/client/test/ -t ".+vitest.ts$" ./src/client/test/util.vitest.ts
