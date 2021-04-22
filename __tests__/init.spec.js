import SeqImagePlayer from '../src/index.ts';

test('initialize player instance', () => {
  const container = document.createElement('div');
  const option = {
    imageSource: [],
    container: document.createElement('div'),
  };
  new SeqImagePlayer(option);
  setTimeout(() => {
    expect(container.firstChild.tagName).toBe('CANVAS');
  }, 1000);
});
