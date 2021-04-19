// rollup.config.js
// umd
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

import common from './rollup.js';

var prod = process.env.NODE_ENV === 'production';

module.exports = {
  input: 'src/index.ts',
  output: {
    file: prod ? 'dist/index.aio.min.js' : 'dist/index.aio.js',
    format: 'umd',
    // When export and export default are not used at the same time, set legacy to true.
    // legacy: true,
    name: common.name,
    banner: common.banner,
  },
  plugins: [
    nodeResolve({
      main: true,
      extensions: ['.ts', '.js'],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    common.getCompiler(),
    prod && uglify(),
  ],
};
