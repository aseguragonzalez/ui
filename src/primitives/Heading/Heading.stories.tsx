import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Primitives/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'select', options: [1, 2, 3, 4, 5, 6] },
    size: { control: 'select', options: ['xl', 'lg', 'md', 'sm', 'xs'] },
    color: { control: 'select', options: ['default', 'muted', 'inherit'] },
  },
  args: {
    level: 2,
    children: 'Good design is as little design as possible',
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const AllLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={1}>h1 — Page title (xl → 4xl)</Heading>
      <Heading level={2}>h2 — Section (lg → 3xl)</Heading>
      <Heading level={3}>h3 — Subsection (md → 2xl)</Heading>
      <Heading level={4}>h4 — Group (sm → xl)</Heading>
      <Heading level={5}>h5 — Subgroup (xs → lg)</Heading>
      <Heading level={6}>h6 — Note (xs → lg)</Heading>
    </div>
  ),
};

export const SizeOverride: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
          h2 semantic, styled as h1
        </p>
        <Heading level={2} size="xl">Display size at h2 level</Heading>
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
          h3 semantic, styled as h4
        </p>
        <Heading level={3} size="xs">Small heading at h3 level</Heading>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={2} color="default">Default color</Heading>
      <Heading level={2} color="muted">Muted color</Heading>
      <div style={{ color: 'royalblue' }}>
        <Heading level={2} color="inherit">Inherits parent color</Heading>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {(['xl', 'lg', 'md', 'sm', 'xs'] as const).map((size) => (
        <Heading key={size} level={2} size={size}>
          size="{size}" — {
            { xl: '4xl · 2.25rem', lg: '3xl · 1.875rem', md: '2xl · 1.5rem',
              sm: 'xl · 1.25rem', xs: 'lg · 1.125rem' }[size]
          }
        </Heading>
      ))}
    </div>
  ),
};
