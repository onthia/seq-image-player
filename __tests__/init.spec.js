import { SeqImagePlayer } from '../src/index.ts';

test('initialize player instance', () => {
  const container = document.createElement('div');
  const option = {
    pathTemplate: 'https://workvideo.vvtechnology.cn/%E5%BA%8F%E5%88%97%E5%9B%BE750-%20600_20s_19Mar{*}.jpg',
    imageNumber: 10,
    wildcardLength: 4,
    container: document.createElement('div'),
  };
  new SeqImagePlayer(option);
  setTimeout(() => {
    expect(container.firstChild.tagName).toBe('CANVAS');
  }, 1000);
});
