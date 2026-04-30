import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    label: 'Search',
    name: 'q',
    placeholder: 'Search...',
    size: 'md',
    disabled: false,
    autoComplete: 'off',
  },
};

export default meta;
type Story = StoryObj<typeof SearchField>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Press Enter to search or use the arrow keys to navigate.' },
};

export const WithError: Story = {
  args: { error: 'Please enter at least 3 characters.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const InSearchLandmark: Story = {
  render: () => (
    <search aria-label="Product search">
      <SearchField
        label="Search products"
        name="q"
        placeholder="E.g. interface design..."
        hint="Press Enter to see results."
        autoComplete="off"
      />
    </search>
  ),
};
