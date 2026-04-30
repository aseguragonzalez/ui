import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Heading } from '../../primitives/Heading/Heading';
import { Text } from '../../primitives/Text/Text';
import { Button } from '../../primitives/Button/Button';
import { Badge } from '../../primitives/Badge/Badge';

const meta: Meta<typeof Card> = {
  title: 'Components/Layout/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['outlined', 'elevated', 'flat'] },
    padding: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { variant: 'outlined', padding: 'md' },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', backgroundColor: 'var(--ds-color-bg-page)', maxWidth: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

/* ── Playground ──────────────────────────────────────────────────────────── */

export const Playground: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Heading level={3} size="md">Card title</Heading>
        <Text size="sm" color="muted">Optional subtitle or description goes here.</Text>
      </Card.Header>
      <Card.Body>
        <Text size="sm">
          This is the main content area of the card. It grows to fill available space
          and supports any kind of content.
        </Text>
      </Card.Body>
      <Card.Footer>
        <Button size="sm">Primary action</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
      </Card.Footer>
    </Card>
  ),
};

/* ── Variants ────────────────────────────────────────────────────────────── */

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-4)', maxWidth: '360px' }}>
      {(['outlined', 'elevated', 'flat'] as const).map((variant) => (
        <Card key={variant} variant={variant}>
          <Card.Header>
            <Heading level={3} size="md">{variant.charAt(0).toUpperCase() + variant.slice(1)}</Heading>
          </Card.Header>
          <Card.Body>
            <Text size="sm">variant="{variant}"</Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  ),
};

/* ── With media ──────────────────────────────────────────────────────────── */

export const WithMedia: Story = {
  render: () => (
    <Card variant="outlined">
      <Card.Media>
        <div
          style={{
            height: '160px',
            background: 'linear-gradient(135deg, var(--ds-color-action-primary) 0%, var(--ds-color-action-accent) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text color="inverse" size="sm">Media area (image / video)</Text>
        </div>
      </Card.Media>
      <Card.Header>
        <Heading level={3} size="md">Product name</Heading>
        <Text size="sm" color="muted">Category · €29/mo</Text>
      </Card.Header>
      <Card.Body>
        <Text size="sm">
          A short description of the product that provides enough context for the user
          to decide whether to continue reading.
        </Text>
      </Card.Body>
      <Card.Footer>
        <Button size="sm">Get started</Button>
        <Button size="sm" variant="ghost">Learn more</Button>
      </Card.Footer>
    </Card>
  ),
};

/* ── Body only ───────────────────────────────────────────────────────────── */

export const BodyOnly: Story = {
  render: () => (
    <Card variant="elevated">
      <Card.Body>
        <Text size="sm">
          A card with only a body section. Padding is applied uniformly on all sides.
        </Text>
      </Card.Body>
    </Card>
  ),
};

/* ── With badge ──────────────────────────────────────────────────────────── */

export const WithBadge: Story = {
  render: () => (
    <Card variant="outlined">
      <Card.Header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Heading level={3} size="md">Alice Johnson</Heading>
          <Badge variant="success">Active</Badge>
        </div>
        <Text size="sm" color="muted">Admin · alice@acme.com</Text>
      </Card.Header>
      <Card.Body>
        <Text size="sm" color="muted">Joined January 2023</Text>
      </Card.Body>
      <Card.Footer>
        <Button size="sm" variant="outline">View profile</Button>
      </Card.Footer>
    </Card>
  ),
};

/* ── Padding sizes ───────────────────────────────────────────────────────── */

export const PaddingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-4)', maxWidth: '360px' }}>
      {(['sm', 'md', 'lg'] as const).map((p) => (
        <Card key={p} variant="outlined" padding={p}>
          <Card.Body>
            <Text size="sm" color="muted">padding="{p}"</Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  ),
};
