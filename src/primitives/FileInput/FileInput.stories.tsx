import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileInput } from './FileInput';

const meta: Meta<typeof FileInput> = {
  title: 'Primitives/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
  },
  args: {
    'aria-label': 'Document',
    size: 'md',
    hasError: false,
    disabled: false,
    multiple: false,
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {};
export const Multiple: Story = { args: { multiple: true, accept: 'image/*' } };
export const WithError: Story = { args: { hasError: true } };
export const Disabled: Story = { args: { disabled: true } };
