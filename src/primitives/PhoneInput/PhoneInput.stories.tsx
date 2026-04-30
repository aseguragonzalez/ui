import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneInput } from './PhoneInput';

const meta: Meta<typeof PhoneInput> = {
  title: 'Primitives/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    'aria-label': 'Phone',
    placeholder: '+1 555 000 0000',
    size: 'md',
    hasError: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {};
export const WithError: Story = { args: { hasError: true } };
export const Disabled: Story = { args: { disabled: true } };
