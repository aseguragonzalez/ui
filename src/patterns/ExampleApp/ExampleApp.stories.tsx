import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExampleApp } from './ExampleApp';

const meta: Meta = {
  title: 'Patterns/ExampleApp',
  parameters: {
    layout: 'fullscreen',
    skipThemeDecorator: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ExampleApp />,
};
