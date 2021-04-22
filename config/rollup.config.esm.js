// rollup.config.js
// ES output
import common from './rollup.js';

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.esm.js',
    format: 'es',
    banner: common.banner,
    exports: 'named',
  },
  plugins: [common.getCompiler()],
};
