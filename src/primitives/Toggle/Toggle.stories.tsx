import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
  args: {
    'aria-label': 'Enable notifications',
    size: 'md',
    hasError: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const WithError: Story = {
  args: { hasError: true },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Toggle aria-label="Small" size="sm" />
        <Toggle aria-label="Small checked" size="sm" defaultChecked />
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>sm</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Toggle aria-label="Medium" size="md" />
        <Toggle aria-label="Medium checked" size="md" defaultChecked />
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>md</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Toggle aria-label="Large" size="lg" />
        <Toggle aria-label="Large checked" size="lg" defaultChecked />
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>lg</span>
      </div>
    </div>
  ),
};
