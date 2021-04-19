import { Story, Meta } from '@storybook/html';
import { parameters, methods } from './SeqImagePlayer';
import { SeqImagePlayer, SeqImagePlayerOption } from '../../src';

export default {
  title: 'Example/SeqImagePlayer',
} as Meta;

export interface SeqImagePlayerDemoProps {
  frame: number;
  frameStep: number;
  imageNumber: number;
  pathTemplate: string;
  wildcardLength: number;
}

const Template: Story<SeqImagePlayerDemoProps> = (args) => {
  const { pathTemplate, imageNumber, wildcardLength, frame, frameStep } = args;

  const container = document.createElement('div');
  container.style.height = '400px';

  const option: SeqImagePlayerOption = {
    container,
    pathTemplate,
    imageNumber,
    wildcardLength,
    frame,
    frameStep,
  };
  new SeqImagePlayer(option);

  return container;
};

export const Simple = Template.bind({});

Simple.argTypes = { ...parameters, ...methods };
