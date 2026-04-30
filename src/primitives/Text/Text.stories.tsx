import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'select', options: ['p', 'span', 'div', 'em', 'strong', 'small'] },
    size: { control: 'select', options: ['lg', 'md', 'sm', 'xs'] },
    weight: { control: 'select', options: ['regular', 'medium', 'semibold', 'bold'] },
    color: {
      control: 'select',
      options: ['default', 'muted', 'disabled', 'error', 'success', 'warning', 'inherit'],
    },
  },
  args: {
    children:
      'Good design is as little design as possible. Not less, but simple: pure, without unnecessary load.',
    size: 'md',
    weight: 'regular',
    color: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
      {(['lg', 'md', 'sm', 'xs'] as const).map((size) => (
        <Text key={size} size={size}>
          <strong style={{ fontSize: '0.6875rem' }}>size={size}</strong>
          {' '}— Good design is as little design as possible.
        </Text>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px' }}>
      {(['regular', 'medium', 'semibold', 'bold'] as const).map((weight) => (
        <Text key={weight} weight={weight}>
          weight="{weight}" — Good design is as little design as possible.
        </Text>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px' }}>
      <Text color="default">default — Primary text</Text>
      <Text color="muted">muted — Secondary text</Text>
      <Text color="disabled">disabled — Disabled text</Text>
      <Text color="error">error — Something went wrong</Text>
      <Text color="success">success — Operation completed</Text>
      <Text color="warning">warning — Review this value</Text>
      <div style={{ color: 'royalblue' }}>
        <Text color="inherit">inherit — Inherits parent color</Text>
      </div>
    </div>
  ),
};

export const Elements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px' }}>
      <Text as="p">paragraph — standard body text</Text>
      <Text as="span">span — inline text</Text>
      <Text as="em">em — emphasized text (semantic italic)</Text>
      <Text as="strong" weight="semibold">strong — important text (semantic bold)</Text>
      <Text as="small" size="sm" color="muted">small — fine print (copyright, legal notes...)</Text>
    </div>
  ),
};

export const ArticleExample: Story = {
  render: () => (
    <article style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <header style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Text as="span" size="sm" weight="medium" color="muted">Design · 5 min read</Text>
        {/* import Heading from './Heading/Heading' would go here in real usage */}
      </header>
      <Text>
        The way we present information shapes how users process it. A good typographic system
        is not just aesthetics — it is cognitive structure.
      </Text>
      <Text>
        Every decision about size, weight, and color carries an attention cost. Using them sparingly
        is a way of respecting the reader's time.
      </Text>
      <Text size="sm" color="muted">
        Last updated: April 27, 2026
      </Text>
    </article>
  ),
};
