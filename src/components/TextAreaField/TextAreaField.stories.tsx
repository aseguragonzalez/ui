import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextAreaField } from './TextAreaField';

const meta: Meta<typeof TextAreaField> = {
  title: 'Components/TextAreaField',
  component: TextAreaField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    autoResize: { control: 'boolean' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
  },
  args: {
    label: 'Description',
    name: 'description',
    placeholder: 'Write your description here...',
    size: 'md',
    required: false,
    disabled: false,
    autoResize: false,
    rows: 3,
  },
};

export default meta;
type Story = StoryObj<typeof TextAreaField>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: 'Maximum 500 characters. Be concise and clear.',
  },
};

export const WithError: Story = {
  args: {
    error: 'This field is required.',
  },
};

export const WithHintAndError: Story = {
  args: {
    hint: 'Maximum 500 characters.',
    error: 'You have exceeded the character limit.',
  },
};

export const Required: Story = {
  args: {
    required: true,
    hint: 'Fields marked with * are required.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'This content cannot be edited.',
  },
};

export const AutoResize: Story = {
  args: {
    autoResize: true,
    rows: 2,
    hint: 'The field expands automatically as you type.',
    placeholder: 'Start typing to see it grow...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '480px' }}>
      <TextAreaField label="Small" name="sm" size="sm" placeholder="Small" rows={2} />
      <TextAreaField label="Medium" name="md" size="md" placeholder="Medium" rows={2} />
      <TextAreaField label="Large" name="lg" size="lg" placeholder="Large" rows={2} />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '480px' }}
      onSubmit={(e) => e.preventDefault()}
    >
      <TextAreaField
        label="Subject"
        name="subject"
        required
        placeholder="E.g. Issue with my order"
        rows={2}
      />
      <TextAreaField
        label="Description"
        name="description"
        required
        autoResize
        hint="Include all relevant details so we can help you better."
        placeholder="Describe your issue in as much detail as possible..."
        rows={4}
      />
      <TextAreaField
        label="Additional notes"
        name="notes"
        hint="Optional. Any extra information you'd like to add."
        rows={2}
      />
    </form>
  ),
};
