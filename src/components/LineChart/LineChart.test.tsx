import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { LineChart, type LineChartSeries } from './LineChart';

const singleSeries: LineChartSeries[] = [
  {
    id: 's1',
    label: 'Users',
    data: [
      { label: 'Mon', value: 820 },
      { label: 'Tue', value: 932 },
      { label: 'Wed', value: 1100 },
    ],
  },
];

const multiSeries: LineChartSeries[] = [
  {
    id: 's1',
    label: 'Users',
    data: [
      { label: 'Mon', value: 820 },
      { label: 'Tue', value: 932 },
      { label: 'Wed', value: 1100 },
    ],
  },
  {
    id: 's2',
    label: 'Sessions',
    data: [
      { label: 'Mon', value: 1200 },
      { label: 'Tue', value: 1400 },
      { label: 'Wed', value: 1300 },
    ],
  },
];

describe('LineChart', () => {
  it('renders an SVG with role="img"', () => {
    render(<LineChart title="Weekly users" series={singleSeries} />);
    expect(screen.getByRole('img', { name: 'Weekly users' })).toBeInTheDocument();
  });

  it('renders a title element for accessibility', () => {
    const { container } = render(<LineChart title="Weekly users" series={singleSeries} />);
    expect(container.querySelector('title')).toHaveTextContent('Weekly users');
  });

  it('renders one polyline per series', () => {
    const { container } = render(<LineChart title="Chart" series={multiSeries} />);
    expect(container.querySelectorAll('polyline')).toHaveLength(2);
  });

  it('renders numSeries × numPoints circles', () => {
    const { container } = render(<LineChart title="Chart" series={multiSeries} />);
    expect(container.querySelectorAll('circle')).toHaveLength(6);
  });

  it('renders area polygon when showArea is true (global)', () => {
    const { container } = render(<LineChart title="Chart" series={singleSeries} showArea />);
    expect(container.querySelector('polygon')).toBeInTheDocument();
  });

  it('renders area polygon when series has showArea=true', () => {
    const seriesWithArea: LineChartSeries[] = [
      { ...singleSeries[0], showArea: true },
    ];
    const { container } = render(<LineChart title="Chart" series={seriesWithArea} />);
    expect(container.querySelector('polygon')).toBeInTheDocument();
  });

  it('does not render area polygon when showArea is false', () => {
    const { container } = render(<LineChart title="Chart" series={singleSeries} />);
    expect(container.querySelector('polygon')).not.toBeInTheDocument();
  });

  it('renders a legend for multiple series', () => {
    render(<LineChart title="Chart" series={multiSeries} />);
    const legend = screen.getByRole('list', { name: /legend/i });
    expect(legend).toBeInTheDocument();
    expect(legend.querySelectorAll('li')).toHaveLength(2);
  });

  it('does not render a legend for a single series', () => {
    render(<LineChart title="Chart" series={singleSeries} />);
    expect(screen.queryByRole('list', { name: /legend/i })).not.toBeInTheDocument();
  });

  it('renders empty state when all series have no data', () => {
    render(<LineChart title="Empty chart" series={[{ id: 's1', label: 'A', data: [] }]} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it('renders correctly with a single data point (n=1 edge case)', () => {
    render(
      <LineChart
        title="Single point"
        series={[{ id: 's1', label: 'A', data: [{ label: 'Jan', value: 42 }] }]}
      />,
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('formats axis labels with M suffix for values ≥ 1 000 000', () => {
    render(
      <LineChart
        title="Revenue"
        series={[{ id: 's1', label: 'Sales', data: [{ label: 'Q1', value: 3_000_000 }, { label: 'Q2', value: 4_500_000 }] }]}
      />,
    );
    expect(document.querySelector('svg')!.textContent).toMatch(/M/);
  });

  describe('a11y — axe', () => {
    it('has no violations — single series', async () => {
      const { container } = render(<LineChart title="Weekly users" series={singleSeries} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — multi series with area', async () => {
      const { container } = render(
        <LineChart title="Weekly users" series={multiSeries} showArea />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
