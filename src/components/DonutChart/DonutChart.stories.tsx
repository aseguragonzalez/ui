import type { Meta, StoryObj } from '@storybook/react-vite';
import { DonutChart } from './DonutChart';

const meta: Meta<typeof DonutChart> = {
  title: 'Components/Charts/DonutChart',
  component: DonutChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

const planSegments = [
  { label: 'Basic', value: 1240 },
  { label: 'Pro', value: 430 },
  { label: 'Enterprise', value: 52 },
];

export const Default: Story = {
  args: {
    title: 'Users by plan',
    segments: planSegments,
  },
};

export const WithCenterLabel: Story = {
  args: {
    title: 'Total users by plan',
    segments: planSegments,
    centerLabel: '1,722',
    centerSubLabel: 'Total users',
  },
};

export const CustomColors: Story = {
  args: {
    title: 'Revenue by channel',
    segments: [
      { label: 'Organic', value: 45, color: 'var(--ds-chart-2)' },
      { label: 'Paid', value: 30, color: 'var(--ds-chart-3)' },
      { label: 'Referral', value: 15, color: 'var(--ds-chart-4)' },
      { label: 'Direct', value: 10, color: 'var(--ds-chart-5)' },
    ],
  },
};

export const Empty: Story = {
  args: {
    title: 'No data chart',
    segments: [],
  },
};
