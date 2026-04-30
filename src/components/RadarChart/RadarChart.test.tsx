import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { RadarChart, type RadarSeries } from './RadarChart';

const axes = ['Speed', 'Strength', 'Accuracy', 'Stamina', 'Agility'];

const singleSeries: RadarSeries[] = [
  { id: 's1', label: 'Player A', values: [80, 60, 90, 70, 85] },
];

const multiSeries: RadarSeries[] = [
  { id: 's1', label: 'Player A', values: [80, 60, 90, 70, 85] },
  { id: 's2', label: 'Player B', values: [60, 85, 70, 90, 65] },
];

describe('RadarChart', () => {
  it('renders an SVG with role="img"', () => {
    render(<RadarChart title="Player stats" axes={axes} series={singleSeries} />);
    expect(screen.getByRole('img', { name: 'Player stats' })).toBeInTheDocument();
  });

  it('renders a title element for accessibility', () => {
    const { container } = render(
      <RadarChart title="Player stats" axes={axes} series={singleSeries} />,
    );
    expect(container.querySelector('title')).toHaveTextContent('Player stats');
  });

  it('renders one axis line per axis', () => {
    const { container } = render(
      <RadarChart title="Stats" axes={axes} series={singleSeries} />,
    );
    // axis lines + polygon rings = lines total; just verify we have at least axes.length lines
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBeGreaterThanOrEqual(axes.length);
  });

  it('renders one polygon per series', () => {
    const { container } = render(
      <RadarChart title="Stats" axes={axes} series={multiSeries} />,
    );
    // polygons = RING_STEPS rings + numSeries data polygons
    const polygons = container.querySelectorAll('polygon');
    expect(polygons.length).toBe(4 + multiSeries.length); // 4 rings + 2 series
  });

  it('renders axis labels', () => {
    render(<RadarChart title="Stats" axes={axes} series={singleSeries} />);
    axes.forEach((axis) => {
      expect(screen.getByText(axis)).toBeInTheDocument();
    });
  });

  it('renders legend with all series labels', () => {
    render(<RadarChart title="Stats" axes={axes} series={multiSeries} />);
    const legend = screen.getByRole('list', { name: /legend/i });
    expect(legend).toBeInTheDocument();
    expect(legend.querySelectorAll('li')).toHaveLength(2);
  });

  it('renders empty state when series is empty', () => {
    render(<RadarChart title="Empty" axes={axes} series={[]} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it('renders empty state when axes is empty', () => {
    render(<RadarChart title="Empty" axes={[]} series={singleSeries} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });

  it('accepts an explicit maxValue', () => {
    const { container } = render(
      <RadarChart title="Stats" axes={axes} series={singleSeries} maxValue={100} />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  describe('a11y — axe', () => {
    it('has no violations — single series', async () => {
      const { container } = render(
        <RadarChart title="Player stats" axes={axes} series={singleSeries} />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no violations — multi series', async () => {
      const { container } = render(
        <RadarChart title="Player stats" axes={axes} series={multiSeries} />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
