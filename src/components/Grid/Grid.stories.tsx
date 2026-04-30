import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';
import { Text } from '../../primitives/Text/Text';

const Cell = ({ children }: { children?: React.ReactNode }) => (
  <div
    style={{
      padding: '0.75rem',
      borderRadius: '0.375rem',
      backgroundColor: 'var(--ds-color-action-primary-subtle)',
      color: 'var(--ds-color-action-primary)',
      fontSize: '0.875rem',
      fontFamily: 'system-ui',
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof Grid> = {
  title: 'Components/Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    cols: { control: 'select', options: [1, 2, 3, 4, 5, 6, 12] },
    gap: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16] },
  },
  args: { cols: 3, gap: 4 },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <Cell key={i}>{i + 1}</Cell>
      ))}
    </Grid>
  ),
};

export const ColumnVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {([1, 2, 3, 4] as const).map((cols) => (
        <div key={cols}>
          <Text size="xs" color="muted" style={{ marginBottom: '0.5rem' }}>cols={cols}</Text>
          <Grid cols={cols} gap={3}>
            {Array.from({ length: cols }, (_, i) => (
              <Cell key={i}>{i + 1}</Cell>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <Grid cols={3} gap={4}>
      {['Analytics', 'Users', 'Revenue', 'Support', 'Inventory', 'Reports'].map((title) => (
        <div
          key={title}
          style={{
            padding: '1.25rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--ds-color-border-default)',
            backgroundColor: 'var(--ds-color-bg-surface)',
            fontFamily: 'system-ui',
          }}
        >
          <Text size="sm" color="muted" style={{ marginBottom: '0.25rem' }}>{title}</Text>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>—</p>
        </div>
      ))}
    </Grid>
  ),
};

export const AsymmetricGap: Story = {
  render: () => (
    <Grid cols={3} columnGap={6} rowGap={2}>
      {Array.from({ length: 9 }, (_, i) => (
        <Cell key={i}>{i + 1}</Cell>
      ))}
    </Grid>
  ),
};

export const Responsive: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text size="xs" color="muted" style={{ marginBottom: '0.5rem' }}>
        cols={`{ mobile: 1, tablet: 2, desktop: 3 }`} — resize the viewport to see the grid reflow
      </Text>
      <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap={4}>
        {Array.from({ length: 6 }, (_, i) => (
          <Cell key={i}>{i + 1}</Cell>
        ))}
      </Grid>
    </div>
  ),
};
