import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CheckboxGroup } from './CheckboxGroup';
import { Text } from '../../primitives/Text/Text';

const TOPIC_OPTIONS = [
  { value: 'news', label: 'Product news' },
  { value: 'offers', label: 'Special offers' },
  { value: 'events', label: 'Events and webinars' },
];

const CHANNEL_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'push', label: 'Push notifications', disabled: true },
];

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    legend: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    legend: 'Topics',
    name: 'topics',
    options: TOPIC_OPTIONS,
    disabled: false,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: { defaultValue: ['news', 'events'] },
};

export const WithHint: Story = {
  args: { hint: 'Choose as many as you like.' },
};

export const WithError: Story = {
  args: { error: 'Select at least one topic.' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: ['offers'] },
};

export const WithDisabledOption: Story = {
  args: {
    legend: 'Channels',
    name: 'channels',
    options: CHANNEL_OPTIONS,
    hint: 'Push notifications are not available yet.',
  },
};

export const WithRichLabels: Story = {
  args: {
    legend: 'Agreements',
    name: 'agreements',
    options: [
      {
        value: 'terms',
        label: (
          <>
            I accept the <a href="#terms">terms of service</a>
          </>
        ),
      },
      {
        value: 'privacy',
        label: (
          <>
            I have read the <a href="#privacy">privacy policy</a>
          </>
        ),
      },
    ],
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['news']);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <CheckboxGroup
          legend="Topics"
          name="topics_controlled"
          options={TOPIC_OPTIONS}
          value={value}
          onChange={setValue}
        />
        <Text size="sm" color="muted">
          Selected: <strong>{value.length > 0 ? value.join(', ') : 'none'}</strong>
        </Text>
      </div>
    );
  },
};
