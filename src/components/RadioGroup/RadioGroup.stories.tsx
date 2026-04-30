import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RadioGroup } from './RadioGroup';
import { Text } from '../../primitives/Text/Text';

const PLAN_OPTIONS = [
  { value: 'free', label: 'Free — up to 3 projects' },
  { value: 'pro', label: 'Pro — unlimited projects, priority support' },
  { value: 'enterprise', label: 'Enterprise — custom pricing' },
];

const SIZE_OPTIONS = [
  { value: 'S', label: 'S — Small' },
  { value: 'M', label: 'M — Medium' },
  { value: 'L', label: 'L — Large' },
  { value: 'XL', label: 'XL — Extra Large', disabled: true },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    legend: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    legend: 'Subscription plan',
    name: 'plan',
    options: PLAN_OPTIONS,
    required: false,
    disabled: false,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: { defaultValue: 'pro' },
};

export const WithHint: Story = {
  args: { hint: 'You can change your plan at any time.' },
};

export const WithError: Story = {
  args: { error: 'Please select a plan to continue.' },
};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'pro' },
};

export const WithDisabledOption: Story = {
  args: {
    legend: 'Size',
    name: 'size',
    options: SIZE_OPTIONS,
    hint: 'Size XL is out of stock.',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('free');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <RadioGroup
          legend="Plan"
          name="plan_controlled"
          options={PLAN_OPTIONS}
          value={value}
          onChange={setValue}
        />
        <Text size="sm" color="muted">Selected: <strong>{value}</strong></Text>
      </div>
    );
  },
};
