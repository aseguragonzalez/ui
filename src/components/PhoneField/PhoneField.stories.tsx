import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneField } from './PhoneField';

const meta: Meta<typeof PhoneField> = {
  title: 'Components/PhoneField',
  component: PhoneField,
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
    label: 'Phone',
    name: 'phone',
    placeholder: '+1 555 000 0000',
    size: 'md',
    required: false,
    disabled: false,
    autoComplete: 'tel',
  },
};

export default meta;
type Story = StoryObj<typeof PhoneField>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Include the international dialing code, e.g. +1 for the US.' },
};

export const WithError: Story = {
  args: { error: 'The phone number format is not valid.' },
};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true, value: '+1 555 000 0000' },
};
