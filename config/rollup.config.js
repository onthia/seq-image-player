// rollup.config.js
// commonjs
import common from './rollup.js';

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    banner: common.banner,
    exports: 'named',
  },
  plugins: [
    common.getCompiler({
      tsconfigOverride: { compilerOptions: { declaration: true, module: 'ES2015' } },
      useTsconfigDeclarationDir: true,
    }),
  ],
};
