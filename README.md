# [seq-image-player](https://github.com/onthia/seq-image-player)

[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/onthia/seq-image-player/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/onthia/seq-image-player.svg?branch=master)](https://travis-ci.org/onthia/seq-image-player)
[![Coveralls](https://img.shields.io/coveralls/onthia/seq-image-player.svg)](https://coveralls.io/github/onthia/seq-image-player)
[![npm](https://img.shields.io/badge/npm-0.1.0-orange.svg)](https://www.npmjs.com/package/seq-image-player)
[![NPM downloads](http://img.shields.io/npm/dm/seq-image-player.svg?style=flat-square)](http://www.npmtrends.com/seq-image-player)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/onthia/seq-image-player.svg)](http://isitmaintained.com/project/onthia/seq-image-player 'Percentage of issues still open')

序列图播放组件

## :star: 特性

- 移动端视频播放的降级方案
- 兼容 IPhone 低电量模式

```
.
├── dist 编译产出代码
├── src 源代码目录
├── test 单元测试
├── CHANGELOG.md 变更日志
└── TODO.md 计划功能
```

## :rocket: 使用者指南

通过 npm 下载安装代码

```bash
$ npm install --save seq-image-player
```

如果你是 node 环境

```js
const SeqImagePlayer = require('seq-image-player');
import SeqImagePlayer from 'seq-image-player';
const container = document.createElement('div');
const option = {
  imageSource: [
    'https://xxx.com/001.png',
    //...
  ],
  container,
};
new SeqImagePlayer(option);
```

如果你是 webpack 等环境

```js
import SeqImagePlayer from 'seq-image-player';
const container = document.createElement('div');
const option = {
  imageSource: [
    'https://xxx.com/001.png',
    //...
  ],
  container,
};
new SeqImagePlayer(option);
```

如果你是 requirejs 环境

```js
requirejs(['node_modules/seq-image-player/dist/index.aio.js'], function (SeqImagePlayer) {
  const container = document.createElement('div');
  const option = {
    imageSource: [
      'https://xxx.com/001.png',
      //...
    ],
    container,
  };
  new SeqImagePlayer(option);
});
```

如果你是浏览器环境

```html
<script src="node_modules/seq-image-player/dist/index.aio.js"></script>
<script>
  const container = document.createElement('div');
  const option = {
    imageSource: [
      'https://xxx.com/001.png',
      //...
    ],
    container,
  };
  new SeqImagePlayer(option);
</script>
```

## :kissing_heart: 贡献者指南

首次运行需要先安装依赖

```bash
$ npm install
```

一键打包生成生产代码

```bash
$ npm run build
```

运行单元测试:

```bash
$ npm test
```

使用文档:

```bash
$ npm run storybook
```

> 注意：浏览器环境需要手动测试，位于`test/browser`

修改 package.json 中的版本号，修改 README.md 中的版本号，修改 CHANGELOG.md，然后发布新版

```bash
$ npm run release
```

将新版本发布到 npm

```bash
$ npm publish
```

## 贡献者列表

[contributors](https://github.com/onthia/seq-image-player/graphs/contributors)

## :gear: 更新日志

[CHANGELOG.md](./CHANGELOG.md)

## :airplane: 计划列表

[TODO.md](./TODO.md)
