import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';
import { Text } from '../../primitives/Text/Text';

const Box = ({ children }: { children?: React.ReactNode }) => (
  <div
    style={{
      padding: '0.5rem 0.75rem',
      borderRadius: '0.375rem',
      backgroundColor: 'var(--ds-color-action-primary-subtle)',
      color: 'var(--ds-color-action-primary)',
      fontSize: '0.875rem',
      fontFamily: 'system-ui',
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof Stack> = {
  title: 'Components/Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['column', 'row'] },
    gap: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around', 'evenly'] },
    wrap: { control: 'boolean' },
  },
  args: { direction: 'column', gap: 4 },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  render: (args) => (
    <Stack {...args} style={{ maxWidth: '300px' }}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
};

export const Directions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Text size="xs" color="muted" style={{ marginBottom: '0.5rem' }}>column (default)</Text>
        <Stack direction="column" gap={3} style={{ maxWidth: '200px' }}>
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Stack>
      </div>
      <div>
        <Text size="xs" color="muted" style={{ marginBottom: '0.5rem' }}>row</Text>
        <Stack direction="row" gap={3}>
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
        </Stack>
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {(['start', 'center', 'end'] as const).map((align) => (
        <div key={align}>
          <Text size="xs" color="muted" style={{ marginBottom: '0.5rem' }}>align="{align}"</Text>
          <Stack direction="row" gap={3} align={align} style={{ border: '1px dashed var(--ds-color-border-default)', padding: '0.5rem', borderRadius: '0.375rem' }}>
            <Box>Short</Box>
            <Box>Taller<br />item</Box>
            <Box>A</Box>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const JustifyDistribution: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {(['start', 'center', 'end', 'between', 'around', 'evenly'] as const).map((justify) => (
        <div key={justify}>
          <Text size="xs" color="muted" style={{ marginBottom: '0.5rem' }}>justify="{justify}"</Text>
          <Stack direction="row" gap={0} justify={justify} style={{ border: '1px dashed var(--ds-color-border-default)', padding: '0.5rem', borderRadius: '0.375rem' }}>
            <Box>A</Box>
            <Box>B</Box>
            <Box>C</Box>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Stack direction="row" gap={2} wrap style={{ maxWidth: '320px', border: '1px dashed var(--ds-color-border-default)', padding: '0.5rem', borderRadius: '0.375rem' }}>
      {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta'].map((name) => (
        <Box key={name}>{name}</Box>
      ))}
    </Stack>
  ),
};
