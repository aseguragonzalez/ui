import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxField } from './CheckboxField';

const meta: Meta<typeof CheckboxField> = {
  title: 'Components/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
  args: {
    label: 'I accept the terms and conditions',
    name: 'terms',
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxField>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'You can review the terms on our website.' },
};

export const WithError: Story = {
  args: { error: 'You must accept the terms to continue.' },
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const RichLabel: Story = {
  args: {
    label: (
      <>
        I have read and accept the{' '}
        <a href="#" onClick={(e) => e.preventDefault()}>
          privacy policy
        </a>
      </>
    ),
  },
};

export const GroupExample: Story = {
  render: () => (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend style={{ fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.875rem' }}>
        Notifications
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <CheckboxField label="Weekly summary email" name="notif_email" defaultChecked />
        <CheckboxField label="In-app alerts" name="notif_app" />
        <CheckboxField label="SMS for critical events" name="notif_sms" />
      </div>
    </fieldset>
  ),
};
