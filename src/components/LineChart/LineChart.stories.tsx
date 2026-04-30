import type { Meta, StoryObj } from '@storybook/react-vite';
import { LineChart } from './LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Components/Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof LineChart>;

const weeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const Default: Story = {
  args: {
    title: 'Daily active users',
    series: [
      {
        id: 'dau',
        label: 'Users',
        data: weeklyLabels.map((label, i) => ({
          label,
          value: [820, 932, 1100, 934, 1290, 1330, 1050][i],
        })),
      },
    ],
  },
};

export const WithArea: Story = {
  args: {
    title: 'Daily revenue (€)',
    series: [
      {
        id: 'revenue',
        label: 'Revenue',
        data: weeklyLabels.map((label, i) => ({
          label,
          value: [820, 932, 1100, 934, 1290, 1330, 1050][i],
        })),
      },
    ],
    showArea: true,
  },
};

export const MultiSeries: Story = {
  args: {
    title: 'Users vs Sessions',
    series: [
      {
        id: 'users',
        label: 'Users',
        data: weeklyLabels.map((label, i) => ({
          label,
          value: [820, 932, 1100, 934, 1290, 1330, 1050][i],
        })),
      },
      {
        id: 'sessions',
        label: 'Sessions',
        data: weeklyLabels.map((label, i) => ({
          label,
          value: [1200, 1350, 1600, 1400, 1800, 1950, 1500][i],
        })),
      },
    ],
    showArea: true,
  },
};

export const ThreeSeries: Story = {
  args: {
    title: 'Plan engagement over the week',
    series: [
      {
        id: 'basic',
        label: 'Basic',
        data: weeklyLabels.map((label, i) => ({
          label,
          value: [200, 250, 300, 270, 350, 380, 290][i],
        })),
      },
      {
        id: 'pro',
        label: 'Pro',
        data: weeklyLabels.map((label, i) => ({
          label,
          value: [500, 620, 710, 680, 790, 840, 700][i],
        })),
      },
      {
        id: 'enterprise',
        label: 'Enterprise',
        data: weeklyLabels.map((label, i) => ({
          label,
          value: [120, 140, 160, 150, 170, 180, 155][i],
        })),
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    title: 'No data chart',
    series: [],
  },
};
