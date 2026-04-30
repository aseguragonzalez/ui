import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ScatterPlot, type ScatterSeries } from './ScatterPlot';

const singleSeries: ScatterSeries[] = [
  {
    id: 's1',
    label: 'Group A',
    data: [
      { x: 10, y: 8, label: 'A' },
      { x: 5, y: 4, label: 'B' },
      { x: 15, y: 12, label: 'C' },
    ],
  },
];

const multiSeries: ScatterSeries[] = [
  {
    id: 's1',
    label: 'Group A',
    data: [
      { x: 10, y: 8 },
      { x: 5, y: 4 },
    ],
  },
  {
    id: 's2',
    label: 'Group B',
    data: [
      { x: 12, y: 10 },
      { x: 7, y: 6 },
    ],
  },
];

describe('ScatterPlot', () => {
  it('renders an SVG with role="img"', () => {
    render(<ScatterPlot title="Correlation" series={singleSeries} />);
    expect(screen.getByRole('img', { name: 'Correlation' })).toBeInTheDocument();
  });

  it('renders a title element for accessibility', () => {
    const { container } = render(<ScatterPlot title="Correlation" series={singleSeries} />);
    expect(container.querySelector('title')).toHaveTextContent('Correlation');
  });

  it('renders one circle per data point across all series', () => {
    const { container } = render(<ScatterPlot title="Chart" series={singleSeries} />);
    expect(container.querySelectorAll('circle')).toHaveLength(3);
  });

  it('renders all circles across multiple series', () => {
    const { container } = render(<ScatterPlot title="Chart" series={multiSeries} />);
    expect(container.querySelectorAll('circle')).toHaveLength(4);
  });

  it('renders a legend for multiple series', () => {
    render(<ScatterPlot title="Chart" series={multiSeries} />);
    const legend = screen.getByRole('list', { name: /legend/i });
    expect(legend).toBeInTheDocument();
    expect(legend.querySelectorAll('li')).toHaveLength(2);
  });

  it('does not render a legend for a single series', () => {
    render(<ScatterPlot title="Chart" series={singleSeries} />);
    expect(screen.queryByRole('list', { name: /legend/i })).not.toBeInTheDocument();
  });

  it('renders empty state when all series have no data', () => {
    render(<ScatterPlot title="Empty" series={[{ id: 's1', label: 'A', data: [] }]} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it('handles a single data point without crashing', () => {
    render(
      <ScatterPlot
        title="Single point"
        series={[{ id: 's1', label: 'A', data: [{ x: 5, y: 5 }] }]}
      />,
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  describe('a11y — axe', () => {
    it('has no violations — single series', async () => {
      const { container } = render(<ScatterPlot title="Correlation" series={singleSeries} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — multi series with axis labels', async () => {
      const { container } = render(
        <ScatterPlot
          title="Correlation"
          series={multiSeries}
          xLabel="Sessions"
          yLabel="Revenue"
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
