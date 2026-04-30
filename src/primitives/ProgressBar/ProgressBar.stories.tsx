import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Primitives/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'accent', 'success', 'error', 'warning'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: {
    label: 'Progress',
    value: 60,
    variant: 'default',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};

export const Indeterminate: Story = {
  args: { value: undefined, label: 'Processing...' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <ProgressBar label="sm" value={60} size="sm" />
      <ProgressBar label="md" value={60} size="md" />
      <ProgressBar label="lg" value={60} size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <ProgressBar label="Uploading" value={70} variant="default" />
      <ProgressBar label="Processing" value={55} variant="accent" />
      <ProgressBar label="Completed" value={100} variant="success" />
      <ProgressBar label="Upload error" value={45} variant="error" />
      <ProgressBar label="Attention required" value={80} variant="warning" />
    </div>
  ),
};

export const Animated: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      if (value >= 100) return;
      const id = setTimeout(() => setValue((v) => Math.min(v + 2, 100)), 80);
      return () => clearTimeout(id);
    }, [value]);

    return (
      <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <ProgressBar
          label="Uploading file"
          value={value}
          variant={value === 100 ? 'success' : 'default'}
        />
        <span style={{ fontFamily: 'system-ui', fontSize: '0.875rem', color: '#6b7280' }}>
          {value === 100 ? 'Completed' : `${value}%`}
        </span>
      </div>
    );
  },
};
