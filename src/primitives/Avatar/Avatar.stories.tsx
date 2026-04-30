import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['circle', 'square'] },
  },
  args: { name: 'Maria Garcia', size: 'md', shape: 'circle' },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} name="Maria Garcia" size={size} />
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Avatar name="Maria Garcia" shape="circle" />
      <Avatar name="Maria Garcia" shape="square" />
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=47',
    name: 'Maria Garcia',
  },
};

export const ImageFallback: Story = {
  args: {
    src: 'https://broken.example.com/avatar.jpg',
    name: 'Maria Garcia',
  },
};

export const TeamStack: Story = {
  render: () => {
    const members = [
      { name: 'Maria Garcia' },
      { name: 'Carlos Lopez' },
      { name: 'Ana Martinez' },
      { name: 'Pedro Sanchez' },
    ];
    return (
      <div style={{ display: 'flex' }}>
        {members.map((m, i) => (
          <div key={m.name} style={{ marginLeft: i === 0 ? 0 : '-0.5rem', zIndex: members.length - i }}>
            <Avatar
              name={m.name}
              size="sm"
              style={{ border: '2px solid white' }}
            />
          </div>
        ))}
      </div>
    );
  },
};
