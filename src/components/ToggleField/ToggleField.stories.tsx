import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleField } from './ToggleField';

const meta: Meta<typeof ToggleField> = {
  title: 'Components/ToggleField',
  component: ToggleField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
  args: {
    label: 'Enable notifications',
    name: 'notifications',
    size: 'md',
    required: false,
    disabled: false,
    defaultChecked: false,
  },
};

export default meta;
type Story = StoryObj<typeof ToggleField>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const WithHint: Story = {
  args: {
    hint: 'You will receive an email when there is activity on your account.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept terms of use',
    error: 'You must accept the terms to continue.',
  },
};

export const Required: Story = {
  args: {
    label: 'Accept terms of use',
    required: true,
    hint: 'Fields marked with * are required.',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '360px' }}>
      <ToggleField label="Small" name="sm" size="sm" />
      <ToggleField label="Medium" name="md" size="md" />
      <ToggleField label="Large" name="lg" size="lg" />
    </div>
  ),
};

export const SettingsExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        maxWidth: '400px',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
      }}
    >
      {[
        {
          name: 'emailNotifications',
          label: 'Email notifications',
          hint: 'Daily activity summary.',
          defaultChecked: true,
        },
        {
          name: 'pushNotifications',
          label: 'Push notifications',
          hint: 'Real-time alerts.',
          defaultChecked: false,
        },
        {
          name: 'marketingEmails',
          label: 'Marketing emails',
          hint: 'News and special offers.',
          defaultChecked: false,
        },
        {
          name: 'weeklyDigest',
          label: 'Weekly digest',
          hint: null,
          defaultChecked: true,
        },
      ].map((item, index, arr) => (
        <div
          key={item.name}
          style={{
            padding: '1rem 1.25rem',
            borderBottom: index < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
          }}
        >
          <ToggleField
            label={item.label}
            name={item.name}
            hint={item.hint ?? undefined}
            defaultChecked={item.defaultChecked}
          />
        </div>
      ))}
    </div>
  ),
};
