import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Primitives/Toast',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const toast = useToast();
    return (
      <Button variant="primary" onClick={() => toast.show({ message: 'Operation completed successfully.' })}>
        Show toast
      </Button>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const toast = useToast();
    return (
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button variant="secondary" size="sm" onClick={() => toast.show({ message: 'Relevant information for the user.', variant: 'info' })}>
          Info
        </Button>
        <Button variant="secondary" size="sm" onClick={() => toast.show({ message: 'Your changes have been saved successfully.', variant: 'success' })}>
          Success
        </Button>
        <Button variant="secondary" size="sm" onClick={() => toast.show({ message: 'An unexpected error occurred. Please try again.', variant: 'error' })}>
          Error
        </Button>
        <Button variant="secondary" size="sm" onClick={() => toast.show({ message: 'Your session will expire in 5 minutes.', variant: 'warning' })}>
          Warning
        </Button>
      </div>
    );
  },
};

export const Persistent: Story = {
  render: () => {
    const toast = useToast();
    return (
      <Button
        variant="secondary"
        onClick={() =>
          toast.show({
            message: 'This toast does not disappear automatically. Close it manually.',
            variant: 'info',
            duration: 0,
          })
        }
      >
        Persistent toast
      </Button>
    );
  },
};

export const Queue: Story = {
  render: () => {
    const toast = useToast();
    let count = 0;
    return (
      <Button
        variant="secondary"
        onClick={() => {
          count++;
          toast.show({ message: `Notification #${count}`, variant: count % 2 === 0 ? 'success' : 'info', duration: 4000 });
        }}
      >
        Add notification (max 5)
      </Button>
    );
  },
};
