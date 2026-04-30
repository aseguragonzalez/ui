import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './Section';
import { Heading } from '../../primitives/Heading/Heading';
import { Text } from '../../primitives/Text/Text';

const meta: Meta<typeof Section> = {
  title: 'Components/Layout/Section',
  component: Section,
  tags: ['autodocs'],
  argTypes: {
    variant:  { control: 'select', options: ['surface', 'flat'] },
    padding:  { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    gap:      { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16] },
  },
  args: { variant: 'surface', padding: 'md', gap: 4 },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: (args) => (
    <Section {...args} style={{ maxWidth: '480px' }}>
      <Heading level={3} size="sm">Section title</Heading>
      <Text size="sm" color="muted">
        Section content goes here. Use Section to group related fields or information
        inside a page with a consistent surface background.
      </Text>
    </Section>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '480px' }}>
      {(['surface', 'flat'] as const).map((variant) => (
        <Section key={variant} variant={variant} padding="md" gap={3}>
          <Heading level={3} size="xs">variant="{variant}"</Heading>
          <Text size="sm">Content inside the section.</Text>
        </Section>
      ))}
    </div>
  ),
};

export const PaddingScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '480px' }}>
      {(['none', 'sm', 'md', 'lg'] as const).map((padding) => (
        <Section key={padding} padding={padding} gap={2}>
          <Text size="xs" color="muted">padding="{padding}"</Text>
        </Section>
      ))}
    </div>
  ),
};

export const SettingsForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '560px' }}>
      <Section gap={4}>
        <Heading level={3} size="sm">Account</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'system-ui', fontSize: '0.875rem', color: 'var(--ds-color-text-muted)' }}>
          <span>Name: Jane Smith</span>
          <span>Email: jane@example.com</span>
        </div>
      </Section>
      <Section gap={4}>
        <Heading level={3} size="sm">Notifications</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'system-ui', fontSize: '0.875rem', color: 'var(--ds-color-text-muted)' }}>
          <span>Email notifications: On</span>
          <span>Push notifications: Off</span>
        </div>
      </Section>
    </div>
  ),
};
