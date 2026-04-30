import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmailField } from './EmailField';

const meta: Meta<typeof EmailField> = {
  title: 'Components/EmailField',
  component: EmailField,
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
    label: 'Email',
    name: 'email',
    placeholder: 'name@example.com',
    size: 'md',
    required: false,
    disabled: false,
    autoComplete: 'email',
  },
};

export default meta;
type Story = StoryObj<typeof EmailField>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Enter your work email. We will not share your address with third parties.' },
};

export const WithError: Story = {
  args: { error: 'The email format is not valid.' },
};

export const Required: Story = {
  args: { required: true, hint: 'Fields marked with * are required.' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'user@example.com' },
};
