import typescript from 'rollup-plugin-typescript2';

import pkg from '../package.json';

const version = pkg.version;

const banner = `/*!
 * ${pkg.name} ${version} (https://github.com/onthia/seq-image-player)
 * API https://github.com/onthia/seq-image-player/blob/master/doc/api.md
 * Copyright 2017-${new Date().getFullYear()} onthia. All Rights Reserved
 * Licensed under MIT (https://github.com/onthia/seq-image-player/blob/master/LICENSE)
 */
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getCompiler(opt) {
  opt = opt || {
    tsconfigOverride: { compilerOptions: { module: 'ES2015' } },
  };

  return typescript(opt);
}

export default {
  name: 'SeqImagePlayer',
  banner,
  getCompiler,
};
