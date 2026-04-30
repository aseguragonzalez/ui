import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmailInput } from './EmailInput';

const meta: Meta<typeof EmailInput> = {
  title: 'Primitives/EmailInput',
  component: EmailInput,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    'aria-label': 'Email',
    placeholder: 'name@example.com',
    size: 'md',
    hasError: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof EmailInput>;

export const Default: Story = {};
export const WithError: Story = { args: { hasError: true } };
export const Disabled: Story = { args: { disabled: true } };
