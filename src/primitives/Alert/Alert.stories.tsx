import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['error', 'warning', 'success', 'info'] },
    title: { control: 'text' },
    dismissLabel: { control: 'text' },
  },
  args: {
    variant: 'info',
    children: 'This action requires you to confirm your identity before continuing.',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {};

export const WithTitle: Story = {
  args: {
    title: 'Verification required',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
      <Alert variant="error" title="Failed to save">
        Your changes could not be saved. Please try again.
      </Alert>
      <Alert variant="warning" title="Heads up">
        Your session will expire in 5 minutes. Save your work.
      </Alert>
      <Alert variant="success" title="Changes saved">
        Your profile has been updated successfully.
      </Alert>
      <Alert variant="info" title="Information">
        Scheduled maintenance is on Friday at 10:00 PM.
      </Alert>
    </div>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
      <Alert variant="error">Your changes could not be saved. Please try again.</Alert>
      <Alert variant="warning">Your session will expire in 5 minutes. Save your work.</Alert>
      <Alert variant="success">Your profile has been updated successfully.</Alert>
      <Alert variant="info">Scheduled maintenance is on Friday at 10:00 PM.</Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <div style={{ maxWidth: '600px' }}>
        {visible ? (
          <Alert variant="info" title="Welcome back" onDismiss={() => setVisible(false)}>
            You have 3 notifications pending review.
          </Alert>
        ) : (
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Alert dismissed. Reload the page to see it again.
          </p>
        )}
      </div>
    );
  },
};

export const AllDismissible: Story = {
  render: () => {
    const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
    const variants = ['error', 'warning', 'success', 'info'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        {variants.map((variant) =>
          dismissed[variant] ? null : (
            <Alert
              key={variant}
              variant={variant}
              title={variant.charAt(0).toUpperCase() + variant.slice(1)}
              onDismiss={() => setDismissed((prev) => ({ ...prev, [variant]: true }))}
            >
              This is a {variant} message.
            </Alert>
          ),
        )}
      </div>
    );
  },
};
