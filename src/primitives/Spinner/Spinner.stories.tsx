import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';
import { Button } from '../Button/Button';

const meta: Meta<typeof Spinner> = {
  title: 'Primitives/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
  },
  args: {
    size: 'md',
    label: 'Loading...',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <Spinner size="sm" label="Loading (sm)..." />
      <Spinner size="md" label="Loading (md)..." />
      <Spinner size="lg" label="Loading (lg)..." />
    </div>
  ),
};

export const InsideButton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      <Button variant="primary" isLoading disabled aria-label="Saving...">
        <Spinner size="sm" label="Saving..." />
        Saving...
      </Button>
      <Button variant="secondary" isLoading disabled aria-label="Loading...">
        <Spinner size="sm" label="Loading..." />
        Loading...
      </Button>
      <Button variant="destructive" isLoading disabled aria-label="Deleting...">
        <Spinner size="sm" label="Deleting..." />
        Deleting...
      </Button>
    </div>
  ),
};

export const CustomLabel: Story = {
  args: {
    label: 'Processing your payment, please wait...',
  },
};

export const OnColoredBackground: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ background: '#2563eb', padding: '1.5rem', borderRadius: '0.5rem', color: '#ffffff' }}>
        <Spinner label="Loading..." style={{ color: 'white' }} />
      </div>
      <div style={{ background: '#15803d', padding: '1.5rem', borderRadius: '0.5rem', color: '#ffffff' }}>
        <Spinner label="Loading..." style={{ color: 'white' }} />
      </div>
      <div style={{ background: '#b91c1c', padding: '1.5rem', borderRadius: '0.5rem', color: '#ffffff' }}>
        <Spinner label="Loading..." style={{ color: 'white' }} />
      </div>
    </div>
  ),
};
