import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    shape: { control: 'select', options: ['rect', 'circle', 'text'] },
    width: { control: 'text' },
    height: { control: 'text' },
    lines: { control: { type: 'number', min: 1, max: 10 } },
  },
  args: {
    shape: 'rect',
    width: '200px',
    height: '20px',
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '320px' }}>
      <Skeleton shape="rect" height="20px" />
      <Skeleton shape="circle" width={48} height={48} />
      <Skeleton shape="text" />
    </div>
  ),
};

export const TextLines: Story = {
  render: () => (
    <div style={{ width: '360px' }}>
      <Skeleton shape="text" lines={4} />
    </div>
  ),
};

export const CardLoader: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        padding: '1.25rem',
        border: '1px solid var(--ds-color-border-default)',
        borderRadius: '0.5rem',
        width: '320px',
        backgroundColor: 'var(--ds-color-bg-surface)',
      }}
    >
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <Skeleton shape="circle" width={40} height={40} style={{ flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Skeleton shape="text" width="60%" />
          <Skeleton shape="text" width="40%" />
        </div>
      </div>
      <Skeleton shape="rect" height="120px" />
      <Skeleton shape="text" lines={3} />
    </div>
  ),
};

export const TableLoader: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0px',
        width: '100%',
        maxWidth: '600px',
        border: '1px solid var(--ds-color-border-default)',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: '1rem',
            padding: '0.75rem 1rem',
            borderBottom: i < 4 ? '1px solid var(--ds-color-border-default)' : 'none',
            backgroundColor: 'var(--ds-color-bg-surface)',
          }}
        >
          <Skeleton shape="text" />
          <Skeleton shape="text" />
          <Skeleton shape="text" width="60%" />
        </div>
      ))}
    </div>
  ),
};

export const AvatarList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '280px' }}>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Skeleton shape="circle" width={36} height={36} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <Skeleton shape="text" width="55%" />
            <Skeleton shape="text" width="35%" />
          </div>
        </div>
      ))}
    </div>
  ),
};
