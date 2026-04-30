import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberField } from './NumberField';

const meta: Meta<typeof NumberField> = {
  title: 'Components/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  args: { label: 'Quantity', size: 'md' },
};

export default meta;
type Story = StoryObj<typeof NumberField>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Enter a number between 1 and 100', min: 1, max: 100 },
};

export const WithError: Story = {
  args: { error: 'The value must be between 1 and 100', value: 150, readOnly: true },
};

export const Required: Story = {
  args: { required: true, label: 'Price (€)', step: 0.01, min: 0 },
};

export const Disabled: Story = {
  args: { disabled: true, value: 42 },
};
