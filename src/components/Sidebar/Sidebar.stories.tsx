import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../../primitives/Avatar/Avatar';
import { Sidebar } from './Sidebar';
import { Heading } from '../../primitives/Heading/Heading';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h4v-4h2v4h4a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414l-7-7Z" />
  </svg>
);

const ChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5ZM8 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V7ZM14 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4Z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM17 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 0 0-1.5-4.33A5 5 0 0 1 19 16v1h-6.07ZM6 11a5 5 0 0 1 5 5v1H1v-1a5 5 0 0 1 5-5Z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.993 6.993 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      clipRule="evenodd"
    />
  </svg>
);

const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="var(--ds-color-action-primary)" />
    <path d="M8 20L14 8L20 20H8Z" fill="white" />
  </svg>
);

const sidebarItems = [
  { key: 'home', label: 'Dashboard', icon: <HomeIcon />, href: '/dashboard', isActive: true },
  { key: 'analytics', label: 'Analytics', icon: <ChartIcon />, href: '/analytics' },
  { key: 'users', label: 'Users', icon: <UsersIcon />, href: '/users' },
  { key: 'settings', label: 'Settings', icon: <SettingsIcon />, href: '/settings' },
];

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', height: '100vh' }}>
    {children}
    <main style={{ flex: 1, padding: '2rem', background: 'var(--ds-color-bg-page)' }}>
      <Heading level={1}>Main content</Heading>
    </main>
  </div>
);

export const Default: Story = {
  args: {
    items: sidebarItems,
    'aria-label': 'Main navigation',
    logo: <LogoIcon />,
    header: (
      <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ds-color-text-default)' }}>
        Acme
      </span>
    ),
  },
  render: (args) => (
    <Layout>
      <Sidebar {...args} />
    </Layout>
  ),
};

export const Collapsed: Story = {
  args: {
    items: sidebarItems,
    'aria-label': 'Main navigation',
    defaultCollapsed: true,
    logo: <LogoIcon />,
    header: (
      <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ds-color-text-default)' }}>
        Acme
      </span>
    ),
  },
  render: (args) => (
    <Layout>
      <Sidebar {...args} />
    </Layout>
  ),
};

export const WithFooter: Story = {
  args: {
    items: sidebarItems,
    'aria-label': 'Main navigation',
    logo: <LogoIcon />,
    header: (
      <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ds-color-text-default)' }}>
        Acme
      </span>
    ),
    footer: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Avatar name="Alfonso Segura" size="sm" />
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ds-color-text-default)' }}>
            Alfonso S.
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ds-color-text-muted)' }}>
            Admin
          </div>
        </div>
      </div>
    ),
  },
  render: (args) => (
    <Layout>
      <Sidebar {...args} />
    </Layout>
  ),
};

export const NoLogoNoHeader: Story = {
  args: {
    items: sidebarItems,
    'aria-label': 'Main navigation',
  },
  render: (args) => (
    <Layout>
      <Sidebar {...args} />
    </Layout>
  ),
};
