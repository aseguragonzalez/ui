import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './Banner';
import { Button } from '../../primitives/Button/Button';
import { Text } from '../../primitives/Text/Text';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error', 'promotional'] },
    layout:  { control: 'select', options: ['horizontal', 'stacked'] },
  },
  args: {
    variant: 'info',
    layout: 'horizontal',
    headline: 'Scheduled maintenance on Saturday 3 May, 02:00–04:00 UTC.',
    description: 'Some features may be temporarily unavailable during this window.',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', backgroundColor: 'var(--ds-color-bg-page)', maxWidth: '720px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Banner>;

/* ── Playground ──────────────────────────────────────────────────────────── */

export const Playground: Story = {};

/* ── Semantic variants ───────────────────────────────────────────────────── */

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-4)' }}>
      <Banner variant="info"        headline="Scheduled maintenance on Saturday 3 May, 02:00–04:00 UTC." description="Some features may be temporarily unavailable." />
      <Banner variant="success"     headline="Your account has been verified successfully." description="You now have access to all features." />
      <Banner variant="warning"     headline="Your subscription expires in 7 days." description="Renew now to avoid any service interruption." />
      <Banner variant="error"       headline="Payment failed — please update your billing details." description="Your account will be suspended if not resolved within 48 hours." />
      <Banner variant="promotional" headline="Enterprise Analytics is now available." description="Get deeper insights with advanced dashboards and custom reports." />
    </div>
  ),
};

/* ── With actions ────────────────────────────────────────────────────────── */

export const WithActions: Story = {
  render: () => (
    <Banner
      variant="promotional"
      headline="Enterprise Analytics is now available."
      description="Upgrade to unlock advanced dashboards, custom reports, and team-level insights."
      actions={
        <>
          <Button size="sm">Upgrade now</Button>
          <Button size="sm" variant="ghost">Learn more</Button>
        </>
      }
    />
  ),
};

/* ── Dismissible ─────────────────────────────────────────────────────────── */

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Banner
        variant="warning"
        headline="Your subscription expires in 7 days."
        description="Renew now to avoid any service interruption."
        onDismiss={() => setVisible(false)}
        actions={<Button size="sm">Renew now</Button>}
      />
    ) : (
      <Text size="sm" color="muted">Banner dismissed. Refresh to see it again.</Text>
    );
  },
};

/* ── Stacked layout ──────────────────────────────────────────────────────── */

export const Stacked: Story = {
  render: () => (
    <Banner
      variant="promotional"
      layout="stacked"
      headline="Enterprise Analytics is now available."
      description="Get deeper insights with advanced dashboards and custom reports tailored to your team."
      actions={
        <>
          <Button size="sm">Upgrade now</Button>
          <Button size="sm" variant="ghost">Learn more</Button>
        </>
      }
      onDismiss={() => {}}
    />
  ),
};

/* ── Headline only ───────────────────────────────────────────────────────── */

export const HeadlineOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-3)' }}>
      <Banner variant="info"    headline="New version 2.4.0 is available." />
      <Banner variant="success" headline="Changes saved successfully." />
    </div>
  ),
};

/* ── Custom media ────────────────────────────────────────────────────────── */

export const CustomMedia: Story = {
  render: () => (
    <Banner
      variant="promotional"
      headline="You've been invited to join the Beta programme."
      description="Get early access to new features and help shape the product."
      media={
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      }
      actions={<Button size="sm">Join Beta</Button>}
      onDismiss={() => {}}
    />
  ),
};
