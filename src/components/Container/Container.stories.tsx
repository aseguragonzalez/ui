import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';
import { Heading } from '../../primitives/Heading/Heading';
import { Text } from '../../primitives/Text/Text';

const Placeholder = ({ label }: { label: string }) => (
  <div
    style={{
      padding: '1.5rem',
      border: '2px dashed var(--ds-color-border-default)',
      borderRadius: '0.5rem',
      fontFamily: 'system-ui',
      fontSize: '0.875rem',
      color: 'var(--ds-color-text-muted)',
      textAlign: 'center',
    }}
  >
    {label}
  </div>
);

const meta: Meta<typeof Container> = {
  title: 'Components/Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    padding: { control: 'boolean' },
  },
  args: { size: 'lg', padding: true },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--ds-color-bg-page)', minHeight: '100px', padding: '1rem 0' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <Placeholder label={`Container size="${args.size}" — content area`} />
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'var(--ds-color-bg-page)', padding: '1rem 0' }}>
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <Container key={size} size={size}>
          <Placeholder label={`size="${size}"`} />
        </Container>
      ))}
    </div>
  ),
};

export const NoPadding: Story = {
  render: () => (
    <Container size="md" padding={false}>
      <Placeholder label='padding={false} — no horizontal padding' />
    </Container>
  ),
};

export const PageSection: Story = {
  render: () => (
    <div style={{ backgroundColor: 'var(--ds-color-bg-page)', padding: '2rem 0' }}>
      <Container size="lg">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Heading level={2} size="md">Page title</Heading>
          <Text color="muted" style={{ lineHeight: 1.6 }}>
            This content is constrained to the lg container size (1024px max-width)
            and centered horizontally with automatic margins.
          </Text>
        </div>
      </Container>
    </div>
  ),
};
