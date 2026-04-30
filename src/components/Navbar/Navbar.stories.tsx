import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../primitives/Button/Button';
import { Avatar } from '../../primitives/Avatar/Avatar';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

const navItems = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard', isActive: true },
  { key: 'analytics', label: 'Analytics', href: '/analytics' },
  { key: 'customers', label: 'Customers', href: '/customers' },
  { key: 'settings', label: 'Settings', href: '/settings' },
];

export const Default: Story = {
  args: {
    brand: (
      <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--ds-color-text-default)' }}>
        Acme
      </span>
    ),
    items: navItems,
    'aria-label': 'Main navigation',
  },
};

export const WithActions: Story = {
  args: {
    brand: (
      <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--ds-color-text-default)' }}>
        Acme
      </span>
    ),
    items: navItems,
    actions: (
      <>
        <Button variant="ghost" size="sm">Log in</Button>
        <Button variant="primary" size="sm">Sign up</Button>
      </>
    ),
    'aria-label': 'Main navigation',
  },
};

export const WithAvatar: Story = {
  args: {
    brand: (
      <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--ds-color-text-default)' }}>
        Acme
      </span>
    ),
    items: navItems,
    actions: (
      <Avatar name="Alfonso Segura" size="sm" />
    ),
    'aria-label': 'Main navigation',
  },
};

export const Sticky: Story = {
  args: {
    brand: (
      <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--ds-color-text-default)' }}>
        Acme
      </span>
    ),
    items: navItems,
    sticky: true,
    'aria-label': 'Main navigation',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh', padding: '0' }}>
        <Story />
        <div style={{ padding: '2rem' }}>
          <p>Scroll down to see the sticky navbar.</p>
        </div>
      </div>
    ),
  ],
};

export const NoBrand: Story = {
  args: {
    items: navItems,
    actions: <Button variant="primary" size="sm">New report</Button>,
    'aria-label': 'Main navigation',
  },
};
