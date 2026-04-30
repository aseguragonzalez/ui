import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delayMs: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip content="Additional information about this action">
      <Button variant="secondary">Hover over me</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', placeItems: 'center', padding: '4rem' }}>
      <Tooltip content="Appears above" placement="top">
        <Button variant="secondary" size="sm">top</Button>
      </Tooltip>
      <Tooltip content="Appears below" placement="bottom">
        <Button variant="secondary" size="sm">bottom</Button>
      </Tooltip>
      <Tooltip content="Appears to the left" placement="left">
        <Button variant="secondary" size="sm">left</Button>
      </Tooltip>
      <Tooltip content="Appears to the right" placement="right">
        <Button variant="secondary" size="sm">right</Button>
      </Tooltip>
    </div>
  ),
};

export const OnIconButton: Story = {
  render: () => (
    <Tooltip content="Delete item">
      <button
        aria-label="Delete"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          border: '1px solid #d1d5db',
          borderRadius: 6,
          background: 'transparent',
          cursor: 'pointer',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </Tooltip>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Tooltip
      content={
        <span>
          <strong>Shortcut:</strong> Ctrl+S
        </span>
      }
    >
      <Button variant="primary">Save</Button>
    </Tooltip>
  ),
};

export const NoDelay: Story = {
  render: () => (
    <Tooltip content="No delay" delayMs={0}>
      <Button variant="ghost">No delay</Button>
    </Tooltip>
  ),
};
