// this file will not afect the sandbox but will
// afect the deployment and dowload

import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle/bundle.js"
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write("public/bundle.css");
      }
    }),
    json(),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve(),
    commonjs(),

    !production && serve(),

    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()

  ],
  client: {
    watch: {
      chokidar: {
        usePolling: true
      }
    }
  },
  server: {
    watch: {
      chokidar: {
        usePolling: true 
      }
    }
  },
  watch: {
	  clearScreen: false, // whether or not to clear the screen when a rebuild is triggered 
    chokidar: false
  }
};

function serve(){
  let started = false;

  return {
    writeBundle() {
      if(!started){
        started = true;

        require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true 
        })
      }
    }
  }
}
