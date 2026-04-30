import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart } from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Components/Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const Default: Story = {
  args: {
    title: 'Monthly revenue (€)',
    series: [
      {
        id: 'revenue',
        label: 'Revenue',
        data: [
          { label: 'Jan', value: 4200 },
          { label: 'Feb', value: 3800 },
          { label: 'Mar', value: 5100 },
          { label: 'Apr', value: 4700 },
          { label: 'May', value: 6200 },
          { label: 'Jun', value: 5800 },
        ],
      },
    ],
  },
};

export const MultiSeries: Story = {
  args: {
    title: 'Revenue vs Costs (€)',
    series: [
      {
        id: 'revenue',
        label: 'Revenue',
        data: [
          { label: 'Jan', value: 4200 },
          { label: 'Feb', value: 3800 },
          { label: 'Mar', value: 5100 },
          { label: 'Apr', value: 4700 },
          { label: 'May', value: 6200 },
          { label: 'Jun', value: 5800 },
        ],
      },
      {
        id: 'costs',
        label: 'Costs',
        data: [
          { label: 'Jan', value: 2100 },
          { label: 'Feb', value: 2400 },
          { label: 'Mar', value: 2900 },
          { label: 'Apr', value: 2600 },
          { label: 'May', value: 3100 },
          { label: 'Jun', value: 2800 },
        ],
      },
    ],
  },
};

export const ThreeSeries: Story = {
  args: {
    title: 'Q2 plan performance',
    series: [
      {
        id: 'basic',
        label: 'Basic',
        data: [
          { label: 'Apr', value: 980 },
          { label: 'May', value: 1200 },
          { label: 'Jun', value: 1050 },
        ],
      },
      {
        id: 'pro',
        label: 'Pro',
        data: [
          { label: 'Apr', value: 2400 },
          { label: 'May', value: 2800 },
          { label: 'Jun', value: 3100 },
        ],
      },
      {
        id: 'enterprise',
        label: 'Enterprise',
        data: [
          { label: 'Apr', value: 4200 },
          { label: 'May', value: 3900 },
          { label: 'Jun', value: 4700 },
        ],
      },
    ],
  },
};

export const FewBars: Story = {
  args: {
    title: 'Quarterly results',
    series: [
      {
        id: 'revenue',
        label: 'Revenue',
        data: [
          { label: 'Q1', value: 12400 },
          { label: 'Q2', value: 18700 },
          { label: 'Q3', value: 15200 },
          { label: 'Q4', value: 21000 },
        ],
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
