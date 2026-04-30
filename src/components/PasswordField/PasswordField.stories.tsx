import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordField } from './PasswordField';

const meta: Meta<typeof PasswordField> = {
  title: 'Components/PasswordField',
  component: PasswordField,
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
    label: 'Password',
    name: 'password',
    placeholder: '••••••••',
    size: 'md',
    required: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: 'Minimum 8 characters, one uppercase letter, and one number.',
  },
};

export const WithError: Story = {
  args: {
    error: 'Password must be at least 8 characters long.',
  },
};

export const Required: Story = {
  args: {
    required: true,
    hint: 'Fields marked with * are required.',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <PasswordField label="Small" name="sm" size="sm" placeholder="Small" />
      <PasswordField label="Medium" name="md" size="md" placeholder="Medium" />
      <PasswordField label="Large" name="lg" size="lg" placeholder="Large" />
    </div>
  ),
};

export const LoginFormExample: Story = {
  render: () => (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}
      onSubmit={(e) => e.preventDefault()}
    >
      <PasswordField
        label="Current password"
        name="currentPassword"
        required
        autoComplete="current-password"
        placeholder="Your current password"
      />
      <PasswordField
        label="New password"
        name="newPassword"
        required
        autoComplete="new-password"
        hint="Minimum 8 characters, one uppercase letter, and one number."
        placeholder="Choose a strong password"
      />
      <PasswordField
        label="Confirm password"
        name="confirmPassword"
        required
        autoComplete="new-password"
        error="Passwords do not match."
        placeholder="Repeat your new password"
      />
    </form>
  ),
};
