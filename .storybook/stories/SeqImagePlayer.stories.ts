import { Story, Meta } from '@storybook/html';
import { api, methods } from './SeqImagePlayer';
import SeqImagePlayer, { SeqImagePlayerOption } from '../../src';

export default {
  title: 'Example/SeqImagePlayer',
} as Meta;

export interface SeqImagePlayerDemoProps {
  fps: number;
  frameStep: number;
  imageSource: string[];
  autoplay: boolean;
}

const Template: Story<SeqImagePlayerDemoProps> = (args) => {
  const { imageSource, fps, frameStep, autoplay } = args;

  const container = document.createElement('div');
  container.style.height = '400px';

  const option: SeqImagePlayerOption = {
    container,
    imageSource,
    fps,
    frameStep,
    autoplay,
  };
  new SeqImagePlayer(option);

  return container;
};

export const Simple = Template.bind({});

Simple.argTypes = { ...api, ...methods };
