import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';
import { PageLayout } from '../PageLayout/PageLayout';
import { Section } from '../Section/Section';
import { Grid } from '../Grid/Grid';
import { Heading } from '../../primitives/Heading/Heading';

/* ── Stubs ──────────────────────────────────────────────────────────────── */

const SidebarStub = () => (
  <div
    style={{
      width: '14rem',
      height: '100%',
      background: 'var(--ds-color-bg-surface)',
      borderRight: '1px solid var(--ds-color-border-default)',
      padding: '1rem',
      fontFamily: 'system-ui',
      fontSize: '0.875rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    }}
  >
    <strong style={{ color: 'var(--ds-color-text-default)', marginBottom: '0.5rem' }}>App</strong>
    {['Dashboard', 'Users', 'Settings'].map((item) => (
      <div key={item} style={{ color: 'var(--ds-color-text-muted)', cursor: 'default' }}>{item}</div>
    ))}
  </div>
);

const NavbarStub = () => (
  <div
    style={{
      height: '3.5rem',
      background: 'var(--ds-color-bg-surface)',
      borderBottom: '1px solid var(--ds-color-border-default)',
      padding: '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'system-ui',
      fontSize: '0.875rem',
      color: 'var(--ds-color-text-muted)',
    }}
  >
    Top navigation
  </div>
);

const Placeholder = ({ label, height = 80 }: { label: string; height?: number }) => (
  <div
    style={{
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0.375rem',
      background: 'var(--ds-color-action-primary-subtle)',
      color: 'var(--ds-color-action-primary)',
      fontFamily: 'system-ui',
      fontSize: '0.875rem',
    }}
  >
    {label}
  </div>
);

/* ── Meta ───────────────────────────────────────────────────────────────── */

const meta: Meta<typeof AppShell> = {
  title: 'Components/Layout/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: { control: 'select', options: ['sidebar-only', 'navbar-only', 'both'] },
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

/* ── Stories ────────────────────────────────────────────────────────────── */

export const Both: Story = {
  render: () => (
    <AppShell sidebar={<SidebarStub />} navbar={<NavbarStub />}>
      <PageLayout>
        <Heading level={1} size="sm">Dashboard</Heading>
        <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap={4}>
          <Placeholder label="KPI 1" />
          <Placeholder label="KPI 2" />
          <Placeholder label="KPI 3" />
        </Grid>
        <Section gap={4}>
          <Heading level={2} size="xs">Recent activity</Heading>
          <Placeholder label="Table / list" height={200} />
        </Section>
      </PageLayout>
    </AppShell>
  ),
};

export const SidebarOnly: Story = {
  render: () => (
    <AppShell sidebar={<SidebarStub />}>
      <PageLayout>
        <Heading level={1} size="sm">Content</Heading>
        <Placeholder label="Main area" height={300} />
      </PageLayout>
    </AppShell>
  ),
};

export const NavbarOnly: Story = {
  render: () => (
    <AppShell navbar={<NavbarStub />}>
      <PageLayout>
        <Heading level={1} size="sm">Content</Heading>
        <Placeholder label="Main area" height={300} />
      </PageLayout>
    </AppShell>
  ),
};
