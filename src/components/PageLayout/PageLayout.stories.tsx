import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageLayout } from './PageLayout';
import { Section } from '../Section/Section';
import { Grid } from '../Grid/Grid';
import { Heading } from '../../primitives/Heading/Heading';
import { Text } from '../../primitives/Text/Text';

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

const meta: Meta<typeof PageLayout> = {
  title: 'Components/Layout/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    padding:  { control: 'boolean' },
    gap:      { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16] },
  },
  args: { maxWidth: 'xl', padding: true, gap: 6 },
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  render: (args) => (
    <div style={{ background: 'var(--ds-color-bg-page)', minHeight: '400px' }}>
      <PageLayout {...args}>
        <Placeholder label="Header / breadcrumb" height={48} />
        <Grid cols={{ mobile: 1, desktop: 3 }} gap={4}>
          <Placeholder label="KPI 1" />
          <Placeholder label="KPI 2" />
          <Placeholder label="KPI 3" />
        </Grid>
        <Placeholder label="Main content area" height={200} />
      </PageLayout>
    </div>
  ),
};

export const WithSections: Story = {
  render: () => (
    <div style={{ background: 'var(--ds-color-bg-page)', minHeight: '600px' }}>
      <PageLayout maxWidth="lg" gap={6}>
        <Heading level={1} size="md">Settings</Heading>
        <Section gap={4}>
          <Heading level={2} size="xs">Account</Heading>
          <Placeholder label="Account fields" height={100} />
        </Section>
        <Section gap={4}>
          <Heading level={2} size="xs">Notifications</Heading>
          <Placeholder label="Notification toggles" height={80} />
        </Section>
      </PageLayout>
    </div>
  ),
};

export const MaxWidthVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--ds-color-bg-page)' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((maxWidth) => (
        <div key={maxWidth}>
          <Text size="xs" color="muted" style={{ marginBottom: '0.25rem' }}>maxWidth="{maxWidth}"</Text>
          <PageLayout maxWidth={maxWidth} gap={0}>
            <Placeholder label={maxWidth} height={40} />
          </PageLayout>
        </div>
      ))}
    </div>
  ),
};
