import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel } from './Carousel';
import { Card } from '../Card/Card';
import { Heading } from '../../primitives/Heading/Heading';
import { Text } from '../../primitives/Text/Text';
import { Badge } from '../../primitives/Badge/Badge';
import { Avatar } from '../../primitives/Avatar/Avatar';

/* ── Shared slide content ────────────────────────────────────────────────── */

const TEAM = [
  { name: 'Alice Johnson',  role: 'Head of Product',    stat: '42 launches',  badge: 'Admin'  },
  { name: 'Charles Davis',  role: 'Lead Engineer',       stat: '318 PRs',      badge: 'Editor' },
  { name: 'Maria Chen',     role: 'Design Systems Lead', stat: '12 tokens',    badge: 'Editor' },
  { name: 'James Martin',   role: 'Data Analyst',        stat: '86 reports',   badge: 'Viewer' },
  { name: 'Laura Torres',   role: 'Customer Success',    stat: '99% CSAT',     badge: 'Admin'  },
];

const FEATURES = [
  { title: 'Advanced Analytics',   desc: 'Real-time dashboards with drill-down capabilities across all your data sources.',    badge: 'New'  },
  { title: 'Team Workspaces',      desc: 'Collaborate in shared spaces with role-based access, comments, and version history.', badge: 'Beta' },
  { title: 'Custom Reports',       desc: 'Build pixel-perfect reports and schedule automated delivery to any stakeholder.',     badge: 'Pro'  },
  { title: 'API & Webhooks',       desc: 'Connect to any tool in your stack with a comprehensive REST API and event webhooks.', badge: 'Pro'  },
];

function TeamSlide({ name, role, stat, badge }: typeof TEAM[number]) {
  return (
    <Card variant="elevated" padding="md">
      <Card.Body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--ds-space-3)', textAlign: 'center' }}>
          <Avatar name={name} size="lg" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--ds-space-2)', marginBottom: 'var(--ds-space-1)' }}>
              <Heading level={3} size="md">{name}</Heading>
              <Badge variant="brand">{badge}</Badge>
            </div>
            <Text size="sm" color="muted">{role}</Text>
          </div>
          <div style={{ padding: 'var(--ds-space-2) var(--ds-space-4)', background: 'var(--ds-color-bg-subtle)', borderRadius: 'var(--ds-radius-full)' }}>
            <Text size="sm" weight="medium">{stat}</Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

function FeatureSlide({ title, desc, badge }: typeof FEATURES[number]) {
  return (
    <Card variant="outlined" padding="lg">
      <Card.Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-space-2)', marginBottom: 'var(--ds-space-1)' }}>
          <Heading level={3} size="md">{title}</Heading>
          <Badge variant="accent">{badge}</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <Text size="sm" color="muted">{desc}</Text>
      </Card.Body>
    </Card>
  );
}

/* ── Meta ────────────────────────────────────────────────────────────────── */

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    visibleSlides: { control: 'select', options: [1, 2, 3] },
    loop:          { control: 'boolean' },
    autoplay:      { control: 'number' },
  },
  args: {
    'aria-label': 'Feature highlights',
    loop: false,
    visibleSlides: 1,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', backgroundColor: 'var(--ds-color-bg-page)', maxWidth: '640px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

/* ── Playground ──────────────────────────────────────────────────────────── */

export const Playground: Story = {
  render: (args) => (
    <Carousel {...args}>
      {FEATURES.map((f) => <FeatureSlide key={f.title} {...f} />)}
    </Carousel>
  ),
};

/* ── Team highlights ─────────────────────────────────────────────────────── */

export const TeamHighlights: Story = {
  args: { 'aria-label': 'Team highlights' },
  render: (args) => (
    <Carousel {...args}>
      {TEAM.map((m) => <TeamSlide key={m.name} {...m} />)}
    </Carousel>
  ),
};

/* ── Multi-slide ─────────────────────────────────────────────────────────── */

export const MultiSlide: Story = {
  args: { 'aria-label': 'Feature highlights', visibleSlides: 2 },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', backgroundColor: 'var(--ds-color-bg-page)', maxWidth: '760px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Carousel {...args}>
      {FEATURES.map((f) => <FeatureSlide key={f.title} {...f} />)}
    </Carousel>
  ),
};

/* ── With loop ───────────────────────────────────────────────────────────── */

export const WithLoop: Story = {
  args: { 'aria-label': 'Team highlights', loop: true },
  render: (args) => (
    <Carousel {...args}>
      {TEAM.map((m) => <TeamSlide key={m.name} {...m} />)}
    </Carousel>
  ),
};

/* ── With autoplay ───────────────────────────────────────────────────────── */

export const WithAutoplay: Story = {
  args: { 'aria-label': 'Feature highlights', autoplay: 3000, loop: true },
  render: (args) => (
    <Carousel {...args}>
      {FEATURES.map((f) => <FeatureSlide key={f.title} {...f} />)}
    </Carousel>
  ),
};
