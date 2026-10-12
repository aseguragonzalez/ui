import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RadioGroup } from './RadioGroup';
import { Text } from '../../primitives/Text/Text';
import { Avatar } from '../../primitives/Avatar/Avatar';

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

const AVATAR_OPTIONS = [
  { value: 'fox', label: <Avatar name="Fox" size="lg" /> },
  { value: 'owl', label: <Avatar name="Owl" size="lg" /> },
  { value: 'cat', label: <Avatar name="Cat" size="lg" /> },
  { value: 'bear', label: <Avatar name="Bear" size="lg" />, disabled: true },
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

export const WithNodeLabels: Story = {
  args: {
    legend: 'Avatar',
    name: 'avatar',
    options: AVATAR_OPTIONS,
    defaultValue: 'owl',
    hint: 'Pick one of the predefined avatars.',
  },
};

export const WithMixedLabels: Story = {
  args: {
    legend: 'Reviewer',
    name: 'reviewer',
    options: [
      {
        value: 'fox',
        label: (
          <>
            <Avatar name="Fox" size="sm" /> Fox
          </>
        ),
      },
      {
        value: 'bear',
        label: (
          <>
            <Avatar name="Bear" size="sm" /> Bear
          </>
        ),
        disabled: true,
      },
    ],
    defaultValue: 'fox',
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
