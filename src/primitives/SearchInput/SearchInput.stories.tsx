import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Primitives/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    'aria-label': 'Search',
    placeholder: 'Search...',
    size: 'md',
    hasError: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {};
export const WithError: Story = { args: { hasError: true } };
export const Disabled: Story = { args: { disabled: true } };
