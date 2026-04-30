import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadarChart } from './RadarChart';

const meta: Meta<typeof RadarChart> = {
  title: 'Components/Charts/RadarChart',
  component: RadarChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof RadarChart>;

const skillAxes = ['Speed', 'Strength', 'Accuracy', 'Stamina', 'Agility'];

export const Default: Story = {
  args: {
    title: 'Player performance',
    axes: skillAxes,
    series: [
      { id: 's1', label: 'Player A', values: [80, 60, 90, 70, 85] },
    ],
    maxValue: 100,
  },
};

export const MultiSeries: Story = {
  args: {
    title: 'Player comparison',
    axes: skillAxes,
    series: [
      { id: 's1', label: 'Player A', values: [80, 60, 90, 70, 85] },
      { id: 's2', label: 'Player B', values: [60, 85, 70, 90, 65] },
    ],
    maxValue: 100,
  },
};

export const ThreeSeries: Story = {
  args: {
    title: 'Team skill matrix',
    axes: skillAxes,
    series: [
      { id: 's1', label: 'Player A', values: [80, 60, 90, 70, 85] },
      { id: 's2', label: 'Player B', values: [60, 85, 70, 90, 65] },
      { id: 's3', label: 'Player C', values: [75, 70, 80, 65, 95] },
    ],
    maxValue: 100,
  },
};

export const ProductMetrics: Story = {
  args: {
    title: 'Product quality radar',
    axes: ['Performance', 'Reliability', 'Usability', 'Security', 'Scalability', 'Maintainability'],
    series: [
      { id: 'v1', label: 'v1.0', values: [60, 75, 50, 80, 55, 65] },
      { id: 'v2', label: 'v2.0', values: [80, 85, 75, 90, 72, 82] },
    ],
    maxValue: 100,
  },
};

export const Empty: Story = {
  args: {
    title: 'No data',
    axes: skillAxes,
    series: [],
  },
};
