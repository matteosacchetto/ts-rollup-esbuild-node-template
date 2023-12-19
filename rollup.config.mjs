import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import run from '@rollup/plugin-run';
import replace from '@rollup/plugin-replace';
import externals from 'rollup-plugin-node-externals';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import esbuild from 'rollup-plugin-esbuild';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const pkg = require('./package.json');

const preferConst = true; // Use "const" instead of "var"
const usePreserveModules = true; // `true` -> keep modules structure, `false` -> combine everything into a single file

const isProduction = process.env.NODE_ENV === 'production';
const isWatched = process.env.ROLLUP_WATCH === 'true'; // `true` if -w option is used
const useSourceMaps = process.env.NODE_ENV === 'debug';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    generatedCode: {
      constBindings: preferConst,
    },
    preserveModules: isProduction ? false : usePreserveModules,
    strict: true,
    entryFileNames: '[name].mjs',
    sourcemap: useSourceMaps,
  },
  treeshake: 'smallest',
  plugins: [
    externals(),
    json({
      preferConst: preferConst,
    }),
    replace({
      'process.env.PKG_NAME': `"${pkg.name}"`,
      'process.env.PKG_VERSION': `"${pkg.version}"`,
      'process.env.PKG_DESCRIPTION': `"${pkg.description}"`,
      'process.env.BUILD_NODE_ENV': `${isProduction}`,
      preventAssignment: true,
      sourceMap: useSourceMaps,
    }),
    typescriptPaths({
      preserveExtensions: true,
    }),
    esbuild({
      legalComments: 'none',
      target: 'esnext',
    }),
    isWatched ? run() : undefined,
  ],
});
