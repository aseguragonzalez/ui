import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Breadcrumb',
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Product details' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Settings' },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home' }],
  },
};

export const DeepNesting: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Company', href: '/company' },
      { label: 'Teams', href: '/company/teams' },
      { label: 'Engineering', href: '/company/teams/engineering' },
      { label: 'Frontend' },
    ],
  },
};

export const WithoutLinks: Story = {
  args: {
    items: [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ],
  },
};
