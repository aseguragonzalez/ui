import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'brand', 'accent', 'error', 'warning', 'success', 'info'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    variant: 'neutral',
    size: 'md',
    children: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="brand">Brand</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Published</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Beta</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
      <Badge variant="brand" size="sm">sm</Badge>
      <Badge variant="brand" size="md">md</Badge>
      <Badge variant="brand" size="lg">lg</Badge>
    </div>
  ),
};

export const InlineUsage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontFamily: 'system-ui', fontSize: '0.875rem' }}>Chatbot v2.4</span>
        <Badge variant="success" size="sm">Active</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontFamily: 'system-ui', fontSize: '0.875rem' }}>Payments module</span>
        <Badge variant="warning" size="sm">In review</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontFamily: 'system-ui', fontSize: '0.875rem' }}>Legacy API</span>
        <Badge variant="error" size="sm">Deprecated</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontFamily: 'system-ui', fontSize: '0.875rem' }}>Feature Flags</span>
        <Badge variant="info" size="sm">Beta</Badge>
      </div>
    </div>
  ),
};

export const AllVariantsSizes: Story = {
  render: () => {
    const variants = ['neutral', 'brand', 'accent', 'success', 'warning', 'error', 'info'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {sizes.map((size) => (
          <div key={size} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            {variants.map((variant) => (
              <Badge key={variant} variant={variant} size={size}>
                {variant}
              </Badge>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
