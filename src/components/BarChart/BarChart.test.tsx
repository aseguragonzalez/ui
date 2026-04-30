import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BarChart, type BarChartSeries } from './BarChart';

const singleSeries: BarChartSeries[] = [
  {
    id: 's1',
    label: 'Revenue',
    data: [
      { label: 'Jan', value: 100 },
      { label: 'Feb', value: 200 },
      { label: 'Mar', value: 150 },
    ],
  },
];

const multiSeries: BarChartSeries[] = [
  {
    id: 's1',
    label: 'Revenue',
    data: [
      { label: 'Jan', value: 100 },
      { label: 'Feb', value: 200 },
    ],
  },
  {
    id: 's2',
    label: 'Costs',
    data: [
      { label: 'Jan', value: 80 },
      { label: 'Feb', value: 120 },
    ],
  },
];

describe('BarChart', () => {
  it('renders an SVG with role="img"', () => {
    render(<BarChart title="Monthly revenue" series={singleSeries} />);
    expect(screen.getByRole('img', { name: 'Monthly revenue' })).toBeInTheDocument();
  });

  it('renders a title element for accessibility', () => {
    const { container } = render(<BarChart title="Monthly revenue" series={singleSeries} />);
    expect(container.querySelector('title')).toHaveTextContent('Monthly revenue');
  });

  it('renders one bar per datum for a single series', () => {
    const { container } = render(<BarChart title="Revenue" series={singleSeries} />);
    expect(container.querySelectorAll('rect')).toHaveLength(3);
  });

  it('renders numSeries × numLabels bars for multiple series', () => {
    const { container } = render(<BarChart title="Revenue" series={multiSeries} />);
    expect(container.querySelectorAll('rect')).toHaveLength(4);
  });

  it('does not render legend for a single series', () => {
    render(<BarChart title="Revenue" series={singleSeries} />);
    expect(screen.queryByRole('list', { name: /legend/i })).not.toBeInTheDocument();
  });

  it('renders a legend for multiple series', () => {
    render(<BarChart title="Revenue" series={multiSeries} />);
    const legend = screen.getByRole('list', { name: /legend/i });
    expect(legend).toBeInTheDocument();
    expect(legend.querySelectorAll('li')).toHaveLength(2);
  });

  it('renders empty state when all series have no data', () => {
    render(<BarChart title="Empty chart" series={[{ id: 's1', label: 'A', data: [] }]} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it('renders empty state when series array is empty', () => {
    render(<BarChart title="Empty chart" series={[]} />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it('formats axis labels with M suffix for values ≥ 1 000 000', () => {
    render(
      <BarChart
        title="Revenue"
        series={[{ id: 's1', label: 'Sales', data: [{ label: 'Q1', value: 2_500_000 }] }]}
      />,
    );
    expect(document.querySelector('svg')!.textContent).toMatch(/M/);
  });

  it('uses a custom series color when provided', () => {
    render(
      <BarChart
        title="Revenue"
        series={[{ id: 's1', label: 'Sales', color: '#ff0000', data: [{ label: 'Q1', value: 100 }] }]}
      />,
    );
    expect(document.querySelector('rect[fill="#ff0000"]')).toBeInTheDocument();
  });

  describe('a11y — axe', () => {
    it('has no violations — single series', async () => {
      const { container } = render(<BarChart title="Monthly revenue" series={singleSeries} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — multi series', async () => {
      const { container } = render(<BarChart title="Revenue" series={multiSeries} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
