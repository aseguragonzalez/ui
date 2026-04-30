import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    label: 'Full name',
    name: 'fullName',
    placeholder: 'E.g. Jane Smith',
    size: 'md',
    required: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: 'Enter your name exactly as it appears on your ID.',
  },
};

export const WithError: Story = {
  args: {
    error: 'This field is required.',
  },
};

export const WithHintAndError: Story = {
  args: {
    hint: 'Enter your name exactly as it appears on your ID.',
    error: 'This field is required.',
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
    value: 'Locked value',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <TextField label="Small" name="sm" size="sm" placeholder="Small input" />
      <TextField label="Medium" name="md" size="md" placeholder="Medium input" />
      <TextField label="Large" name="lg" size="lg" placeholder="Large input" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        label="First name"
        name="firstName"
        required
        placeholder="E.g. Jane"
      />
      <TextField
        label="Last name"
        name="lastName"
        required
        placeholder="E.g. Smith"
      />
      <TextField
        label="Email"
        name="email"
        hint="We will only use this email for important notifications."
        placeholder="name@example.com"
      />
      <TextField
        label="Phone"
        name="phone"
        error="Invalid format. Use the format +1 555 000 0000."
        placeholder="+1 555 000 0000"
      />
    </form>
  ),
};
