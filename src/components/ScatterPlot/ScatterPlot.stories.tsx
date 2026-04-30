import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScatterPlot } from './ScatterPlot';

const meta: Meta<typeof ScatterPlot> = {
  title: 'Components/Charts/ScatterPlot',
  component: ScatterPlot,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ScatterPlot>;

const baseData = [
  { x: 10, y: 8.04, label: 'User A' },
  { x: 8, y: 6.95, label: 'User B' },
  { x: 13, y: 7.58, label: 'User C' },
  { x: 9, y: 8.81, label: 'User D' },
  { x: 11, y: 8.33, label: 'User E' },
  { x: 14, y: 9.96, label: 'User F' },
  { x: 6, y: 7.24, label: 'User G' },
  { x: 4, y: 4.26, label: 'User H' },
  { x: 12, y: 10.84, label: 'User I' },
  { x: 7, y: 4.82, label: 'User J' },
  { x: 5, y: 5.68, label: 'User K' },
];

export const Default: Story = {
  args: {
    title: 'Session duration vs. pages visited',
    series: [{ id: 's1', label: 'Users', data: baseData }],
    xLabel: 'Pages visited',
    yLabel: 'Session duration (min)',
  },
};

export const MultiSeries: Story = {
  args: {
    title: 'Segments comparison',
    series: [
      {
        id: 'free',
        label: 'Free',
        data: [
          { x: 3, y: 2.1 },
          { x: 5, y: 3.8 },
          { x: 4, y: 3.2 },
          { x: 6, y: 4.5 },
          { x: 2, y: 1.8 },
        ],
      },
      {
        id: 'pro',
        label: 'Pro',
        data: [
          { x: 8, y: 7.2 },
          { x: 10, y: 9.1 },
          { x: 12, y: 10.5 },
          { x: 9, y: 8.3 },
          { x: 11, y: 9.8 },
        ],
      },
      {
        id: 'enterprise',
        label: 'Enterprise',
        data: [
          { x: 14, y: 13.0 },
          { x: 16, y: 15.2 },
          { x: 18, y: 17.4 },
          { x: 15, y: 14.1 },
        ],
      },
    ],
    xLabel: 'Pages visited',
    yLabel: 'Session duration (min)',
  },
};

export const NoLabels: Story = {
  args: {
    title: 'Distribution',
    series: [{ id: 's1', label: 'Data', data: baseData }],
  },
};

export const Empty: Story = {
  args: {
    title: 'No data',
    series: [],
  },
};
