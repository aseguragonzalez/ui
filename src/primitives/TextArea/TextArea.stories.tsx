import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Primitives/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    autoResize: { control: 'boolean' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
  },
  args: {
    'aria-label': 'Comment',
    placeholder: 'Write here...',
    size: 'md',
    hasError: false,
    disabled: false,
    autoResize: false,
    rows: 3,
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};

export const WithError: Story = {
  args: { hasError: true },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Locked text, not editable.' },
};

export const AutoResize: Story = {
  args: {
    autoResize: true,
    rows: 2,
    placeholder: 'The textarea grows with its content...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '480px' }}>
      <TextArea aria-label="Small" size="sm" placeholder="Small" rows={2} />
      <TextArea aria-label="Medium" size="md" placeholder="Medium" rows={2} />
      <TextArea aria-label="Large" size="lg" placeholder="Large" rows={2} />
    </div>
  ),
};
