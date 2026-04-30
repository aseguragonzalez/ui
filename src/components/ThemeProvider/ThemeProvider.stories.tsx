import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';
import { Button } from '../../primitives/Button/Button';
import { Badge } from '../../primitives/Badge/Badge';
import { Text } from '../../primitives/Text/Text';
import { Heading } from '../../primitives/Heading/Heading';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Foundation/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    skipThemeDecorator: true,
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

function ThemeControls() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--ds-color-bg-page)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Heading level={2} size="lg">ThemeProvider</Heading>
        <Text color="muted">
          Active theme: <strong>{theme}</strong> → resolved as <strong>{resolvedTheme}</strong>
        </Text>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button
          variant={theme === 'light' ? 'primary' : 'secondary'}
          onClick={() => setTheme('light')}
        >
          Light
        </Button>
        <Button
          variant={theme === 'dark' ? 'primary' : 'secondary'}
          onClick={() => setTheme('dark')}
        >
          Dark
        </Button>
        <Button
          variant={theme === 'system' ? 'primary' : 'secondary'}
          onClick={() => setTheme('system')}
        >
          System
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge variant="brand">Brand</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Beta</Badge>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: (args) => (
    <ThemeProvider {...args}>
      <ThemeControls />
    </ThemeProvider>
  ),
  args: {
    defaultTheme: 'system',
  },
};
