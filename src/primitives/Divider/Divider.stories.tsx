import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Primitives/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    decorative: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { orientation: 'horizontal', decorative: true },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

export const Horizontal: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <p style={{ margin: 0, fontFamily: 'system-ui' }}>Content above</p>
      <Divider />
      <p style={{ margin: 0, fontFamily: 'system-ui' }}>Content below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '3rem' }}>
      <span style={{ fontFamily: 'system-ui' }}>Left item</span>
      <Divider orientation="vertical" />
      <span style={{ fontFamily: 'system-ui' }}>Right item</span>
    </div>
  ),
};

export const Semantic: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <section>
        <p style={{ margin: 0, fontFamily: 'system-ui', fontWeight: 600 }}>Personal details</p>
      </section>
      <Divider decorative={false} label="Separator between form sections" />
      <section>
        <p style={{ margin: 0, fontFamily: 'system-ui', fontWeight: 600 }}>Preferences</p>
      </section>
    </div>
  ),
};
