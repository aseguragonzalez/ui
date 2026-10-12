import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';
import { RouterLink } from '../../test/RouterLink';
import { Text } from '../Text/Text';

const meta: Meta<typeof Link> = {
  title: 'Primitives/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    href: '#terms',
    children: 'Terms of service',
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const InlineInText: Story = {
  render: (args) => (
    <Text style={{ maxWidth: '600px' }}>
      By creating an account you accept the <Link {...args} /> and the{' '}
      <Link href="#privacy">privacy policy</Link>.
    </Text>
  ),
};

export const WithRouterLink: Story = {
  args: {
    href: '/settings',
    children: 'Settings',
    linkComponent: RouterLink,
  },
};
